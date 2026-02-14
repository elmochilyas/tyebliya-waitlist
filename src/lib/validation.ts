import { z } from 'zod';

/**
 * Shared validation schema for waitlist form submissions.
 * Used by both the API route (server-side enforcement) and the client form (UX).
 * Compatible with Zod v4.
 */
export const waitlistSchema = z.object({
    role: z.enum(['client', 'chef']),

    name: z
        .string()
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be 100 characters or fewer')
        .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Name contains invalid characters'),

    email: z
        .string()
        .trim()
        .email('Invalid email address')
        .max(254, 'Email too long')
        .toLowerCase()
        .optional()
        .or(z.literal('')),

    phone: z
        .string()
        .trim()
        .regex(/^\+?[0-9\s\-]{7,15}$/, 'Invalid phone number')
        .optional()
        .or(z.literal('')),

    referredBy: z
        .string()
        .max(20)
        .regex(/^[A-Z0-9]+$/)
        .nullable()
        .optional(),

    // Honeypot — must be empty
    website: z.string().max(0, 'Invalid submission').optional(),
}).refine(
    (data) => (data.email && data.email.length > 0) || (data.phone && data.phone.length > 0),
    { message: 'Please provide either an email or a phone number', path: ['email'] }
);

export type WaitlistInput = z.infer<typeof waitlistSchema>;

/**
 * Sanitize a string by removing HTML/script tags and control characters.
 * Defense-in-depth against stored XSS.
 */
export function sanitize(str: string): string {
    return str
        .replace(/<[^>]*>/g, '')           // Strip HTML tags
        .replace(/[<>'"`;(){}]/g, '')      // Strip dangerous chars
        .replace(/[\x00-\x1F\x7F]/g, '')  // Strip control characters
        .trim();
}
