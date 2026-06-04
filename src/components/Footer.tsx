/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PawPrint, MapPin, Phone, Mail, Instagram, Clock, ShieldCheck, HeartPulse } from "lucide-react";
import { BUSINESS_INFO, SERVICES_DATA } from "../data";
import logoImage from "../assets/images/wag-logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const areasServedByWag = [
    "Varthur", "Whitefield", "Sarjapur Road", "Marathahalli",
    "Bellandur", "Brookefield", "East Bangalore", "Gunjur", "Halasuru"
  ];

  const prioritySeoTagKeywords = [
    "Dog Boarding Bengaluru", "Dog Boarding Varthur", "Pet Boarding Bangalore",
    "Dog Hostel Bangalore", "Pet Care Bengaluru", "Dog Day Care Bengaluru",
    "Dog Grooming Bengaluru", "Luxury Dog Boarding Bangalore", "Best Dog Boarding Near Me",
    "Dog Boarding Whitefield", "Dog Boarding Sarjapur Road", "Dog Boarding East Bangalore",
    "Pet Staycation Bangalore", "Puppy Boarding Bangalore", "Cage Free Dog Boarding Bangalore",
    "Pet Boarding Whitefield", "Dog Hostel Near Me", "Pet Grooming Varthur"
  ];

  return (
    <footer id="app-footer" className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900 transition-colors">
      
      {/* Upper informational cards layout: Contact Details + Embed Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-slate-900">
        
        {/* Brand description & coordinates (Column Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center select-none">
            <img
              src={logoImage}
              alt="The Wag Social Logo"
              referrerPolicy="no-referrer"
              className="h-16 w-auto invert opacity-90 hover:opacity-100 transition-all duration-300"
            />
          </div>

          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            East Bangalore's premier nature-filled, entirely cage-free dog boarding, luxury day care, and hygiene spa salon. Dedicated to safety, exercise loops, and loving supervision.
          </p>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed text-slate-300">
                Site No. 38/1, Valepura Road, Near Milk Dairy, Varthur, Bengaluru, Karnataka 560087
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-amber-400 text-slate-350 font-bold transition-colors">
                {BUSINESS_INFO.phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-slate-350">contact@thewagsocial.in</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="text-emerald-400 uppercase font-semibold">
                {BUSINESS_INFO.operatingHours}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation lists (Column Span 3) */}
        <div className="lg:col-span-3 space-y-6">
          <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest">
            Expert Dog Services
          </h3>
          <ul className="space-y-3 text-xs font-mono">
            {SERVICES_DATA.map((srv) => (
              <li key={srv.id}>
                <a href="#services" className="hover:text-amber-500 hover:translate-x-1 inline-block transition-all">
                  🐾 {srv.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Embedded Iframe Google maps (Column Span 4) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest">
            Varthur Campus Location
          </h3>
          
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl h-44 bg-slate-900 relative">
            <iframe
              title="The Wag Social Google Map Location"
              src={BUSINESS_INFO.gmapEmbedUrl}
              className="w-full h-full border-0 grayscale opacity-90 contrast-125 focus:outline-none"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>

      {/* SEO Area Tag Clouds & Locality Directories (High Value SEO) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-900 space-y-6 text-xs">
        <div>
          <h4 className="font-display font-bold text-slate-200 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Areas We Proudly Serve
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {areasServedByWag.map((area) => (
              <span
                key={area}
                className="px-2.5 py-1 bg-slate-900/60 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-lg text-slate-400 transition-colors font-mono"
              >
                📍 {area}, Bangalore
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-200 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-amber-500" />
            Priority SEO Indexed Terms
          </h4>
          <div className="flex flex-wrap gap-2 text-[10px] font-mono leading-relaxed">
            {prioritySeoTagKeywords.map((tag) => (
              <span
                key={tag}
                className="text-slate-500 hover:text-amber-400 transition-colors"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyrights and Credentials declaration */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          &copy; {currentYear} <strong>The Wag Social</strong> • Designed with premium 2026 canine UI standards. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6 font-mono">
          <a href={`https://instagram.com/${BUSINESS_INFO.instagramUser}`} target="_blank" rel="noreferrer" className="hover:text-amber-500 flex items-center gap-1">
            <Instagram className="w-4 h-4" />
            <span>@thewagsocial</span>
          </a>
          <span>•</span>
          {/* <span>Optimized for Netlify</span> */}
        </div>
      </div>

    </footer>
  );
}
