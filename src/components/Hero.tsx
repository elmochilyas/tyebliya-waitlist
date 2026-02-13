'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, UtensilsCrossed, ShieldCheck, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const screens = [
    { title: "Browse Chefs", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600&h=1200" },
    { title: "Authentic Menu", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600&h=1200" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-32 overflow-hidden bg-[#F8FAFC]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-accent/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 bg-white rounded-2xl shadow-sm border border-gray-100 text-primary font-bold text-xs tracking-[0.2em] uppercase">
              <Sparkles size={14} className="animate-spin-slow" />
              <span>The Future of Local Dining</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-secondary leading-[0.9] mb-10 tracking-tighter">
              Discover Real <br />
              <span className="text-primary italic relative inline-block">
                Local Food
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9C50 2 150 2 199 9" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span> <br />
              — Straight from Chefs!
            </h1>
            
            <p className="text-xl md:text-3xl text-secondary/60 mb-14 leading-relaxed max-w-3xl mx-auto font-medium">
              Join TyebLiya early access and taste authentic meals in your city. Experience the flavor of tradition, delivered to your door.
            </p>

            <div className="flex flex-col items-center gap-10">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255,107,53,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToWaitlist}
                className="w-full sm:w-auto px-16 py-8 bg-primary text-white font-black text-2xl rounded-3xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 transition-all"
              >
                Join the Waitlist
                <ArrowRight size={28} />
              </motion.button>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-xl">
                      <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} fill="currentColor" />)}
                  </div>
                  <span className="text-lg font-black text-secondary tracking-tight">2,500+ Foodies joined already</span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-24 pt-10 border-t border-gray-100 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-3 font-black text-secondary text-lg">
                <ShieldCheck size={24} />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-3 font-black text-secondary text-lg">
                <UtensilsCrossed size={24} />
                <span>Verified Chefs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
