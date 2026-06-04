/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, ShieldCheck, HeartPulse, UserCircle2, ArrowRight } from "lucide-react";
import { REVIEWS_DATA, BUSINESS_INFO } from "../data";
import { ReviewEntry } from "../types";

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewEntry[]>(REVIEWS_DATA);
  const [newAuthor, setNewAuthor] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [showForm, setShowForm] = useState(false);

  // Form submission handler
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;

    const added: ReviewEntry = {
      id: `r_user_${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: "Just now (Simulated)",
      text: newText,
      isGoogleVerified: true,
      initials: newAuthor.substring(0, 2).toUpperCase() || "PA"
    };

    setReviews([added, ...reviews]);
    setNewAuthor("");
    setNewText("");
    setNewRating(5);
    setShowForm(false);
  };

  return (
    <section id="reviews" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Ratings Verification
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight mb-4">
            Real Reviews From Real Pet Parents
          </h2>
          <p className="font-sans text-gray-650 dark:text-slate-300 text-lg">
            Read actual verified reviews left on Google Maps. We are proud of our absolute 5.0 five-star standing in Bengaluru!
          </p>
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Aggregate Stats Dashboard (Left Side) */}
          <div className="lg:col-span-4 bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-center gap-1.5 text-rose-500 bg-white dark:bg-slate-850 border border-gray-200/50 dark:border-slate-800 w-fit mx-auto px-3 py-1.5 rounded-xl shadow-xs text-xs font-semibold mb-6">
                <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
                <span>100% Trust Factor</span>
              </div>

              {/* Huge Google Maps Logo representation */}
              <div className="font-display font-bold text-3xl mb-1 text-gray-900 dark:text-white">
                Google Rating
              </div>
              
              <div className="text-7xl font-mono font-extrabold text-gray-900 dark:text-white mt-2">
                5.0
              </div>

              <div className="flex justify-center text-amber-400 gap-1.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400" />
                ))}
              </div>

              <div className="font-sans text-xs text-gray-500 dark:text-slate-400 mt-3 font-semibold uppercase tracking-wider">
                100+ Happy Client Ratings
              </div>
            </div>

            {/* Micro rating bars breakdown */}
            <div className="mt-8 space-y-2 border-t border-gray-200/60 dark:border-slate-800 pt-6">
              {[
                { label: "5 Star", count: "100%", width: "w-full", color: "bg-amber-400" },
                { label: "4 Star", count: "0%", width: "w-0", color: "bg-gray-200" },
                { label: "3 Star", count: "0%", width: "w-0", color: "bg-gray-200" },
              ].map((bar, i) => (
                <div key={i} className="flex items-center gap-3 font-sans text-xs">
                  <span className="w-12 text-slate-500 font-medium text-left">{bar.label}</span>
                  <div className="flex-grow h-2.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${bar.color} ${bar.width}`} />
                  </div>
                  <span className="w-8 text-right text-gray-700 dark:text-slate-300 font-mono font-bold">{bar.count}</span>
                </div>
              ))}
            </div>

            {/* Click to add custom review simulated */}
            <button
              id="write-review-button"
              onClick={() => setShowForm(!showForm)}
              className="mt-8 w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-750 text-white font-sans font-semibold text-sm transition-all border border-transparent shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              Write a Google Review
            </button>
          </div>

          {/* List of Verified Reviews cards (Right Side) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Conditional Simulated Review Composer */}
            {showForm && (
              <form
                onSubmit={handleAddReview}
                className="p-6 bg-gradient-to-r from-amber-500/5 to-amber-600/10 border-2 border-dashed border-amber-500/25 rounded-3xl animate-fadeIn space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Post Simulated Google Maps Review
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-xs text-amber-750 dark:text-amber-300 font-semibold underline"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Parent Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Varun Shekhar"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Rating Score (Stars) *</label>
                    <div className="flex items-center gap-1.5 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Your Review Text *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your dog's stay experience with our Varthur caregivers..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold text-xs uppercase tracking-wider relative active:scale-95 transition-transform"
                >
                  Submit Simulated Review
                </button>
              </form>
            )}

            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white dark:bg-slate-900/60 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start"
              >
                {/* Initials profile bubble */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-150 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-bold text-sm flex items-center justify-center">
                  {rev.initials}
                </div>

                {/* Body Content */}
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                    <div>
                      <h4 className="font-display font-bold text-gray-950 dark:text-white text-base leading-none flex items-center gap-1.5">
                        {rev.author}
                        {rev.isGoogleVerified && (
                          <span
                            className="inline-flex items-center gap-0.5 text-[9px] font-mono uppercase bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-250 dark:border-emerald-850 text-emerald-500 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded-md"
                            title="Verified Google Maps reviewer"
                          >
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            <span>Verified</span>
                          </span>
                        )}
                      </h4>
                      <div className="flex text-amber-400 gap-0.5 mt-1.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <span className="text-xs text-gray-400 tracking-wide font-sans">{rev.date}</span>
                  </div>

                  <p className="font-sans text-gray-700 dark:text-slate-300 text-sm leading-relaxed">
                    {rev.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
