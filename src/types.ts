/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string; // Lucide icon name
  highlights: string[];
  pricingRange: string;
  startingPrice: number;
  category: "boarding" | "daycare" | "grooming" | "socialization" | "staycation" | "transport";
}

export interface Testimonial {
  id: string;
  dogName: string;
  breed: string;
  dogPhoto: string;
  stayDuration: string;
  parentName: string;
  testimonial: string;
}

export interface ReviewEntry {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  isGoogleVerified: boolean;
  initials: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Boarding Area" | "Play Zones" | "Grooming Station" | "Happy Dogs" | "Outdoor Activities" | "Indoor Facilities" | "Videos";
  imageUrl: string;
  description: string;
  videoUrl?: string;
  isVideo?: boolean;
}

export interface BookingSubmission {
  id: string;
  parentName: string;
  mobileNumber: string;
  email: string;
  dogName: string;
  dogBreed: string;
  dogAge: number;
  vaccinationStatus: "Fully Vaccinated" | "Partially Vaccinated" | "Not Vaccinated" | "Puppy (Pending)";
  checkInDate: string;
  checkOutDate: string;
  dropOffTime: string;
  pickupTime: string;
  specialInstructions: string;
  vaccinationCertificateName?: string;
  emergencyContact: string;
  serviceType: "boarding" | "daycare" | "grooming" | "socialization" | "staycation" | "longterm";
  totalEstimatedPrice?: number;
  status: "pending" | "approved" | "completed";
  createdAt: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
  date: string;
}
