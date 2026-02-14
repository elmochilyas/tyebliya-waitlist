'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Heart } from 'lucide-react';
import { EASE, DURATION, VIEWPORT } from '@/lib/motion';

const AVATAR_COLORS = ['#FF6B35', '#2E3E4E', '#E8723A', '#4A6B8A', '#D4542B'];

const Hero = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#F8FAFC]">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-accent/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white rounded-xl shadow-sm border border-gray-100 text-primary font-bold text-[11px] tracking-[0.2em] uppercase">
              <Heart size={12} fill="currentColor" />
              <span>Morocco&apos;s Home Chef Marketplace</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASE, delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary leading-tight mb-6 tracking-tight"
          >
            Home Food,{' '}
            <span className="text-primary italic relative inline-block">
              Made with Heart.
              <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 9C50 2 150 2 199 9" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal, ease: EASE, delay: 0.16 }}
            className="text-base md:text-lg text-secondary/60 mb-10 leading-relaxed max-w-lg mx-auto"
          >
            TyebLiya connects you with verified home chefs in your city. Order real home-cooked meals — made fresh, delivered to your door.
          </motion.p>

          {/* CTA + Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal, ease: EASE, delay: 0.24 }}
            className="flex flex-col items-center gap-8"
          >
            <button
              onClick={scrollToWaitlist}
              className="group w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/15 flex items-center justify-center gap-3 transition-all duration-200 ease-out hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Early Access
              <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <div className="flex flex-col items-center gap-3">
              <div className="flex -space-x-3">
                {AVATAR_COLORS.map((color, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-[3px] border-white overflow-hidden shadow-md flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <span className="text-sm font-bold text-secondary/60">2,500+ people already joined</span>
              </div>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: DURATION.slow, ease: EASE, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-8"
          >
            <div className="flex items-center gap-2 font-bold text-secondary text-sm">
              <ShieldCheck size={18} />
              <span>Verified Chefs</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-secondary text-sm">
              <Heart size={18} />
              <span>Made in Morocco</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
