/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Instagram, Heart, MessageCircle, ExternalLink, ShieldCheck, Users } from "lucide-react";
import { INSTAGRAM_POSTS_DATA, BUSINESS_INFO } from "../data";

export default function InstagramFeed() {
  return (
    <section id="instagram-feed" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Social Sync
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight mb-4">
            Follow Our Daily Adventures On Instagram
          </h2>
          <p className="font-sans text-gray-650 dark:text-slate-300 text-lg">
            Get your daily dose of wagging tails, splashing sensory activities, and grooming cleanups by syncing with our official handle.
          </p>
        </div>

        {/* IG Header Account Summary */}
        <div className="max-w-2xl mx-auto mb-12 p-5 bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Account Logo */}
            <div className="relative w-14 h-14 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-slate-100 flex items-center justify-center text-slate-850">
                <Instagram className="w-6 h-6 text-slate-950" />
              </div>
            </div>

            <div>
              <div className="font-display font-bold text-gray-900 dark:text-white text-base flex items-center gap-1.5">
                @{BUSINESS_INFO.instagramUser}
                <span className="p-0.5 bg-blue-500 text-white rounded-full" title="Verified Brand Signature">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
              </div>
              <div className="flex items-center gap-3 font-sans text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> <strong>4.8K</strong> Followers</span>
                <span>•</span>
                <span><strong>520</strong> Posts</span>
              </div>
            </div>
          </div>

          <a
            href={`https://instagram.com/${BUSINESS_INFO.instagramUser}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-950 dark:bg-amber-500 hover:bg-slate-850 dark:hover:bg-amber-600 text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <span>Follow Brand</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Instafeeds grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS_DATA.map((post) => (
            <a
              key={post.id}
              href={`https://instagram.com/${BUSINESS_INFO.instagramUser}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-gray-100 dark:border-slate-850 shadow-xs cursor-pointer"
            >
              <picture>
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </picture>

              {/* Interactions Dark hover overlay details */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-10">
                <div className="flex items-center gap-5 text-white font-mono font-bold text-sm sm:text-base">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <p className="px-5 text-slate-200 text-[10px] sm:text-xs text-center leading-relaxed line-clamp-2 max-w-[90%] font-sans">
                  {post.caption}
                </p>
                
                <span className="text-[9px] font-mono text-slate-400">{post.date}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
