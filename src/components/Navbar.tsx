/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PawPrint, Phone, Menu, X, Moon, Sun, Shield } from "lucide-react";
import { BUSINESS_INFO } from "../data";
import logoImage from "../assets/images/wag-logo.png";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onBookNowClick: () => void;
}

export default function Navbar({ darkMode, setDarkMode, onBookNowClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
      if (window.scrollY < 120) {
        setActiveLink("");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0, 0.1],
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isClickingRef.current) return;
      if (window.scrollY < 120) {
        setActiveLink("");
        return;
      }
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sectionIds = ["why-choose-us", "about", "services", "gallery", "guests", "faq"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = [
    { name: "Why Us", href: "#why-choose-us" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Guests", href: "#guests" },
    { name: "FAQs", href: "#faq" },
  ];

  return (
    <>
      <header
        id="app-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl shadow-lg border-b border-gray-150/80 dark:border-slate-800"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo Group */}
            <a href="#" className="flex items-center group select-none">
              <img
                src={logoImage}
                alt="The Wag Social Logo"
                referrerPolicy="no-referrer"
                className="h-[84px] sm:h-[108px] md:h-[116px] w-auto dark:invert transition-all duration-300 group-hover:scale-[1.03]"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 bg-gray-100/80 dark:bg-slate-950/40 p-1.5 rounded-full border border-gray-200/50 dark:border-slate-800/40">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveLink(link.href);
                      isClickingRef.current = true;
                      
                      const targetId = link.href.slice(1);
                      const targetEl = document.getElementById(targetId);
                      if (targetEl) {
                        const navbarHeight = document.getElementById("app-navbar")?.clientHeight || 75;
                        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 2;
                        window.scrollTo({
                          top: targetPosition,
                          behavior: "smooth"
                        });
                      }

                      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
                      clickTimeoutRef.current = setTimeout(() => {
                        isClickingRef.current = false;
                      }, 1200);
                    }}
                    className={`font-sans text-xs sm:text-sm font-semibold tracking-wide py-1.5 px-4 rounded-full transition-all duration-300 relative ${
                      isActive
                        ? "text-amber-500 dark:text-amber-400"
                        : "text-gray-650 dark:text-slate-350 hover:text-amber-500 dark:hover:text-amber-400"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 dark:border-amber-500/35 rounded-full shadow-sm shadow-amber-500/5"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Actions Panel */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                id="toggle-theme-desktop"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 text-gray-500 dark:text-slate-300 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>

              {/* Instant Call */}
              <a
                id="nav-call-action"
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-200 hover:text-amber-500 transition-colors"
              >
                <div className="p-2 bg-amber-50 dark:bg-slate-800 text-amber-500 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{BUSINESS_INFO.phone}</span>
              </a>

              {/* Booking Button */}
              <button
                id="nav-book-button"
                onClick={onBookNowClick}
                className="relative overflow-hidden px-5 py-2.5 font-sans font-semibold text-sm text-white rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                Book a Stay
              </button>
            </div>

            {/* Tablet & Mobile Right Panel controls */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                id="toggle-theme-mobile"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-500 dark:text-slate-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
              >
                {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-gray-700" />}
              </button>

              <button
                id="mobile-menu-trigger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all-colors"
                title="Open menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              id="mobile-drawer-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 w-4/5 max-w-xs h-full bg-white dark:bg-slate-900 border-l border-gray-150 dark:border-slate-800 p-6 flex flex-col justify-between"
            >
              <div className="mt-14">
                <div className="flex items-center gap-1 mb-8">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-bold">
                    Cage-Free Boarding Campus
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-gray-800 dark:text-white text-sm mb-4">Navigations</h3>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const isActive = activeLink === link.href;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveLink(link.href);
                          isClickingRef.current = true;
                          
                          const targetId = link.href.slice(1);
                          const targetEl = document.getElementById(targetId);
                          if (targetEl) {
                            const navbarHeight = document.getElementById("app-navbar")?.clientHeight || 75;
                            const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 2;
                            window.scrollTo({
                              top: targetPosition,
                              behavior: "smooth"
                            });
                          }

                          if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
                          clickTimeoutRef.current = setTimeout(() => {
                            isClickingRef.current = false;
                          }, 1200);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-lg font-semibold tracking-wide transition-all ${
                          isActive
                            ? "text-amber-500 dark:text-amber-400 px-2.5 py-1 bg-amber-500/10 rounded-xl"
                            : "text-gray-700 dark:text-slate-200 hover:text-amber-500"
                        }`}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-100 dark:border-slate-800 pt-6">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-250 dark:border-slate-800 font-medium text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>Call: {BUSINESS_INFO.phone}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookNowClick();
                  }}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-md shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  Book Stay Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
