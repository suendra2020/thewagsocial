/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Sparkles, Smile, MessageSquare, Info, Calculator, CheckCircle, Flame, Gift } from "lucide-react";
import { SERVICES_DATA } from "../data";

interface ServicesProps {
  onBookClick: (serviceType: string) => void;
}

export default function Services({ onBookClick }: ServicesProps) {
  const [activeServiceTab, setActiveServiceTab] = useState<string>("boarding");
  const [calcDays, setCalcDays] = useState<number>(3);
  const [includeGroomingAddon, setIncludeGroomingAddon] = useState<boolean>(false);

  const selectedService = SERVICES_DATA.find((s) => s.id === activeServiceTab) || SERVICES_DATA[0];

  // Price estimate math
  const calculateTotalEstimate = () => {
    let rate = selectedService.startingPrice;
    let base = rate * calcDays;
    
    // Day limits discount triggers
    if (calcDays >= 7 && calcDays < 15) {
      base = base * 0.90; // 10% off
    } else if (calcDays >= 15) {
      base = base * 0.85; // 15% off
    }

    if (includeGroomingAddon) {
      base += 999; // Standard spa top-up at discounted rates
    }

    return Math.round(base);
  };

  const getDiscountText = () => {
    if (calcDays >= 7 && calcDays < 15) return "10% Multi-Day Discount Applied! 🎁";
    if (calcDays >= 15) return "15% Long-Term Stay discount active! 🌟";
    return "";
  };

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Services & Transparent Estimations
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight mb-4">
            Tailor-Made Canine Support Solutions
          </h2>
          <p className="font-sans text-gray-600 dark:text-slate-300 text-lg">
            Whether overnight boarding, afternoon day care socialization, or expert spa grooming washes—select a service below to explore features & run instant cost estimates.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                setActiveServiceTab(service.id);
                // Adjust days if they tap short session services
                if (service.id === "grooming" || service.id === "puppy" || service.id === "transportation") {
                  setCalcDays(1);
                } else if (calcDays === 1) {
                  setCalcDays(3);
                }
              }}
              className={`px-5 py-3 rounded-xl font-sans font-semibold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeServiceTab === service.id
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                  : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-750 border border-gray-200/60 dark:border-slate-800"
              }`}
            >
              <span>{service.title}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Service Grid layout containing info sheet & price calculator side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Active Service features sheet (Left) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800/80 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase">
                  Service Specifications
                </span>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Available 24/7
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight mb-4">
                {selectedService.title}
              </h3>
              
              <p className="font-sans text-gray-650 dark:text-slate-300 text-md leading-relaxed mb-6">
                {selectedService.fullDesc}
              </p>

              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-1.5">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                Featured Inclusions & Touch Points
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {selectedService.highlights.map((hlt, idx) => (
                  <div key={idx} className="font-sans text-sm text-gray-700 dark:text-slate-300 flex items-start gap-2 bg-gray-50/50 dark:bg-slate-900/40 border border-gray-100/45 dark:border-slate-850 p-2.5 rounded-xl">
                    <span className="text-amber-500 font-bold text-xs mt-0.5">🐾</span>
                    <span>{hlt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t border-gray-100 dark:border-slate-750 pt-6 gap-4">
              <div>
                <div className="text-xs font-sans text-gray-500 dark:text-slate-400">Standard Price Scale</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white font-display mt-0.5">
                  {selectedService.pricingRange}
                </div>
              </div>

              <button
                id="services-book-tab"
                onClick={() => onBookClick(selectedService.id)}
                className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-850 dark:hover:bg-amber-600 text-white font-sans font-semibold text-sm transition-all shadow-md active:scale-95 cursor-pointer text-center"
              >
                Book {selectedService.title}
              </button>
            </div>
          </div>

          {/* Interactive Pricing Estimator (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Soft decorative visual pattern backdrop */}
            <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-amber-400" />
                <span className="font-display font-medium text-sm text-amber-400 lowercase tracking-wider uppercase">
                  Instant Price Estimator
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-tight mb-2">
                Estimate Your Stay
              </h3>
              <p className="font-sans text-xs text-slate-400 mb-6 font-normal">
                Adjust timelines and add specialty upgrades to evaluate cost variations before checking in.
              </p>

              {/* Slider / Counters */}
              <div className="space-y-6 bg-slate-850/50 border border-slate-800/40 p-5 rounded-2xl">
                <div>
                  <div className="flex items-center justify-between font-sans text-xs mb-2">
                    <span className="text-slate-300 font-medium">Duration of Services</span>
                    <span className="text-amber-400 font-mono font-bold text-sm">
                      {calcDays} {selectedService.id === "grooming" || selectedService.id === "transportation" ? "Qty/Trip" : calcDays === 1 ? "Day" : "Days"}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max={selectedService.id === "grooming" || selectedService.id === "transportation" ? "5" : "30"}
                    value={calcDays}
                    onChange={(e) => setCalcDays(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  
                  <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-2.5">
                    <span>1 Unit</span>
                    <span>15 Days (10% off)</span>
                    <span>30 Days (15% off)</span>
                  </div>
                </div>

                {/* Optional Grooming Spa Bundle top-up option */}
                {selectedService.id !== "grooming" && (
                  <div className="border-t border-slate-800/50 pt-5">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={includeGroomingAddon}
                        onChange={(e) => setIncludeGroomingAddon(e.target.checked)}
                        className="mt-1 w-4 h-4 text-amber-500 bg-slate-800 border-slate-700 rounded-md focus:ring-amber-500 focus:ring-2 accent-amber-500"
                      />
                      <div>
                        <div className="font-semibold text-xs text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                          Add Warm Spa Bath & Cleansing (+₹999)
                          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                          Complete professional coat combing and deep herbal wash on exit day! Highly recommended.
                        </div>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* Reward/Coupon alerts */}
              {getDiscountText() && (
                <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span>{getDiscountText()}</span>
                </div>
              )}
            </div>

            {/* Price Outputs */}
            <div className="mt-8 border-t border-slate-800/60 pt-6">
              <div className="flex items-center justify-between text-xs font-sans mb-1.5">
                <span className="text-slate-400">Indicative Price:</span>
                <span className="text-slate-400 font-mono">
                  ₹{selectedService.startingPrice} × {calcDays}
                </span>
              </div>
              
              {includeGroomingAddon && selectedService.id !== "grooming" && (
                <div className="flex items-center justify-between text-xs font-sans mb-3 text-slate-400">
                  <span>Addon Organic Spa Bath:</span>
                  <span className="font-mono">₹999</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-sans text-amber-400 uppercase tracking-widest font-bold">Total Estimated</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1 tracking-tight">
                    ₹{calculateTotalEstimate()}
                    <span className="text-xs text-slate-400 font-sans font-normal ml-1">approx</span>
                  </div>
                </div>

                <button
                  id="checkout-estimation"
                  onClick={() => onBookClick(selectedService.id)}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Confirm Stay
                </button>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-slate-500 text-[10px] bg-slate-950/40 p-2 rounded-lg">
                <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Pricing is indicative of average breed sizing. Special diets/needs custom quoted during briefing check-in.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
