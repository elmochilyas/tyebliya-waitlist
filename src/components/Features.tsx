'use client';

import React from 'react';
import { Utensils, Heart, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Taste the Authentic',
    description: 'Stop settling for generic chains. Connect with real local chefs and taste the soul of your city.',
    icon: Utensils,
    color: 'bg-primary/10',
    iconColor: 'text-primary',
    delay: 0.1
  },
  {
    title: 'Empower Your Community',
    description: 'Every order goes directly to talented local cooks. You are building the future of local dining.',
    icon: Heart,
    color: 'bg-primary/10',
    iconColor: 'text-primary',
    delay: 0.2
  },
  {
    title: 'Zero Friction',
    description: 'A premium app experience designed for your speed. Order in seconds, enjoy the magic.',
    icon: Zap,
    color: 'bg-primary/10',
    iconColor: 'text-primary',
    delay: 0.3
  },
  {
    title: 'Join the Elite',
    description: 'Be the first to try hidden gems and exclusive dishes before they hit the mainstream.',
    icon: Sparkles,
    color: 'bg-primary/10',
    iconColor: 'text-primary',
    delay: 0.4
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2.5 mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-primary font-black text-xs tracking-[0.2em] uppercase"
          >
            <ShieldCheck size={16} />
            <span>Why TyebLiya Hits Different</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-secondary mb-8 leading-[0.9] tracking-tighter">
            Real Food. <span className="text-primary">Real Passion.</span> <br />
            Delivered to You.
          </h2>
          <p className="text-xl text-secondary/50 leading-relaxed max-w-2xl mx-auto font-medium">
            We've cut out the middleman and the generic chains to bring you the authentic taste of your city's best home kitchens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              className="group relative p-10 bg-white border border-gray-50 rounded-[3rem] hover:shadow-[0_40px_80px_-15px_rgba(255,107,53,0.15)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 mb-10 rounded-3xl ${feature.color} ${feature.iconColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-secondary mb-6 tracking-tight group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-secondary/60 leading-relaxed font-medium">
                {feature.description}
              </p>
              
              {/* Bottom Decoration */}
              <div className="absolute bottom-6 right-10 w-12 h-1 bg-gray-100 rounded-full group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
