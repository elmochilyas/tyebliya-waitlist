'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const screens = [
  {
    id: 1,
    title: "Discover Local Chefs",
    image: "/images/screens/screen1.jpeg", 
    description: "Meet the talented masters behind your favorite traditional meals."
  },
  {
    id: 2,
    title: "Authentic Menus",
    image: "/images/screens/screen2.jpeg",
    description: "Explore curated menus filled with generations of flavor."
  },
  {
    id: 3,
    title: "Seamless Experience",
    image: "/images/screens/screen3.jpeg",
    description: "Order with ease and track your meal from kitchen to doorstep."
  }
];

const SmartphoneMockup = ({ image, active = true }: { image: string; active?: boolean }) => {
  return (
    <div className={`relative mx-auto w-full max-w-[300px] aspect-[9/19.5] transition-all duration-700 ${active ? 'scale-100 opacity-100' : 'scale-95 opacity-40 grayscale'}`}>
      {/* Outer Frame - Thin & Elegant */}
      <div className="absolute inset-0 bg-secondary rounded-[2.5rem] p-1.5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-[3px] border-secondary/90 overflow-hidden">
        {/* Internal Screen Border - Very subtle */}
        <div className="absolute inset-0 border-[1px] border-white/5 rounded-[2.2rem] pointer-events-none z-30" />
        
        {/* Notch - Smaller and more subtle */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-secondary rounded-full z-40 flex items-center justify-center gap-1.5">
          <div className="w-4 h-0.5 bg-white/10 rounded-full" />
          <div className="w-1 h-1 bg-white/10 rounded-full" />
        </div>

        {/* Screen Content - Fills almost everything */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gray-950 z-20">
          <img 
            src={image} 
            alt="App Screen" 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/600x1200/1A1A1A/FFFFFF?text=Drop+Screen+Here";
            }}
          />
          {/* Subtle Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
          {/* Bottom Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-40" />
        </div>
      </div>
      
      {/* Minimal Side Buttons */}
      <div className="absolute -right-0.5 top-20 w-0.5 h-10 bg-secondary/30 rounded-l-sm" />
      <div className="absolute -left-0.5 top-24 w-0.5 h-16 bg-secondary/30 rounded-r-sm" />
    </div>
  );
};

const AppScreens = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle screen

  const nextScreen = () => {
    setCurrentIndex((prev) => (prev + 1) % screens.length);
  };

  const prevScreen = () => {
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  return (
    <section className="py-32 md:py-48 bg-white overflow-hidden relative">
      {/* Visual Divider / Transition */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      
      {/* Extreme UI Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[180px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2.5 mb-10 bg-white rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 text-primary font-black text-xs tracking-[0.3em] uppercase"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>Product Showcase</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black text-secondary mb-10 tracking-tight leading-none"
          >
            See <span className="text-primary">TyebLiya</span> in Action
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl text-secondary/60 font-medium leading-relaxed max-w-3xl mx-auto"
          >
            Explore the app screens and get a taste of authentic local cuisine at your fingertips.
          </motion.p>
        </div>

        {/* Desktop Layout: 3-Mockup Spotlight */}
        <div className="hidden lg:flex items-center justify-center gap-0 max-w-7xl mx-auto">
          {screens.map((screen, i) => {
            const isActive = i === currentIndex;
            const isLeft = i === (currentIndex - 1 + screens.length) % screens.length;
            const isRight = i === (currentIndex + 1) % screens.length;

            return (
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, x: i === 0 ? -100 : i === 2 ? 100 : 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className={`relative transition-all duration-700 z-${isActive ? '30' : '10'} ${isActive ? 'scale-110 -mx-4' : 'scale-90 opacity-60 grayscale-[0.5]'}`}
                onClick={() => setCurrentIndex(i)}
                style={{ cursor: 'pointer' }}
              >
                <SmartphoneMockup image={screen.image} active={isActive} />
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 text-center"
                    >
                      <h4 className="text-2xl font-black text-secondary mb-2">{screen.title}</h4>
                      <p className="text-sm text-secondary/50 font-bold">{screen.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/Tablet Layout: Swipeable Carousel */}
        <div className="lg:hidden relative">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[320px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.8, x: 100 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <SmartphoneMockup image={screens[currentIndex].image} active={true} />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <button 
                onClick={prevScreen}
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-14 h-14 bg-white shadow-2xl rounded-2xl flex items-center justify-center text-secondary hover:text-primary transition-all active:scale-90 z-40 border border-gray-100"
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                onClick={nextScreen}
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-14 h-14 bg-white shadow-2xl rounded-2xl flex items-center justify-center text-secondary hover:text-primary transition-all active:scale-90 z-40 border border-gray-100"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <div className="mt-16 text-center px-8">
              <motion.div
                key={`text-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h4 className="text-3xl font-black text-secondary tracking-tight">{screens[currentIndex].title}</h4>
                <p className="text-lg text-secondary/60 font-medium leading-relaxed">{screens[currentIndex].description}</p>
              </motion.div>

              {/* Indicators */}
              <div className="flex justify-center gap-3 mt-10">
                {screens.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-10 bg-primary shadow-[0_0_15px_rgba(255,107,53,0.4)]' : 'w-2.5 bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppScreens;