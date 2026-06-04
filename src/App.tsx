/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useEffect } from "react";
import { MessageSquare, Phone, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BUSINESS_INFO } from "./data";
import logoImage from "./assets/images/wag-logo.png";

// Sub Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import GuestSlider from "./components/GuestSlider";
import Reviews from "./components/Reviews";
import BookingSystem from "./components/BookingSystem";
import InstagramFeed from "./components/InstagramFeed";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import SEOProviders from "./components/SEOProviders";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("boarding");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(completeTimer);
    };
  }, []);

  // Monitor document scrolling for Scroll to Top appearance
useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  // Sync dark class on document body
  useEffect(() => {
    const bodyEl = document.documentElement;
    if (darkMode) {
      bodyEl.classList.add("dark");
    } else {
      bodyEl.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("book-stay");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleServiceBookingTrigger = (serviceType: string) => {
    setSelectedServiceId(serviceType);
    scrollToBooking();
  };

  return (
    <div className={`min-h-screen transition-colors duration-350 ${darkMode ? "dark bg-slate-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      
      {/* Animated Loading Splash Screen with Splash brand-color rounded circle & loading indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.45, ease: "easeInOut" } 
            }}
            className="fixed inset-0 z-[9999] bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 select-none overflow-hidden bg-splash"
          >
            {/* Elegant Ambient Background Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex items-center justify-center">
              {/* Outer brand-color loading circle spinner */}
              <motion.div
                className="absolute w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-500"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Matching thin track ring behind the spinner */}
              <div className="absolute w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] rounded-full border-4 border-amber-500/10 dark:border-amber-500/5 px-2" />

              {/* Main Inside rounded circle holding the bigger brand logo */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-[190px] h-[190px] sm:w-[230px] sm:h-[230px] rounded-full bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 shadow-2xl flex items-center justify-center p-6 z-10"
              >
                <img
                  src={logoImage}
                  alt="The Wag Social Logo"
                  className="h-28 sm:h-36 w-auto dark:invert transition-all duration-300 object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Structural Dynamic SEO JSON-LD Injections */}
      <SEOProviders />

      {/* Glassmorphic Navbar sticky header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onBookNowClick={scrollToBooking}
      />

      {/* Layout Components */}
      <main>
        
        {/* Cinematic video Hero intro segment */}
        <Hero
          onBookNowClick={scrollToBooking}
          onScheduleVisitClick={scrollToBooking}
        />

        {/* Dynamic Bento Why Choose Us */}
        <WhyChooseUs />

        {/* Story Section detailed specifications */}
        <About />

        {/* Pricing & Custom Calculators */}
        <Services onBookClick={handleServiceBookingTrigger} />

        {/* Lightbox responsive grid Gallery */}
        <Gallery />

        {/* Happy guest slideshow testimonials */}
        <GuestSlider />

        {/* Review blocksaggregate Google layout */}
        <Reviews />

        {/* Smart scheduler calendar bookings wrapper */}
        <BookingSystem selectedServiceId={selectedServiceId} />

        {/* Beautiful high quality Mock Instagram posts */}
        <InstagramFeed />

        {/* SEO accordion FAQs disclosures */}
        <FAQ />

      </main>

      {/* Footer detailing localities served & map coordinates */}
      <Footer />

      {/* Floating Auxiliary Tools HUD (WhatsApp & Support Lines) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        
        {/* Floating Book a Stay Button */}
        {/* <button
          onClick={scrollToBooking}
          className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full font-sans font-bold text-xs tracking-wider uppercase shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-[0.97] transition-all cursor-pointer border border-amber-400 group animate-bounce-subtle"
          title="Book a Stay Now"
        >
          <span>Book a Stay</span>
          <span className="text-sm font-normal group-hover:rotate-12 transition-transform">🐾</span>
        </button> */}

        {/* Scroll back to top anchor */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-3.5 bg-white dark:bg-slate-800 hover:bg-amber-500 hover:text-white border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-white rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Click to Direct Line Dialog caller */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="p-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center border border-amber-400"
          title="Call Care Team"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Floating WhatsApp Action trigger */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-500/35 hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-emerald-400 cursor-pointer"
          title="Instant Support on WhatsApp"
        >
          <span className="absolute right-full mr-3 py-1.5 px-3 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-mono tracking-widest font-bold uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-md pointer-events-none border border-slate-800">
            Chat with Varthur Caretakers 🐾
          </span>
          
          <MessageSquare className="w-6 h-6 animate-pulse" />
          
          {/* Active green alert ping */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </a>

      </div>

    </div>
  );
}
