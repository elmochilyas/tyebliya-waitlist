'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { REVEAL, REVEAL_DELAY, VIEWPORT } from '@/lib/motion';

const problemPoints = [
  "Generic menus designed for speed, not quality",
  "No connection between customer and cook",
  "Home chefs with real skill but zero visibility",
  "Customers want authentic food — and can't find it"
];

const solutionPoints = [
  "A marketplace for verified home chefs",
  "Fresh meals made to order, not reheated",
  "Transparent profiles, ratings, and reviews",
  "Direct support for people in your community"
];

const ProblemSolution = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* THE PROBLEM */}
          <motion.div
            initial={REVEAL.initial}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            transition={REVEAL.transition}
            className="p-7 md:p-8 bg-gray-50 rounded-2xl border border-gray-100"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 bg-red-50 rounded-lg text-red-500 font-bold text-[10px] tracking-[0.2em] uppercase">
              <X size={12} strokeWidth={3} />
              <span>The Problem</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-secondary mb-5 tracking-tight leading-tight">
              Food delivery lost its soul.
            </h2>
            <ul className="space-y-3">
              {problemPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-secondary/60 leading-relaxed">
                  <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* THE SOLUTION */}
          <motion.div
            {...REVEAL_DELAY(0.1)}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            className="p-7 md:p-8 bg-primary rounded-2xl text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 bg-white/15 rounded-lg text-white font-bold text-[10px] tracking-[0.2em] uppercase">
              <Check size={12} strokeWidth={3} />
              <span>The Solution</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-5 tracking-tight leading-tight">
              TyebLiya brings it back.
            </h2>
            <ul className="space-y-3">
              {solutionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed">
                  <Check size={14} className="text-white/50 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-xs text-white/40 font-medium">
                Not a delivery app. A home chef marketplace.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;