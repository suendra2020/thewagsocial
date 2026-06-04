/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Spacious Play Areas",
      description: "Ample, professionally grassed play zones for uninterrupted frolicking and high-morale cardio sprints.",
      icon: "Trees",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30"
    },
    {
      title: "Cage-Free Environment",
      description: "No lockups or isolating pins. Complete organic movement aligned with their home routines.",
      icon: "DoorOpen",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30"
    },
    {
      title: "Daily Exercise Labs",
      description: "Structured paddock walks, customized agility drills, obstacle leaps, and sensory fetch sessions.",
      icon: "Activity",
      color: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-50 dark:bg-sky-950/30"
    },
    {
      title: "Certified Pet Handlers",
      description: "Our caretakers are trained in pet psychology, breed-specific behaviors, and gentle care.",
      icon: "Award",
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/30"
    },
    {
      title: "Safe & Secure Facility",
      description: "Equipped with high-security boundary gates, double-locking entries, and full CCTV monitoring.",
      icon: "ShieldAlert",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30"
    },
    {
      title: "Personalized Attention",
      description: "Individual feeding plans, medicine tracking schedules, and loving bedtime cuddling.",
      icon: "HeartHandshake",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/30"
    },
    {
      title: "Healthy & Custom Meals",
      description: "Nutritious meals prepared exactly to your dietary and allergen-free instructions.",
      icon: "Apple",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30"
    },
    {
      title: "Real-Time Diaries",
      description: "High-definition custom videos and diet logs sent straight to your WhatsApp daily.",
      icon: "MessageSquareText",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30"
    },
    {
      title: "Dog Socialization Rules",
      description: "Strict temperament screening and pairing protocols to ensure only positive friendships.",
      icon: "Users2",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
      title: "Emergency Support",
      description: "First-aid certified staff on-campus, veterinary clinic associations, and speedy emergency plans.",
      icon: "HeartPulse",
      color: "text-red-650 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/30"
    }
  ];

  const renderIcon = (iconName: string, className: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={`${className}`} />;
    }
    return <Icons.PawPrint className={`${className}`} />;
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="why-choose-us" className="py-24 bg-gray-50/50 dark:bg-slate-950 border-b border-gray-100 dark:border-slate-850 transition-colors relative overflow-hidden">
      {/* Decorative Grid Pattern for more sophisticated technical feel */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none select-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            Our Care Standard
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight mb-4">
            Why Bengaluru Dog Parents Choose The Wag Social
          </h2>
          <p className="font-sans text-gray-600 dark:text-slate-300 text-lg">
            We don't believe in standard kennels or cages. We've built an advanced, safety-first haven where your pup enjoys high-morale enrichment.
          </p>
        </div>

        {/* Features Bento / Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feat, index) => {
            const isLarge = index === 0 || index === 5;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
                className={`relative min-h-[250px] p-7 rounded-3xl flex flex-col justify-between bg-white dark:bg-slate-900 border border-gray-200/60 dark:border-slate-800/80 hover:border-amber-500/60 dark:hover:border-amber-500/50 hover:bg-amber-500/[0.015] dark:hover:bg-amber-500/[0.025] hover:shadow-2xl hover:shadow-amber-500/[0.08] dark:hover:shadow-amber-500/[0.04] transition-all duration-300 group cursor-pointer overflow-hidden ${
                  isLarge ? "lg:col-span-2 md:col-span-2 col-span-1" : "col-span-1"
                }`}
              >
                {/* Dynamic light subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/[0.01] group-hover:to-amber-500/[0.035] transition-all duration-500 pointer-events-none" />

                <div className="flex justify-between items-start z-10">
                  <div className={`inline-flex items-center justify-center p-3 rounded-2xl ${feat.bgColor} ${feat.color} shadow-xs border border-transparent group-hover:border-amber-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md`}>
                    {renderIcon(feat.icon, "w-6 h-6")}
                  </div>
                  
                  {/* Tiny hover arrow icon */}
                  <div className="opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                    <Icons.ArrowUpRight className="w-5 h-5 text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 p-1 rounded-full border border-amber-500/20 shadow-xs" />
                  </div>
                </div>

                <div className="transform transition-transform duration-300 group-hover:-translate-y-1 z-10 mt-6 animate-none">
                  <h3 className="font-display font-bold text-gray-950 dark:text-white text-base sm:text-lg tracking-tight mb-2 flex items-center gap-1.5 transition-colors">
                    <span>{feat.title}</span>
                    <Icons.Sparkles className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100" />
                  </h3>
                  <p className="font-sans text-gray-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed transition-colors">
                    {feat.description}
                  </p>
                </div>

                {/* Professional bottom brand highlighting bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
