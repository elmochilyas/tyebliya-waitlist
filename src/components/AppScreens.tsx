'use client';

import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE, DURATION, REVEAL, REVEAL_DELAY, VIEWPORT } from '@/lib/motion';

// ─── Screen data ─────────────────────────────────────────────────
const screens = [
  {
    id: 1,
    title: "Meet Your Chef",
    image: "/images/screens/screen1.jpeg",
    description: "Browse verified home chefs in your neighborhood. See their specialties, reviews, and story."
  },
  {
    id: 2,
    title: "Today's Menu",
    image: "/images/screens/screen2.jpeg",
    description: "Fresh menus posted daily by real cooks. Traditional dishes made with local ingredients."
  },
  {
    id: 3,
    title: "From Kitchen to Door",
    image: "/images/screens/screen3.jpeg",
    description: "Order in seconds, track in real time. Your meal goes from a home kitchen straight to yours."
  }
];

// ─── Phone mockup ────────────────────────────────────────────────
const SmartphoneMockup = memo(({ image }: { image: string }) => (
  <div className="relative w-[200px] h-[433px] sm:w-[220px] sm:h-[477px] lg:w-[200px] lg:h-[433px] xl:w-[220px] xl:h-[477px] mx-auto">
    <div className="absolute inset-0 bg-secondary rounded-[2rem] p-1 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] border-2 border-secondary/90 overflow-hidden">
      <div className="absolute inset-0 border border-white/5 rounded-[1.8rem] pointer-events-none z-30" />
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-3 bg-secondary rounded-full z-40 flex items-center justify-center gap-1">
        <div className="w-3 h-0.5 bg-white/10 rounded-full" />
        <div className="w-1 h-1 bg-white/10 rounded-full" />
      </div>
      <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-gray-950 z-20">
        <Image
          src={image}
          alt="TyebLiya app screen"
          fill
          sizes="220px"
          className="object-cover"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/20 rounded-full z-40" />
      </div>
    </div>
    <div className="absolute -right-0.5 top-16 w-0.5 h-8 bg-secondary/30 rounded-l-sm" />
    <div className="absolute -left-0.5 top-20 w-0.5 h-12 bg-secondary/30 rounded-r-sm" />
  </div>
));
SmartphoneMockup.displayName = 'SmartphoneMockup';

// ─── Main Component ─────────────────────────────────────────────
const AppScreens = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const nextScreen = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screens.length);
  }, []);

  const prevScreen = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length);
  }, []);

  const goTo = useCallback((i: number) => setCurrentIndex(i), []);

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── Header ── */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <motion.div
            initial={REVEAL.initial}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            transition={REVEAL.transition}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 text-primary font-bold text-[11px] tracking-[0.2em] uppercase"
          >
            <Heart size={14} fill="currentColor" />
            <span>The App</span>
          </motion.div>

          <motion.h2
            {...REVEAL_DELAY(0.06)}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            className="text-2xl md:text-3xl font-bold text-secondary mb-3 tracking-tight leading-tight"
          >
            See the <span className="text-primary">Product.</span>
          </motion.h2>

          <motion.p
            {...REVEAL_DELAY(0.12)}
            whileInView={REVEAL.animate}
            viewport={VIEWPORT}
            className="text-base md:text-lg text-secondary/50 leading-relaxed max-w-xl mx-auto"
          >
            A preview of the TyebLiya app — designed for simplicity and trust.
          </motion.p>
        </div>

        {/* ── Desktop (lg+): Phone row + side text ── */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center gap-8 xl:gap-12">
            {/* Phone trio */}
            <motion.div
              className="flex items-center justify-center flex-shrink-0"
              initial={REVEAL.initial}
              whileInView={REVEAL.animate}
              viewport={VIEWPORT}
              transition={{ duration: DURATION.slow, ease: EASE }}
            >
              {screens.map((screen, i) => {
                const isActive = i === currentIndex;
                return (
                  <motion.div
                    key={screen.id}
                    className="relative flex-shrink-0 cursor-pointer"
                    animate={{
                      scale: isActive ? 1.05 : 0.9,
                      opacity: isActive ? 1 : 0.4,
                    }}
                    transition={{ duration: DURATION.fast, ease: EASE }}
                    style={{
                      zIndex: isActive ? 30 : 10,
                      margin: '0 -10px',
                    }}
                    onClick={() => goTo(i)}
                  >
                    <SmartphoneMockup image={screen.image} />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Side text panel */}
            <div className="max-w-xs flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                  className="space-y-3"
                >
                  <h4 className="text-xl font-bold text-secondary tracking-tight">
                    {screens[currentIndex].title}
                  </h4>
                  <p className="text-sm text-secondary/50 leading-relaxed">
                    {screens[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-2 mt-6">
                {screens.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Screen ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ease-out ${i === currentIndex
                      ? 'w-8 bg-primary shadow-[0_0_10px_rgba(255,107,53,0.3)]'
                      : 'w-2 bg-gray-200 hover:bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile (<lg): Single phone + nav ── */}
        <div className="lg:hidden">
          <div className="relative flex flex-col items-center">
            <div className="relative w-[200px] h-[433px] sm:w-[220px] sm:h-[477px] mx-auto">
              {screens.map((screen, i) => (
                <motion.div
                  key={screen.id}
                  className="absolute inset-0"
                  animate={{
                    opacity: i === currentIndex ? 1 : 0,
                    scale: i === currentIndex ? 1 : 0.97,
                  }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                  style={{
                    pointerEvents: i === currentIndex ? 'auto' : 'none',
                  }}
                >
                  <SmartphoneMockup image={screen.image} />
                </motion.div>
              ))}

              <button
                onClick={prevScreen}
                className="absolute -left-12 sm:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-secondary hover:text-primary active:scale-95 z-40 border border-gray-100 transition-colors duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextScreen}
                className="absolute -right-12 sm:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-secondary hover:text-primary active:scale-95 z-40 border border-gray-100 transition-colors duration-200"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="mt-8 text-center px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                  className="space-y-2"
                >
                  <h4 className="text-lg font-bold text-secondary tracking-tight">
                    {screens[currentIndex].title}
                  </h4>
                  <p className="text-sm text-secondary/50 leading-relaxed">
                    {screens[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2 mt-6">
                {screens.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Screen ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ease-out ${i === currentIndex
                      ? 'w-8 bg-primary shadow-[0_0_10px_rgba(255,107,53,0.3)]'
                      : 'w-2 bg-gray-200'
                      }`}
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