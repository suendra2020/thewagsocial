/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ShieldCheck, Heart, UserCheck, PhoneCall, Calendar, Play, PawPrint } from "lucide-react";
import { BUSINESS_INFO } from "../data";
import wg1 from "../assets/images/wg1.png";
import wg2 from "../assets/images/wg2.png";
import wg3 from "../assets/images/wg3.png";
import wg4 from "../assets/images/wg4.png";
import wg5 from "../assets/images/wg5.png";
import wg6 from "../assets/images/wg6.png";
import wg7 from "../assets/images/wg7.png";
import wg8 from "../assets/images/wg8.png";
import wg9 from "../assets/images/wg9.png";
import wg10 from "../assets/images/wg10.png";
import wg11 from "../assets/images/wg11.png";

interface HeroProps {
  onBookNowClick: () => void;
  onScheduleVisitClick: () => void;
}

// Seamless image lists for continuous scrolling vertical marquee columns
const COLUMN_ONE_IMAGES = [
  wg1,
  wg2,
  wg3,
  wg4,
  wg5,
  wg6

];

const COLUMN_TWO_IMAGES = [
  wg7,
  wg8,
  wg9,
  wg10,
  wg11
];


const COLUMN_THREE_IMAGES = [
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80", // Cute tongue dog
  "https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=500&q=80", // Dogs pack running
  wg10,
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=500&q=80", // Grooming pet looking fresh
  "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=500&q=80", // Active golden dog jumping on grass
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80"  // Happy labrador in bath
];

const DESKTOP_TAGLINES = [
  {
    badge: "5.0 Rated (100+ Live Reviews)",
    title: "Premium Dog Boarding & Day Care in Varthur, Bengaluru.",
    description: "Spread across spacious grounds where your furry companion plays, thrives, socializes, and relaxes under trained veterinary oversight."
  },
  {
    badge: "Cage-Free & Clean Environment",
    title: "Where Tails Wag & Hearts Flutter.",
    description: "Our nature-filled Varthur green campus provides active splash zones, organic sleeping lobbies, and secure exercise loops."
  },
  {
    badge: "Loving Canine Facilitators",
    title: "A Devoted Second Home For Every Single Guest.",
    description: "We coordinate personalized activity slots, high-grade grooming spa routines, and organic dietary plans to ensure complete comfort."
  }
];

function VerticalMarquee({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  // Triple the list to sustain smooth seamless scrolling cycles without gaps
  const tripletedImages = [...images, ...images, ...images];

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-gray-150 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40 p-1.5 sm:p-2 shadow-xs flex-1">
      <motion.div
        className="flex flex-col gap-3"
        initial={{ y: reverse ? "-33.33%" : "0%" }}
        animate={{
          y: reverse ? "0%" : "-33.33%"
        }}
        transition={{
          ease: "linear",
          duration: 22,
          repeat: Infinity
        }}
      >
        {tripletedImages.map((imgUrl, i) => (
          <div
            key={i}
            className="relative aspect-[3/4.2] w-full rounded-xl overflow-hidden shadow-xs border border-gray-200/40 dark:border-slate-850 bg-slate-100 dark:bg-slate-900 group"
          >
            <img
              src={imgUrl}
              alt="Happy dog activity log"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            {/* Glow shimmer */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero({ onBookNowClick, onScheduleVisitClick }: HeroProps) {
  const [taglineIdx, setTaglineIdx] = useState(0);

  // Rotate tagline carousel every 4.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % DESKTOP_TAGLINES.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  const activeTagline = DESKTOP_TAGLINES[taglineIdx];

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white pt-24 pb-16 transition-colors border-b border-gray-200/50 dark:border-slate-900"
    >
      {/* Background glow and subtle dots mesh layout */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30 z-0 select-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-amber-400/10 filter blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-cyan-400/10 filter blur-3xl" />
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} 
        />
      </div>

      {/* Floating Sparkly Footprint Particles with Brand Colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <motion.div
          className="absolute text-amber-500/15 dark:text-amber-400/15"
          style={{ top: "15%", left: "8%" }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <PawPrint className="w-9 h-9" />
        </motion.div>
        
        <motion.div
          className="absolute text-sky-500/15 dark:text-sky-400/15"
          style={{ top: "65%", left: "3%" }}
          animate={{
            y: [0, 30, 0],
            rotate: [-10, 20, -10],
            scale: [0.9, 1.05, 0.9],
            opacity: [0.2, 0.65, 0.2]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <PawPrint className="w-12 h-12" />
        </motion.div>
        
        <motion.div
          className="absolute text-amber-500/15 dark:text-amber-400/15"
          style={{ top: "35%", right: "8%" }}
          animate={{
            y: [0, -20, 0],
            rotate: [15, -20, 15],
            scale: [1.05, 0.9, 1.05],
            opacity: [0.35, 0.75, 0.35]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <PawPrint className="w-10 h-10" />
        </motion.div>
        
        <motion.div
          className="absolute text-sky-500/15 dark:text-sky-400/15"
          style={{ top: "80%", right: "12%" }}
          animate={{
            y: [0, -15, 0],
            rotate: [-5, 15, -5],
            scale: [0.9, 1.08, 0.9],
            opacity: [0.25, 0.65, 0.25]
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <PawPrint className="w-11 h-11" />
        </motion.div>
        
        {/* Playful mini paw print tracks walking dynamically */}
        <div className="absolute top-[20%] right-[40%] hidden md:flex flex-col gap-8 opacity-20 pointer-events-none select-none">
          <motion.div
            className="text-amber-500"
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              opacity: [0.25, 0.85, 0.25]
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <PawPrint className="w-6 h-6 rotate-[35deg]" />
          </motion.div>
          
          <motion.div
            className="text-sky-500 ml-6"
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              opacity: [0.25, 0.85, 0.25]
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          >
            <PawPrint className="w-6 h-6 rotate-12" />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="grid grid-cols-1 min-[1120px]:grid-cols-12 gap-12 items-center">
          
          {/* Left aligned copy section (Col Span 6 on desktop) */}
          <div className="min-[1120px]:col-span-6 flex flex-col justify-center text-left">
            
            {/* Carousel Text Wrap - Animated cleanly */}
            <div className="min-h-[280px] sm:min-h-[350px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={taglineIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="space-y-5"
                >
                  {/* Rating Badge */}
                  {/* <div className="inline-flex items-center gap-2 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 rounded-full px-3.5 py-1.5 shadow-xs">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
                      {activeTagline.badge}
                    </span>
                  </div> */}
 
                  {/* Main Header Display Text */}
                  <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-gray-950 dark:text-white leading-[1.0] flex flex-col">
                    {taglineIdx === 0 ? (
                      <>
                        <span className="text-slate-900 dark:text-white">Healthy &</span>
                        <span className="text-slate-900 dark:text-white">Happy Dogs</span>
                        <span className="text-amber-500">for Loving</span>
                        <span className="text-amber-500">Families.</span>
                      </>
                    ) : taglineIdx === 1 ? (
                      <>
                        <span className="text-slate-900 dark:text-white">Where Tails</span>
                        <span className="text-slate-900 dark:text-white">Wag Daily &</span>
                        <span className="text-amber-500">Hearts Truly</span>
                        <span className="text-amber-500">Flutter.</span>
                      </>
                    ) : (
                      <>
                        <span className="text-slate-900 dark:text-white">A Beautiful</span>
                        <span className="text-slate-900 dark:text-white">Second Home</span>
                        <span className="text-amber-500">for Loving</span>
                        <span className="text-amber-500">Pups.</span>
                      </>
                    )}
                  </h1>
 
                  {/* Body description panel */}
                  <p className="font-sans text-base sm:text-lg text-gray-650 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
                    {activeTagline.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Playful Interactive SVG Mascot companion - Beautiful Dog SVG with hover/wagging animations */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 rounded-3xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-gray-150 dark:border-slate-800/80 shadow-md flex items-center gap-4 max-w-md hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 group select-none cursor-pointer"
            >
              <div className="relative w-16 h-16 bg-amber-500/10 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden border border-amber-500/15">
                <svg viewBox="0 0 100 100" className="w-14 h-14 text-amber-500 stroke-current stroke-[2.5] fill-transparent" strokeLinecap="round" strokeLinejoin="round">
                  {/* Ears with interactive wiggle */}
                  <motion.path 
                    d="M25,28 C14,33 17,53 25,43 Z" 
                    fill="currentColor" 
                    className="text-amber-500/10 dark:text-amber-500/20"
                    animate={{ rotate: [0, -12, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    style={{ transformOrigin: "25px 28px" }}
                  />
                  <motion.path 
                    d="M75,28 C86,33 83,53 75,43 Z" 
                    fill="currentColor" 
                    className="text-amber-500/10 dark:text-amber-500/20"
                    animate={{ rotate: [0, 12, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.15 }}
                    style={{ transformOrigin: "75px 28px" }}
                  />
                  {/* Head body circle */}
                  <circle cx="50" cy="45" r="22" className="text-amber-500/5 dark:text-amber-500/10" fill="currentColor" />
                  {/* Sleepy/Winking eyes */}
                  <motion.path 
                    d="M38,42 Q42,46 44,42" 
                    animate={{ d: ["M38,42 Q42,46 44,42", "M38,44 Q42,42 44,44", "M38,42 Q42,46 44,42"] }}
                    transition={{ repeat: Infinity, duration: 4, repeatDelay: 1.5 }}
                  />
                  <motion.path 
                    d="M56,42 Q58,46 62,42" 
                    animate={{ d: ["M56,42 Q58,46 62,42", "M56,44 Q58,42 62,44", "M56,42 Q58,46 62,42"] }}
                    transition={{ repeat: Infinity, duration: 4, repeatDelay: 1.5 }}
                  />
                  {/* Snout with nose */}
                  <path d="M46,53 C46,53 50,58 54,53" />
                  <ellipse cx="50" cy="51" rx="4.5" ry="3" fill="currentColor" />
                  {/* Tongue with panting motion */}
                  <motion.path 
                    d="M48,55 C48,55 50,62 52,55 Z" 
                    fill="#f43f5e" 
                    stroke="none" 
                    animate={{ y: [0, 2.5, 0], scaleY: [1, 1.25, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} 
                  />
                </svg>
                {/* Floating love hearts */}
                <motion.div 
                  className="absolute top-1.5 right-1.5 text-rose-500"
                  animate={{ scale: [0, 1.2, 0], y: [0, -8, -12], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-gray-900 dark:text-white text-sm">Meet Waggy!</span>
                  <span className="text-[9px] uppercase font-mono font-bold text-amber-500 bg-amber-500/10 dark:bg-amber-500/15 px-2 py-0.5 rounded-full animate-pulse">Social Mascot</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-slate-300 font-sans mt-0.5 leading-relaxed">
                  Our virtual pup is here to show your dogs are in premium safety! Move your cursor around to watch him smile.
                </p>
              </div>
            </motion.div>

            {/* Action Buttons Hub */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
              <button
                onClick={onBookNowClick}
                className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-sans font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-amber-500/15 active:scale-[0.98] transition-all text-center cursor-pointer"
              >
                Book a Stay
              </button>

              <button
                onClick={onScheduleVisitClick}
                className="px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-850 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-white font-sans font-bold text-sm uppercase tracking-wider shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Schedule a Visit</span>
              </button>
            </div>

            {/* Quality badges in minimal aesthetic */}
            <div className="grid grid-cols-3 gap-4 max-w-lg border-t border-gray-150 dark:border-slate-900 pt-7 mt-10">
              <div className="flex flex-col gap-1">
                <span className="font-display font-extrabold text-gray-950 dark:text-white text-base sm:text-lg">100+</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 dark:text-slate-400">Happy Pets</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-gray-200/70 dark:border-slate-900 pl-4">
                <span className="font-display font-extrabold text-gray-950 dark:text-white text-base sm:text-lg">Cage-Free</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 dark:text-slate-400">Nature Sanctuary</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-gray-200/70 dark:border-slate-900 pl-4">
                <span className="font-display font-extrabold text-gray-950 dark:text-white text-base sm:text-lg">24/7 Live</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 dark:text-slate-400">Veterinary Oversight</span>
              </div>
            </div>

          </div>

          {/* Right vertical marquee columns (Visible on all devices, adjusted heights) */}
          <div className="min-[1120px]:col-span-6 flex items-center gap-2.5 sm:gap-3.5 h-[320px] sm:h-[450px] min-[1120px]:h-[580px] overflow-hidden select-none relative max-w-2xl mx-auto w-full mt-10 min-[1120px]:mt-0 rightside-scroll">
            <div className="absolute top-0 inset-x-0 h-10 sm:h-16 bg-gradient-to-b from-slate-50 dark:from-slate-950 to-transparent pointer-events-none z-20" />
            
            <VerticalMarquee images={COLUMN_ONE_IMAGES} reverse={false} />
            <VerticalMarquee images={COLUMN_TWO_IMAGES} reverse={true} />
            <div className="hidden sm:block flex-1 h-full">
              <VerticalMarquee images={COLUMN_THREE_IMAGES} reverse={false} />
            </div>
            
            <div className="absolute bottom-0 inset-x-0 h-10 sm:h-16 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none z-20" />
          </div>

        </div>
      </div>
    </section>
  );
}
