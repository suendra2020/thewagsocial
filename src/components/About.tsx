/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Navigation, Compass, Trophy, PawPrint, Play, Image as ImageIcon } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"video" | "photo">("video");
  const values = [
    "Thoughtfully designed cage-free paddocks & runs",
    "Spread across clean, spacious green grounds in Varthur",
    "Staff-to-dog ratio of 1:4 guarantees constant vigilance",
    "Daily behavior reporting, food charts and real-time videos",
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 transition-colors relative overflow-hidden">
      
      {/* Decorative Floating Paw Prints Trails */}
      <motion.div 
        className="absolute left-6 top-12 text-amber-500/15 dark:text-amber-400/10 pointer-events-none select-none hidden sm:block"
        animate={{ 
          y: [0, -12, 0], 
          rotate: [-12, -2, -12],
          scale: [1, 1.1, 1]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <PawPrint className="w-12 h-12" />
      </motion.div>
      <motion.div 
        className="absolute right-14 bottom-14 text-sky-500/15 dark:text-sky-400/10 pointer-events-none select-none hidden sm:block"
        animate={{ 
          y: [0, 15, 0], 
          rotate: [45, 55, 45],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.8 }}
      >
        <PawPrint className="w-16 h-16" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 min-[1120px]:grid-cols-12 gap-12 items-center">
          
          {/* Visual Presentation Element (Left Side) */}
          <div className="lg:col-span-6 relative">
            
            {/* Animated SVG Mascot Dog Badge floating on top-right of image */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
              className="absolute -top-6 -right-3 sm:-right-6 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-3.5 shadow-xl z-20 flex flex-col items-center justify-center select-none"
            >
              <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full mb-1">
                Happy Member
              </span>
              <svg viewBox="0 0 120 120" className="w-20 h-20 text-amber-500 fill-transparent stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                {/* Dog Body */}
                <path d="M30 80 C 35 70, 75 70, 80 80" />
                {/* Head */}
                <circle cx="55" cy="50" r="18" fill="currentColor" className="text-amber-500/5 dark:text-amber-500/10" />
                {/* Left Eye */}
                <circle cx="48" cy="46" r="2" fill="currentColor" />
                {/* Right Eye */}
                <motion.circle cx="62" cy="46" r="2" fill="currentColor" animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }} />
                {/* Nose & Snout */}
                <path d="M51 53 C 51 53, 55 58, 59 53" />
                <ellipse cx="55" cy="55" rx="3.5" ry="2.5" fill="currentColor" />
                {/* Tongue */}
                <motion.path d="M53 57.5 C 53 57.5, 55 63, 57 57.5 Z" fill="#f43f5e" className="text-rose-500" stroke="none" animate={{ y: [0, 1.5, 0] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} />
                {/* Flappy Ears with Motion */}
                <motion.path d="M38 42 C 32 45, 34 58, 40 52 Z" fill="currentColor" className="text-amber-600/10" animate={{ rotate: [0, -6, 0] }} style={{ transformOrigin: "38px 42px" }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
                <motion.path d="M72 42 C 78 45, 76 58, 70 52 Z" fill="currentColor" className="text-amber-600/10" animate={{ rotate: [0, 6, 0] }} style={{ transformOrigin: "72px 42px" }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.3 }} />
                {/* Tail Wag animation */}
                <motion.path d="M80 80 Q 95 65 92 50" fill="transparent" stroke="currentColor" animate={{ rotate: [0, 15, -10, 0] }} style={{ transformOrigin: "80px 80px" }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} />
                {/* Feet */}
                <path d="M42 80 L 42 88" />
                <path d="M72 80 L 72 88" />
              </svg>
            </motion.div>

            {/* Media Toggler Switch */}
            <div className="flex items-center gap-2 mb-4 bg-gray-100/80 dark:bg-slate-900/50 p-1.5 rounded-2xl w-fit border border-gray-150 dark:border-slate-800">
              <button
                onClick={() => setActiveTab("video")}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === "video"
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                    : "text-gray-650 dark:text-slate-400 hover:text-amber-500"
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Video Tour 🍿</span>
              </button>
              <button
                onClick={() => setActiveTab("photo")}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === "photo"
                    ? "bg-amber-500 text-white shadow-md"
                    : "text-gray-650 dark:text-slate-400 hover:text-amber-500"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Campus Photo 📸</span>
              </button>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 bg-slate-950">
              {activeTab === "video" ? (
                <div className="relative w-full h-[320px] sm:h-[450px] overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/s0xMU0Y6HHQ?autoplay=1&mute=1&loop=1&playlist=s0xMU0Y6HHQ&controls=1&rel=0"
                    title="The Wag Social Video Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono uppercase px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 pointer-events-none z-10">
                    <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                    <span>Live Campus Video</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-[320px] sm:h-[450px] overflow-hidden">
                  <picture>
                    <img
                      src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
                      alt="Happy dogs playing on lush grass at The Wag Social Varthur"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </picture>
                  
                  {/* Visual translucent badge */}
                  <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white font-mono font-bold text-lg">
                      5.0
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-sm">Perfect Google Reviews Rating</div>
                      <div className="text-xs text-slate-300 font-sans mt-0.5">Voted elite premium dog hostel in East Bangalore</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Glowing background blob */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-72 h-72 bg-amber-500/10 rounded-full filter blur-3xl" />
            <div className="absolute -z-10 -top-10 -left-10 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl" />
          </div>

          {/* Narrative Story (Right Side) */}
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Our Vision & Mission
            </span>
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight mb-6">
              A Thoughtfully Designed Dog Boarding Destination
            </h2>

            <div className="space-y-5 font-sans text-gray-650 dark:text-slate-300 text-base leading-relaxed">
              <p>
                Located in Varthur, Bengaluru, <strong className="text-gray-900 dark:text-white font-semibold">The Wag Social</strong> is a thoughtfully designed dog boarding destination spread across spacious grounds where dogs can run, play, socialize, and relax in a safe, hygiene-checked environment.
              </p>
              <p className="font-serif text-lg text-slate-700 dark:text-amber-100/90 border-l-4 border-amber-500 pl-5 py-2.5 italic bg-amber-500/5 dark:bg-amber-950/20 rounded-r-2xl shadow-xs">
                "Where dogs feel at home. Our mission is to provide a safe, cage-free environment with personalized enrichment, love, care, regular exercise loops, and veterinary-grade attention."
              </p>
              <p>
                We recognize that leaving your pet can be stressful. That is why we've designed our campus to feel completely organic—cage-free sleeping lobbies, dedicated sensory playing ponds, anti-skid indoor surfaces, and veterinary monitoring. We take pride in building a place where dogs don't just stay, but thrive.
              </p>
            </div>

            {/* Factual Check list */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-gray-700 dark:text-slate-300">{v}</span>
                </div>
              ))}
            </div>

            {/* Quick Location Anchor details */}
            <div className="mt-10 p-5 bg-gray-50 dark:bg-slate-900/60 border border-gray-150 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
                  <Navigation className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">Site No. 38/1, Valepura Road</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Near Milk Dairy, Varthur, Bengaluru</div>
                </div>
              </div>
              <a
                href="#app-footer"
                className="font-mono font-bold text-xs uppercase tracking-wider text-amber-500 hover:text-amber-600 flex items-center gap-1.5 self-start sm:self-auto hover:translate-x-1 transition-transform"
              >
                <span>View Google Map</span>
                <span>→</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
