/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle, PhoneCall } from "lucide-react";
import { FAQ_DATA, BUSINESS_INFO } from "../data";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq1");

  const toggleFAQ = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
            SEO Helper & FAQs
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight mb-4">
            Common Inquiries & Local Information
          </h2>
          <p className="font-sans text-gray-650 dark:text-slate-300 text-lg">
            Find immediate clarity regarding vaccination guidelines, nutrition routines, emergency coordinates, and overnight cage-free parameters.
          </p>
        </div>

        {/* Accordions suite */}
        <div className="space-y-4">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-850 border border-gray-150 dark:border-slate-800 rounded-2xl transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md"
              >
                {/* Header button triggers */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="font-display font-bold text-gray-900 dark:text-white text-base tracking-tight leading-tight">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>

                {/* Disclosure Body panel details. Use raw conditional for bulletproof performance */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-72 opacity-100 border-t border-gray-100 dark:border-slate-800" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 font-sans text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed bg-gray-50/30 dark:bg-slate-900/10">
                    {item.answer}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Visual Support Block CTA */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full filter blur-xl" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3.5 bg-amber-500/10 text-amber-500 border border-amber-500/25 rounded-2xl animate-pulse">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Have localized requests or custom requirements?</h3>
              <p className="font-sans text-slate-400 text-xs mt-0.5 max-w-md">Our canine experts are located near Varthur Milk Dairy. Phone lines are open 24/7 for urgent check-ins.</p>
            </div>
          </div>

          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold text-xs uppercase tracking-widest text-center shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Connect: {BUSINESS_INFO.phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
