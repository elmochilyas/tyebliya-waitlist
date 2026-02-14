import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client using the SERVICE ROLE key.
 * This bypasses RLS and is ONLY used in API routes (server-side).
 * NEVER import this file from a 'use client' component.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    // Only warn in development; in production, the API route will fail gracefully
    if (process.env.NODE_ENV === 'development') {
        console.warn('[supabase-server] Missing SUPABASE_SERVICE_ROLE_KEY. Server API route will not work.');
    }
}

export const supabaseServer = createClient(
    supabaseUrl || 'https://placeholder-url.supabase.co',
    supabaseServiceKey || 'placeholder-key',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);
