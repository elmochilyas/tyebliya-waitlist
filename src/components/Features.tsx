'use client';

import React from 'react';
import { Search, ChefHat, Truck, UtensilsCrossed, CreditCard, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { REVEAL, REVEAL_DELAY, VIEWPORT } from '@/lib/motion';

const customerSteps = [
  { icon: Search, title: 'Browse Chefs', desc: 'Find verified home chefs near you' },
  { icon: UtensilsCrossed, title: 'Pick a Meal', desc: 'Choose from daily fresh menus' },
  { icon: CreditCard, title: 'Order & Pay', desc: 'Simple checkout, secure payment' },
  { icon: Truck, title: 'Get It Fresh', desc: 'Delivered from a home kitchen to yours' },
];

const chefSteps = [
  { icon: ChefHat, title: 'Create Profile', desc: 'Showcase your skills and specialties' },
  { icon: UtensilsCrossed, title: 'Post Your Menu', desc: 'Set dishes, prices, and schedule' },
  { icon: Star, title: 'Build Reputation', desc: 'Earn reviews and loyal customers' },
  { icon: CreditCard, title: 'Get Paid', desc: 'We handle payments, you focus on cooking' },
];

const FeatureCard = ({ step, accent }: { step: typeof customerSteps[0]; accent: string }) => (
  <div className={`group p-5 bg-white rounded-xl border border-gray-50 transition-shadow duration-200 ease-out hover:shadow-md hover:shadow-${accent}/5`}>
    <div className={`w-9 h-9 rounded-lg bg-${accent}/10 text-${accent} flex items-center justify-center mb-3 transition-transform duration-200 ease-out group-hover:scale-105`}>
      <step.icon size={18} />
    </div>
    <h4 className="text-sm font-bold text-secondary mb-1">{step.title}</h4>
    <p className="text-xs text-secondary/40 leading-relaxed">{step.desc}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={REVEAL.initial}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            transition={REVEAL.transition}
            className="inline-flex items-center gap-2 px-4 py-2 mb-5 bg-white rounded-xl shadow-sm border border-gray-100 text-primary font-bold text-[11px] tracking-[0.2em] uppercase"
          >
            <Heart size={14} fill="currentColor" />
            <span>How It Works</span>
          </motion.div>
          <motion.h2
            {...REVEAL_DELAY(0.06)}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            className="text-2xl md:text-3xl font-bold text-secondary tracking-tight leading-tight"
          >
            Simple for Both Sides.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* CUSTOMERS */}
          <motion.div
            initial={REVEAL.initial}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            transition={REVEAL.transition}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/30 mb-4 ml-1">For Customers</h3>
            <div className="grid grid-cols-2 gap-3">
              {customerSteps.map((step, i) => (
                <FeatureCard key={i} step={step} accent="primary" />
              ))}
            </div>
          </motion.div>

          {/* CHEFS */}
          <motion.div
            {...REVEAL_DELAY(0.1)}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/30 mb-4 ml-1">For Chefs</h3>
            <div className="grid grid-cols-2 gap-3">
              {chefSteps.map((step, i) => (
                <FeatureCard key={i} step={step} accent="secondary" />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;
