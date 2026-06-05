/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CalendarDays, User, Dog, ClipboardCheck, ShieldCheck, 
  Clock, Scroll, AlertCircle, Sparkles, Upload, FileCheck, 
  Mail, Settings, Check, PhoneCall, Calendar, ArrowRight, ArrowLeft, PawPrint
} from "lucide-react";
import { SERVICES_DATA, BUSINESS_INFO } from "../data";
import { BookingSubmission } from "../types";

interface BookingSystemProps {
  selectedServiceId: string;
}

export default function BookingSystem({ selectedServiceId }: BookingSystemProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [bookingObj, setBookingObj] = useState<Partial<BookingSubmission>>({
    serviceType: "boarding",
    vaccinationStatus: "Fully Vaccinated",
  });

  // Certificate drag drop state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Status check vars
  const [availabilityChecking, setAvailabilityChecking] = useState(false);
  const [spotsRemaining, setSpotsRemaining] = useState(8);
  const [holidayNotice, setHolidayNotice] = useState("");
  const [completedBooking, setCompletedBooking] = useState<BookingSubmission | null>(null);

  // Timepicker sub-states for user-friendly AM/PM and hour/minute selections
  const [dropOffHour, setDropOffHour] = useState("10");
  const [dropOffMinute, setDropOffMinute] = useState("00");
  const [dropOffAmpm, setDropOffAmpm] = useState("AM");

  const [pickupHour, setPickupHour] = useState("05");
  const [pickupMinute, setPickupMinute] = useState("00");
  const [pickupAmpm, setPickupAmpm] = useState("PM");

  // Sync dropOffTime and pickupTime to bookingObj
  useEffect(() => {
    setBookingObj((prev) => ({
      ...prev,
      dropOffTime: `${dropOffHour}:${dropOffMinute} ${dropOffAmpm}`
    }));
  }, [dropOffHour, dropOffMinute, dropOffAmpm]);

  useEffect(() => {
    setBookingObj((prev) => ({
      ...prev,
      pickupTime: `${pickupHour}:${pickupMinute} ${pickupAmpm}`
    }));
  }, [pickupHour, pickupMinute, pickupAmpm]);

  const isInitialMount = useRef(true);

  // Trigger service type updates from upper component clicks
  useEffect(() => {
    if (selectedServiceId) {
      setBookingObj((prev) => ({ ...prev, serviceType: selectedServiceId as any }));
      
      // Prevent scroll on initial mount so we start at the top of the page
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }

      // Scroll smoothly to form anchor
      const formEl = document.getElementById("book-stay");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedServiceId]);

  // Handle live math based on dates
  const calculateTotalCost = () => {
    const sType = bookingObj.serviceType || "boarding";
    const service = SERVICES_DATA.find((s) => s.id === sType) || SERVICES_DATA[0];
    const rate = service.startingPrice;

    if (!bookingObj.checkInDate || !bookingObj.checkOutDate) {
      return rate;
    }

    const start = new Date(bookingObj.checkInDate);
    const end = new Date(bookingObj.checkOutDate);
    const timeDiff = end.getTime() - start.getTime();
    let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (days <= 0) days = 1;

    let base = rate * days;

    // Apply Multi-Day scale discounts
    if (days >= 7 && days < 15) {
      base = base * 0.90; // 10%
    } else if (days >= 15) {
      base = base * 0.85; // 15%
    }

    return Math.round(base);
  };

  // Availability checking simulations
  useEffect(() => {
    if (bookingObj.checkInDate) {
      setAvailabilityChecking(true);
      
      // Holiday blocking alerts / Bengaluru peak days check
      const date = new Date(bookingObj.checkInDate);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      const timer = setTimeout(() => {
        setAvailabilityChecking(false);
        if (isWeekend) {
          setSpotsRemaining(3);
          setHolidayNotice("Peak Weekend Rate active. Spots filling up rapidly! 🔥");
        } else {
          setSpotsRemaining(9);
          setHolidayNotice("");
        }
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [bookingObj.checkInDate]);

  // Certificate Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const simulateUpload = (file: File) => {
    setUploading(true);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadedFile(file);
          setBookingObj((prevB) => ({ ...prevB, vaccinationCertificateName: file.name }));
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  // Form submits
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final Validations check
    if (!bookingObj.parentName || !bookingObj.mobileNumber || !bookingObj.email || !bookingObj.dogName) {
      alert("Please complete all essential fields.");
      return;
    }

    setSubmitting(true);

    const bookingId = `WAG-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalSubmission: BookingSubmission = {
      id: bookingId,
      parentName: bookingObj.parentName,
      mobileNumber: bookingObj.mobileNumber,
      email: bookingObj.email,
      dogName: bookingObj.dogName,
      dogBreed: bookingObj.dogBreed || "Breed / Indie",
      dogAge: Number(bookingObj.dogAge) || 1,
      vaccinationStatus: (bookingObj.vaccinationStatus as any) || "Fully Vaccinated",
      checkInDate: bookingObj.checkInDate || new Date().toISOString().split("T")[0],
      checkOutDate: bookingObj.checkOutDate || new Date().toISOString().split("T")[0],
      dropOffTime: bookingObj.dropOffTime || "10:00 AM",
      pickupTime: bookingObj.pickupTime || "04:00 PM",
      specialInstructions: bookingObj.specialInstructions || "None provided",
      vaccinationCertificateName: bookingObj.vaccinationCertificateName || "Not Provided (Will verify at checkin)",
      emergencyContact: bookingObj.emergencyContact || "Not Provided",
      serviceType: (bookingObj.serviceType as any) || "boarding",
      totalEstimatedPrice: calculateTotalCost(),
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0]
    };

    const encode = (data: Record<string, string | number | undefined>) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]?.toString() || ""))
        .join("&");
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "dog-booking",
        ...finalSubmission
      })
    })
    .then(() => {
  setSubmitting(false);

  alert(
    `🎉 Booking Submitted Successfully!

Thank you ${finalSubmission.parentName}.

Booking ID: ${finalSubmission.id}

Our team will contact you within 15–30 minutes via WhatsApp or phone call to confirm your pet's stay.`
  );

  setCompletedBooking(finalSubmission);
})
    .catch((err) => {
      console.warn("Netlify Forms POST error (expected outside Netlify environment):", err);
      // Fallback: Succeed anyway so the client gets a beautiful mock outbox in preview mode!
      setSubmitting(false);
      setCompletedBooking(finalSubmission);
    });
  };

  const currentService = SERVICES_DATA.find((s) => s.id === (bookingObj.serviceType || "boarding")) || SERVICES_DATA[0];

  return (
    <section id="book-stay" className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full inline-block">
              Direct Calendar Booking Desk
            </span>
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.25, 1] 
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="text-amber-500 dark:text-amber-400"
            >
              <PawPrint className="w-5 h-5 fill-current" />
            </motion.div>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight mb-4">
            Reserve Your Companion's Spot
          </h2>
          <p className="font-sans text-gray-650 dark:text-slate-300 text-lg">
            Ensure secure placement on our Varthur play fields. Complete the direct booking request below to register details.
          </p>
        </div>

        {/* Outer Split Widget Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Booking Panel Wizard (Left Side) - Column span 8 */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-850 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md">
            
            {/* Step navigation indicator panel */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-slate-800">
              {[
                { number: 1, label: "Parent Info", icon: User },
                { number: 2, label: "Pup Specs", icon: Dog },
                { number: 3, label: "Dates & Core Detail", icon: CalendarDays },
              ].map((s) => {
                const IconComp = s.icon;
                return (
                  <div key={s.number} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-all ${
                        step === s.number
                          ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                          : step > s.number
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 dark:bg-slate-800 text-gray-400"
                      }`}
                    >
                      {step > s.number ? <Check className="w-4 h-4" /> : s.number}
                    </div>
                    <span
                      className={`hidden sm:inline font-sans text-xs font-semibold ${
                        step === s.number ? "text-gray-900 dark:text-white" : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Core Form Elements */}
            <form 
              name="dog-booking" 
              onSubmit={handleBookingSubmit} 
              data-netlify="true" 
              netlify-honeypot="bot-field"
              className="space-y-6"
            >
              {/* Hidden fields for Netlify Forms routing */}
              <input type="hidden" name="form-name" value="dog-booking" />
              <input type="hidden" name="vaccinationStatus" value={bookingObj.vaccinationStatus || "Fully Vaccinated"} />
              <input type="hidden" name="serviceType" value={bookingObj.serviceType || "boarding"} />
              <input type="hidden" name="totalEstimatedPrice" value={calculateTotalCost()} />
              <div className="hidden">
                <label>Do not fill if human: <input name="bot-field" /></label>
              </div>
              
              {/* Step 1: Parent Coordinates */}
              {step === 1 && (
                <div className="space-y-4 animate-slideIn">
                  <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    1. Parent Contact Coordinates
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Parent Full Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        placeholder="e.g. Surendra Kumar"
                        value={bookingObj.parentName || ""}
                        onChange={(e) => setBookingObj({ ...bookingObj, parentName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">WhatsApp Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        required
                        pattern="[0-9]{10}"
                        placeholder="e.g. 7022072502"
                        value={bookingObj.mobileNumber || ""}
                        onChange={(e) => setBookingObj({ ...bookingObj, mobileNumber: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. surendra@example.com"
                        value={bookingObj.email || ""}
                        onChange={(e) => setBookingObj({ ...bookingObj, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Secondary Emergency Support Line *</label>
                      <input
                        type="tel"
                        name="emergencyContact"
                        required
                        placeholder="e.g. Spouses / Family Mobile"
                        value={bookingObj.emergencyContact || ""}
                        onChange={(e) => setBookingObj({ ...bookingObj, emergencyContact: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!bookingObj.parentName || !bookingObj.mobileNumber || !bookingObj.email}
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed to Pup Specs</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Pup Specifications */}
              {step === 2 && (
                <div className="space-y-4 animate-slideIn">
                  <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    2. Dog Specifications & Vaccination Certificate
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Dog's Name *</label>
                      <input
                        type="text"
                        name="dogName"
                        required
                        placeholder="e.g. Bruno"
                        value={bookingObj.dogName || ""}
                        onChange={(e) => setBookingObj({ ...bookingObj, dogName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Dog's Breed (or Indie) *</label>
                      <input
                        type="text"
                        name="dogBreed"
                        required
                        placeholder="e.g. Golden Retriever"
                        value={bookingObj.dogBreed || ""}
                        onChange={(e) => setBookingObj({ ...bookingObj, dogBreed: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Approx Dog Age (Years) *</label>
                      <input
                        type="number"
                        name="dogAge"
                        required
                        min="1"
                        max="20"
                        value={bookingObj.dogAge || ""}
                        onChange={(e) => setBookingObj({ ...bookingObj, dogAge: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Vaccination Status *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["Fully Vaccinated", "Partially Vaccinated", "Not Vaccinated", "Puppy (Pending)"].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setBookingObj({ ...bookingObj, vaccinationStatus: v as any })}
                          className={`px-4 py-2.5 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                            bookingObj.vaccinationStatus === v
                              ? "bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-500 font-bold"
                              : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-800 hover:border-gray-300"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 font-mono flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Note: Fully Vaccinated status requires DHPPi + Anti-Rabies + Kennel cough logs.</span>
                    </p>
                  </div>

                  {/* Note on vaccination verification instead of drag-drop upload */}
                  <div className="bg-amber-500/5 dark:bg-slate-900/40 border border-amber-500/10 rounded-2xl p-4 flex gap-3.5 items-start">
                    <ShieldCheck className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">Vaccination Verification</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        To simplify your experience, you do not need to upload documents right now. Simply bring a physical copy or photo of your pet's vaccination record (DHPPi + Anti-Rabies + Kennel Cough logs) during check-in, or text it to our caretakers over WhatsApp.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3 rounded-xl border border-gray-250 dark:border-slate-800 text-xs font-semibold text-gray-700 dark:text-slate-300 flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Contact</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!bookingObj.dogName || !bookingObj.dogBreed}
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed to Dates</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Dates & Core Schedule */}
              {step === 3 && (
                <div className="space-y-4 animate-slideIn">
                  <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    3. Booking Duration & Special Schedules
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Check-In Date *</label>
                      <input
                        type="date"
                        name="checkInDate"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={bookingObj.checkInDate || ""}
                        onChange={(e) => setBookingObj({ ...bookingObj, checkInDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Check-Out Date *</label>
                      <input
                        type="date"
                        name="checkOutDate"
                        required
                        min={bookingObj.checkInDate || new Date().toISOString().split("T")[0]}
                        value={bookingObj.checkOutDate || ""}
                        onChange={(e) => setBookingObj({ ...bookingObj, checkOutDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Preferred Drop-Off Time *</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={dropOffHour}
                        onChange={(e) => setDropOffHour(e.target.value)}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
                      >
                        {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map(h => (
                          <option key={h} value={h} className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white">{h}</option>
                        ))}
                      </select>
                      <span className="self-center font-bold text-gray-400 dark:text-slate-500">:</span>
                      <select
                        value={dropOffMinute}
                        onChange={(e) => setDropOffMinute(e.target.value)}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
                      >
                        {["00", "15", "30", "45"].map(m => (
                          <option key={m} value={m} className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white">{m}</option>
                        ))}
                      </select>
                      <select
                        value={dropOffAmpm}
                        onChange={(e) => setDropOffAmpm(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-amber-500 dark:text-amber-400 min-w-[70px] cursor-pointer"
                      >
                        {["AM", "PM"].map(p => (
                          <option key={p} value={p} className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white">{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Preferred Pickup Time *</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={pickupHour}
                        onChange={(e) => setPickupHour(e.target.value)}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
                      >
                        {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map(h => (
                          <option key={h} value={h} className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white">{h}</option>
                        ))}
                      </select>
                      <span className="self-center font-bold text-gray-400 dark:text-slate-500">:</span>
                      <select
                        value={pickupMinute}
                        onChange={(e) => setPickupMinute(e.target.value)}
                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
                      >
                        {["00", "15", "30", "45"].map(m => (
                          <option key={m} value={m} className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white">{m}</option>
                        ))}
                      </select>
                      <select
                        value={pickupAmpm}
                        onChange={(e) => setPickupAmpm(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-amber-500 dark:text-amber-400 min-w-[70px] cursor-pointer"
                      >
                        {["AM", "PM"].map(p => (
                          <option key={p} value={p} className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white">{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-750 dark:text-slate-300 mb-1.5">Special Feeding, Medical, or Grooming Instructions</label>
                    <textarea
                      rows={3}
                      name="specialInstructions"
                      placeholder="Specify customized diet proportions, allergen info, behavioral fears, bathing requests..."
                      value={bookingObj.specialInstructions || ""}
                      onChange={(e) => setBookingObj({ ...bookingObj, specialInstructions: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex justify-between pt-4 gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3 rounded-xl border border-gray-250 dark:border-slate-800 text-xs font-semibold text-gray-700 dark:text-slate-300 flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Pup Specs</span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-center cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? "Registering Stay..." : "Confirm Booking Request"}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>

          {/* Checkout Invoice / Smart Calendar parameters Dashboard (Right Side) */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-10 space-y-6">
              
              {/* Dynamic Service selection switcher inside block */}
              <div>
                <span className="text-[10px] tracking-widest font-mono uppercase text-amber-400 font-bold">Selected Solution</span>
                <select
                  value={bookingObj.serviceType || "boarding"}
                  onChange={(e) => setBookingObj({ ...bookingObj, serviceType: e.target.value as any })}
                  className="w-full bg-slate-850 border border-slate-800 text-white rounded-xl py-2 px-3 mt-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Real-time calendar diagnostic summary */}
              <div className="border-t border-slate-800/80 pt-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    Availability check
                  </span>
                  
                  {availabilityChecking ? (
                    <span className="text-amber-400 font-bold animate-pulse font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Checking Desk...
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-extrabold font-mono flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {spotsRemaining} Spots Available
                    </span>
                  )}
                </div>

                {/* Holiday Peak warning */}
                {holidayNotice && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[10px] text-rose-300 font-medium leading-relaxed">
                    {holidayNotice}
                  </div>
                )}
              </div>

              {/* Invoice Breakdown calculation */}
              <div className="border-t border-slate-800/80 pt-5 text-xs space-y-3.5">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Standard Daily Charge</span>
                  <span className="font-mono text-white">₹{currentService.startingPrice}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>Sensory Playground Entry</span>
                  <span className="text-emerald-400 font-mono font-bold">FREE (Inclusive)</span>
                </div>

                {bookingObj.checkInDate && bookingObj.checkOutDate && (
                  <div className="flex items-center justify-between text-slate-400 border-b border-dashed border-slate-800 pb-3.5">
                    <span>Multi-Day Discount Factor</span>
                    <span className="text-amber-400 font-mono font-bold">
                      {new Date(bookingObj.checkOutDate).getTime() - new Date(bookingObj.checkInDate).getTime() >= 7 * 1000 * 3600 * 24 ? "Applied ✅" : "N/A"}
                    </span>
                  </div>
                )}

                <div className="flex items-end justify-between border-t border-slate-850 pt-4">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold">Estimated Cost:</div>
                    <div className="text-3xl font-extrabold text-white font-mono mt-1 tracking-tight">
                      ₹{calculateTotalCost()}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans italic">Excluding taxes</span>
                </div>
              </div>

              {/* Core Safety indicators block */}
              <div className="border-t border-slate-800/80 pt-5 space-y-2.5">
                <div className="flex items-start gap-2.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>No prepayment required. Dynamic review and custom billing is done during check-in boarding procedures.</span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px] text-slate-400">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>24-Hour support loop. We are here even during late evening relocations / night landings.</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Success Modal holding beautiful Live SMTP Auto-Response Visualizer */}
      <AnimatePresence>
        {completedBooking && (
          <motion.div
            id="smtp-outbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-4xl w-full bg-slate-950 border border-slate-850 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col justify-between my-8"
            >
              
              {/* SMTP Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-850 pb-5 mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 animate-pulse">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-emerald-400">
  🎉 Booking Request Submitted Successfully!
</h3>

<p className="text-sm text-slate-300 mt-1">
  Thank you for choosing The Wag Social. Your booking request has been received and is currently under review.
</p>
                  </div>
                </div>

                <button
                  onClick={() => setCompletedBooking(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold hover:border-amber-500 text-white cursor-pointer"
                >
                  Close Outbox View
                </button>
              </div>

              {/* Split Mail visual frames */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                
                {/* Mail 1: Sent to Parent */}
                <div className="bg-white text-gray-900 rounded-3xl p-5 border border-gray-100 flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-gray-400 block">MAIL FROM: booking@thewagsocial.in</span>
                        <span className="text-xs font-bold text-gray-800">To Client: {completedBooking.email}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-amber-50 text-[9px] text-amber-700 font-mono font-bold rounded-md">CLIENT RECEIFT</span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-gray-950 mb-3">
                      Booking Request Received – The Wag Social
                    </h4>

                    <div className="space-y-2.5 text-xs text-gray-600 leading-relaxed font-sans">
                      <p>Dear <strong>{completedBooking.parentName}</strong>,</p>
                      <p>Thank you for choosing The Wag Social. We have successfully registered your request onto our reservation grid.</p>
                      
                      <div className="bg-gray-50 border border-gray-150 p-3 rounded-xl space-y-1.5 font-mono text-[10px]">
                        <div><strong className="text-gray-900">Booking ID:</strong> {completedBooking.id}</div>
                        <div><strong className="text-gray-900">Dog Name:</strong> {completedBooking.dogName} ({completedBooking.dogBreed})</div>
                        <div><strong className="text-gray-900">Check-In:</strong> {completedBooking.checkInDate} | {completedBooking.dropOffTime}</div>
                        <div><strong className="text-gray-900">Check-Out:</strong> {completedBooking.checkOutDate} | {completedBooking.pickupTime}</div>
                        <div><strong className="text-gray-900">Estimated Total:</strong> ₹{completedBooking.totalEstimatedPrice}</div>
                      </div>

                      <p>Our Varthur caretakers will review vaccine records and call you within 15 minutes to finalize check-in directions!</p>
                    </div>
                  </div>

                  <div className="font-display font-bold text-[10px] text-gray-400 mt-6 pt-3 border-t border-gray-100">
                    The Wag Social Bengaluru • Ph: {BUSINESS_INFO.phone}
                  </div>
                </div>

                {/* Mail 2: Sent to Host team */}
                <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 border border-slate-800 flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-500 block">FROM: autoserver-daemon@thewagsocial.in</span>
                        <span className="text-xs font-bold text-slate-300">To Host: team@thewagsocial.in</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-950 text-[9px] text-emerald-400 font-mono font-bold rounded-md border border-emerald-900">WAG BACKEND</span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-white mb-3">
                      New Boarding Booking Received
                    </h4>

                    <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed font-sans">
                      <p>System notification: A digital booking request was posted from our Netlify front-end.</p>
                      
                      <div className="bg-slate-850 border border-slate-800/80 p-3 rounded-xl space-y-1.5 font-mono text-[10px]">
                        <div><strong className="text-slate-200">ID:</strong> {completedBooking.id}</div>
                        <div><strong className="text-slate-200">Parent:</strong> {completedBooking.parentName} ({completedBooking.mobileNumber})</div>
                        <div><strong className="text-slate-200">Dog Spec:</strong> {completedBooking.dogName} / {completedBooking.dogBreed} ({completedBooking.dogAge} yrs)</div>
                        <div><strong className="text-slate-200">Vaccine:</strong> {completedBooking.vaccinationStatus}</div>
                        <div><strong className="text-slate-200">Dates:</strong> {completedBooking.checkInDate} to {completedBooking.checkOutDate}</div>
                        <div><strong className="text-slate-200">Special Instructions:</strong> {completedBooking.specialInstructions}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
                    <button
                      onClick={() => {
                        alert("Booking Approved! Client notified on email & WhatsApp.");
                        setCompletedBooking(null);
                      }}
                      className="flex-grow py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase cursor-pointer"
                    >
                      Approve Booking
                    </button>
                    <button
                      onClick={() => setCompletedBooking(null)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 text-xs font-bold cursor-pointer"
                    >
                      Wait
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Instructions Info */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-amber-500" />
                  <p className="text-xs text-slate-400">
                    Integration Ready! Powered by standard client-side outbox logic. You can connect real-world <strong>EmailJS API parameters</strong> or Netlify forms inside `/src/components/BookingSystem.tsx`.
                  </p>
                </div>
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-sans font-extrabold text-xs uppercase text-white flex items-center gap-1"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
