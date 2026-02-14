'use client';

import { motion } from 'framer-motion';
import { ChefHat, Heart, Check } from 'lucide-react';
import { REVEAL, REVEAL_DELAY, VIEWPORT } from '@/lib/motion';

const TargetAudience = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={REVEAL.initial}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            transition={REVEAL.transition}
            className="inline-flex items-center gap-2 px-4 py-2 mb-5 bg-white rounded-xl shadow-sm border border-gray-100 text-primary font-bold text-[11px] tracking-[0.2em] uppercase"
          >
            <Heart size={14} fill="currentColor" />
            <span>Who It&apos;s For</span>
          </motion.div>
          <motion.h2
            {...REVEAL_DELAY(0.06)}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            className="text-2xl md:text-3xl font-bold text-secondary tracking-tight leading-tight"
          >
            Two Sides. One Platform.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {/* CHEFS */}
          <motion.div
            initial={REVEAL.initial}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            transition={REVEAL.transition}
            className="relative p-7 md:p-8 rounded-2xl bg-primary text-white shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl"
          >
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-5">
              <ChefHat size={22} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold mb-1">Home Chefs</h3>
            <p className="text-sm text-white/50 mb-5">Turn your kitchen into a business.</p>
            <ul className="space-y-2.5">
              {[
                "Cook from home — zero overhead",
                "Set your own menu and prices",
                "Build a reputation with real reviews",
                "We handle payments and visibility"
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/80 leading-snug">
                  <Check size={14} className="text-white/40 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CUSTOMERS */}
          <motion.div
            {...REVEAL_DELAY(0.1)}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            className="relative p-7 md:p-8 rounded-2xl bg-secondary text-white shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl"
          >
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-5">
              <Heart size={22} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold mb-1">Customers</h3>
            <p className="text-sm text-white/50 mb-5">Real food from real people.</p>
            <ul className="space-y-2.5">
              {[
                "Discover home-cooked meals near you",
                "Know exactly who made your food",
                "Fresh, made to order — never reheated",
                "Support local cooks, not chains"
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/80 leading-snug">
                  <Check size={14} className="text-white/40 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mt-10 text-secondary/30 font-medium text-xs uppercase tracking-[0.25em]"
        >
          Ready? ↓
        </motion.p>
      </div>
    </section>
  );
};

export default TargetAudience;