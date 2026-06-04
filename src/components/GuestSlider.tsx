/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles, MessageSquareHeart } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data";

export default function GuestSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 4500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const currentGuest = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="guests" className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Guest Testimonials
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight mb-4">
            Meet Our Happy Tails & Wagging Stories
          </h2>
          <p className="font-sans text-gray-650 dark:text-slate-300 text-lg">
            Read direct personal statements of love, exercise updates, and hygiene improvement stories written by pet parents in Varthur and Whitefield.
          </p>
        </div>

        {/* Testimonials Frame */}
        <div className="max-w-4xl mx-auto relative px-4">
          
          {/* Big quotes background highlight */}
          <div className="absolute -top-12 -left-4 text-amber-100 dark:text-slate-800 pointer-events-none select-none opacity-50">
            <Quote className="w-24 h-24 rotate-180" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-850 border border-gray-150 dark:border-slate-800 p-6 sm:p-10 rounded-3xl shadow-xl shadow-amber-500/3 flex flex-col md:flex-row items-center gap-8 relative z-10"
            >
              
              {/* Left Segment: Photo and Breed badge */}
              <div className="flex-shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-amber-500/20 shadow-xl relative">
                <picture>
                  <img
                    src={currentGuest.dogPhoto}
                    alt={`${currentGuest.dogName} - ${currentGuest.breed}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </picture>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-amber-500 text-white text-[9px] font-mono font-bold uppercase rounded-full whitespace-nowrap shadow-md">
                  {currentGuest.breed}
                </div>
              </div>

              {/* Right Segment: Quote text and authors */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-3 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="text-xs font-semibold font-mono text-gray-500 dark:text-slate-400 ml-1">Verified Stay</span>
                  </div>

                  <p className="font-sans text-gray-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic mb-6">
                    "{currentGuest.testimonial}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-800 pt-5 mt-auto">
                  <div>
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-base leading-none">
                      {currentGuest.dogName}
                    </h4>
                    <span className="inline-block text-[11px] font-mono font-bold text-amber-500 mt-1 uppercase tracking-wider">
                      {currentGuest.stayDuration}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-xs font-semibold text-gray-600 dark:text-slate-400">Parent:</span>
                    <div className="font-sans font-medium text-xs text-slate-800 dark:text-slate-100">{currentGuest.parentName}</div>
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Swipe controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Custom timer dot indicators */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? "w-8 bg-amber-500" : "w-2.5 bg-gray-300 dark:bg-slate-800 hover:bg-amber-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                className="p-2.5 sm:p-3 bg-white dark:bg-slate-800 border border-gray-150 dark:border-slate-800 hover:border-amber-500 rounded-xl transition-all hover:bg-amber-500/5 cursor-pointer dark:hover:bg-amber-500/5 group text-gray-700 dark:text-white"
                onClick={handlePrev}
                title="Go to previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                className="p-2.5 sm:p-3 bg-white dark:bg-slate-800 border border-gray-150 dark:border-slate-800 hover:border-amber-500 rounded-xl transition-all hover:bg-amber-500/5 cursor-pointer dark:hover:bg-amber-500/5 group text-gray-700 dark:text-white"
                onClick={handleNext}
                title="Go to next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Simple visual separator card */}
        <div className="mt-20 max-w-5xl mx-auto rounded-2xl bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 border border-dashed border-amber-500/15 p-6 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <MessageSquareHeart className="w-6 h-6 text-amber-500 animate-pulse flex-shrink-0" />
          <span className="font-sans text-sm text-gray-700 dark:text-slate-300">
            More than <strong>100+ pet parents</strong> from Varthur, Whitefield, and Sarjapur trust us with their canine families!
          </span>
          <a
            href="tel:7022072502"
            className="font-mono text-xs font-extrabold uppercase text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5 flex-shrink-0"
          >
            <span>Dial support line</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
