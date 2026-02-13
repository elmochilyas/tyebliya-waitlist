'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, Heart, Users } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="py-32 md:py-48 bg-white overflow-hidden relative">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-24 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2.5 mb-10 bg-[#F8FAFC] rounded-2xl border border-gray-100 text-primary font-black text-xs tracking-[0.3em] uppercase"
            >
              <Sparkles size={16} />
              <span>Why TyebLiya Exists</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-secondary mb-12 tracking-tight leading-[0.9]"
            >
              Food Should Feel <br />
              <span className="text-primary italic">Personal</span> Again.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Problem Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />
              <div className="relative p-10 md:p-14 bg-white border border-gray-100 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 text-secondary/30">
                  <Utensils size={32} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-secondary mb-6 tracking-tight uppercase">The Problem</h3>
                <p className="text-xl md:text-2xl text-secondary/60 leading-relaxed font-medium">
                  “Today’s delivery apps feel generic. You scroll endlessly without knowing who’s really behind the food.”
                </p>
              </div>
            </motion.div>

            {/* Solution Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />
              <div className="relative p-10 md:p-14 bg-white border border-primary/10 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(255,107,53,0.15)]">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-primary/20">
                  <Heart size={32} fill="currentColor" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-primary mb-6 tracking-tight uppercase">The Solution</h3>
                <p className="text-xl md:text-2xl text-secondary leading-relaxed font-bold">
                  “TyebLiya connects you directly with passionate local chefs — so every meal has a story, a culture, and a real person behind it.”
                </p>
                
                <div className="mt-10 pt-8 border-t border-gray-50 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-gray-100 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Chef" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
                    <Users size={16} />
                    <span>Meet Your Chefs</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;