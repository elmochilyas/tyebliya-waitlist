/**
 * Shared motion design tokens.
 * Every component imports from here — guarantees consistent feel.
 *
 * Easing: cubic-bezier(0.16, 1, 0.3, 1) = fast exit, soft land.
 * This is the same curve used by Linear and Stripe.
 */

// ─── Easing ──────────────────────────────────────────────────────
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Durations (seconds) ─────────────────────────────────────────
export const DURATION = {
    fast: 0.2,     // Micro-interactions (hover, tap)
    normal: 0.4,   // Section reveals
    slow: 0.6,     // Hero entrance
} as const;

// ─── Section reveal preset ───────────────────────────────────────
// Used by every section's whileInView animation.
export const REVEAL = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.normal, ease: EASE },
};

// Same reveal with a stagger offset
export const REVEAL_DELAY = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.normal, ease: EASE, delay },
});

// ─── Viewport config ─────────────────────────────────────────────
// Trigger animation when 15% of element is visible.
// `margin: '-60px'` fires slightly before element enters viewport.
export const VIEWPORT = {
    once: true,
    margin: '-60px' as const,
};
