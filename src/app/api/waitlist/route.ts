import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { waitlistSchema, sanitize } from '@/lib/validation';

// ─── In-memory rate limiter ──────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max requests per window per IP

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

// Cleanup stale entries every 5 minutes to prevent memory leak
setInterval(() => {
    const now = Date.now();
    rateLimitMap.forEach((value, key) => {
        if (now - value.timestamp > RATE_LIMIT_WINDOW_MS * 2) {
            rateLimitMap.delete(key);
        }
    });
}, 5 * 60 * 1000);

// ─── Optional: Cloudflare Turnstile verification ─────────────────
async function verifyTurnstile(token: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return true; // Skip if Turnstile not configured

    try {
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret, response: token }),
        });
        const data = await res.json();
        return data.success === true;
    } catch {
        return false;
    }
}

// ─── POST /api/waitlist ──────────────────────────────────────────
export async function POST(request: NextRequest) {
    try {
        // 1. Rate limiting by IP
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = (forwarded ? forwarded.split(',')[0].trim() : null)
            || request.headers.get('x-real-ip')
            || 'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // 2. Parse body
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: 'Invalid request body.' },
                { status: 400 }
            );
        }

        // 3. Turnstile verification (if configured)
        const turnstileToken = (body as Record<string, unknown>)?.turnstileToken;
        if (typeof turnstileToken === 'string' && turnstileToken.length > 0) {
            const isHuman = await verifyTurnstile(turnstileToken);
            if (!isHuman) {
                return NextResponse.json(
                    { error: 'Bot verification failed. Please try again.' },
                    { status: 403 }
                );
            }
        } else if (process.env.TURNSTILE_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Verification required.' },
                { status: 403 }
            );
        }

        // 4. Zod validation — server-enforced
        const parsed = waitlistSchema.safeParse(body);
        if (!parsed.success) {
            const firstError = parsed.error.issues[0]?.message || 'Invalid input.';
            return NextResponse.json(
                { error: firstError },
                { status: 400 }
            );
        }

        const data = parsed.data;

        // 5. Honeypot — if filled, silently reject (fake success)
        if (data.website && data.website.length > 0) {
            return NextResponse.json({ success: true, referralCode: 'TYEB000000' });
        }

        // 6. Sanitize all string inputs
        const sanitizedName = sanitize(data.name);
        const sanitizedEmail = data.email ? sanitize(data.email) : null;
        const sanitizedPhone = data.phone ? sanitize(data.phone) : null;

        // 7. Insert via server-side Supabase (bypasses RLS intentionally)
        const { error: dbError } = await supabaseServer
            .from('waitlist_users')
            .insert([{
                role: data.role,
                name: sanitizedName,
                email: sanitizedEmail || null,
                phone: sanitizedPhone || null,
                referred_by: data.referredBy || null,
                metadata: {
                    source: 'web_v2',
                    ip_hash: hashIP(ip),
                },
            }]);

        if (dbError) {
            if (dbError.code === '23505') {
                return NextResponse.json(
                    { error: 'This email or phone is already on the waitlist.' },
                    { status: 409 }
                );
            }
            if (dbError.code === '23514') {
                return NextResponse.json(
                    { error: 'Invalid input data.' },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { error: 'Something went wrong. Please try again.' },
                { status: 500 }
            );
        }

        // 8. Generate referral code
        const referralCode = 'TYEB' + Math.random().toString(36).substring(2, 8).toUpperCase();

        return NextResponse.json({ success: true, referralCode });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}

// ─── Hash IP for privacy-safe storage ────────────────────────────
function hashIP(ip: string): string {
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
        const char = ip.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return 'h_' + Math.abs(hash).toString(36);
}
