/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon, Play } from "lucide-react";
import { GALLERY_DATA } from "../data";

export default function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Boarding Area",
    "Play Zones",
    "Grooming Station",
    "Happy Dogs",
    "Outdoor Activities",
    "Indoor Facilities",
    "Videos",
  ];

  // Filtering images based on selection
  const filteredImages = filter === "All"
    ? GALLERY_DATA
    : GALLERY_DATA.filter((img) => img.category === filter);

  const openLightbox = (imgId: string) => {
    const index = GALLERY_DATA.findIndex((img) => img.id === imgId);
    if (index !== -1) setActiveImageIndex(index);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      const nextIndex = (activeImageIndex + 1) % GALLERY_DATA.length;
      setActiveImageIndex(nextIndex);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      const prevIndex = (activeImageIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
      setActiveImageIndex(prevIndex);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Facility Showroom
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight mb-4">
            Peer Inside The Canine Paradise
          </h2>
          <p className="font-sans text-gray-600 dark:text-slate-300 text-lg">
            High-integrity live captures from our Varthur play fields, climate-controlled sleep corridors, and pampering grooming tubs.
          </p>
        </div>

        {/* Category Filters row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-sans font-medium text-xs sm:text-sm tracking-wide transition-all cursor-pointer ${
                filter === cat
                  ? "bg-slate-900 dark:bg-amber-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-slate-850 text-gray-600 dark:text-slate-300 hover:bg-gray-200/80 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, type: "spring", stiffness: 120 }}
                onClick={() => openLightbox(image.id)}
                className="group relative aspect-4/3 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 dark:border-slate-850 cursor-pointer"
              >
                {/* Lazy-loaded photo */}
                <picture>
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </picture>

                {/* Video Play Overlay Centered button */}
                {image.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="p-4 bg-slate-950/80 text-amber-500 rounded-full border border-amber-500/30 shadow-xl backdrop-blur-md transition-all scale-95 group-hover:scale-110 duration-300">
                      <Play className="w-7 h-7 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Translucent overlay panel on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between z-10">
                  <div className="max-w-[80%]">
                    <span className="inline-block px-2.5 py-0.5 bg-amber-500 text-[10px] font-mono font-bold uppercase rounded-md mb-2 text-white">
                      {image.category}
                    </span>
                    <h3 className="font-display font-bold text-white text-base tracking-tight mb-0.5">
                      {image.title}
                    </h3>
                    <p className="font-sans text-slate-300 text-[11px] leading-tight line-clamp-1">
                      {image.description}
                    </p>
                  </div>
                  <div className="p-3 bg-white/20 hover:bg-amber-500 text-white rounded-xl backdrop-blur-md transition-colors flex-shrink-0">
                    {image.isVideo ? <Play className="w-4 h-4 fill-current" /> : <Eye className="w-4 h-4" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Popout Modal container */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              id="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIndex(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              {/* Close core trigger */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-amber-500 text-white rounded-full transition-colors cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Slider Controls */}
              <button
                onClick={(e) => handlePrev(e)}
                className="absolute left-4 p-3 bg-white/5 hover:bg-amber-500 text-white rounded-full transition-colors cursor-pointer"
                title="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => handleNext(e)}
                className="absolute right-4 p-3 bg-white/5 hover:bg-amber-500 text-white rounded-full transition-colors cursor-pointer"
                title="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Modal Card frame */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative flex flex-col justify-between"
              >
                <div className="h-[65vh] w-full relative flex items-center justify-center bg-black overflow-hidden">
                  {GALLERY_DATA[activeImageIndex].isVideo && GALLERY_DATA[activeImageIndex].videoUrl ? (
                    <iframe
                      src={`${GALLERY_DATA[activeImageIndex].videoUrl}?autoplay=1&mute=1&controls=1&rel=0`}
                      title={GALLERY_DATA[activeImageIndex].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0 absolute inset-0"
                    />
                  ) : (
                    <picture>
                      <img
                        src={GALLERY_DATA[activeImageIndex].imageUrl}
                        alt={GALLERY_DATA[activeImageIndex].title}
                        className="max-w-full max-h-[65vh] object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </picture>
                  )}
                </div>

                {/* Captions Block */}
                <div className="p-6 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 bg-amber-500 text-[10px] font-mono uppercase font-bold tracking-wider rounded-md text-white">
                      {GALLERY_DATA[activeImageIndex].category}
                    </span>
                    <h3 className="font-display font-bold text-xl tracking-tight text-white mt-2">
                      {GALLERY_DATA[activeImageIndex].title}
                    </h3>
                    <p className="font-sans text-slate-400 text-sm mt-1 leading-relaxed">
                      {GALLERY_DATA[activeImageIndex].description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-slate-500 text-xs font-mono">
                    Slide {activeImageIndex + 1} of {GALLERY_DATA.length}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
