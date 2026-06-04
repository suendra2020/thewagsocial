/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, Testimonial, ReviewEntry, FAQItem, GalleryItem, InstagramPost } from "./types";

export const BUSINESS_INFO = {
  name: "The Wag Social",
  tagline: "Where Dogs Feel at Home",
  location: "Site No. 38/1, Valepura Road, Near Milk Dairy, Varthur, Bengaluru, Karnataka 560087",
  gmapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1965860710686!2d77.7479708!3d12.9336495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1398f8ae3d99%3A0xcba8cb5e0df7ac46!2sThe%20Wag%20Social!5e0!3m2!1sen!2sin!4v1716000000000!5m2!1sen!2sin",
  phone: "+91 70220 72502",
  phoneRaw: "7022072502",
  whatsappUrl: "https://wa.me/917022072502?text=Hi%20The%20Wag%20Social%2C%20I%20would%20like%20to%20enquire%20about%20boarding%20services%20for%20my%20dog.",
  rating: 5.0,
  reviewsCount: "100+",
  operatingHours: "24/7 Boarding | Day Care: 8:00 AM - 8:00 PM | Grooming: 9:00 AM - 6:00 PM",
  instagramUser: "thewagsocial",
};

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "boarding",
    title: "Dog Boarding",
    shortDesc: "Overnight and long-term premium cage-free stays with lots of care, sleep security and regular updates.",
    fullDesc: "Our premier signature boarding provides cage-free comfort with round-the-clock trained supervisor presence. Your pup enjoys secure, cozy private-feeling bedding areas, supervised social groupings, and full access to expansive outdoor and indoor play areas. We adhere strictly to your individualized feeding regimens, medicine tracking, and bedtime stories.",
    icon: "ShieldCheck",
    highlights: ["24/7 Cage-Free Security", "Dedicated Cozy Bedding Spot", "Adherence to Feeding Regimen", "Daily WhatsApp Updates & Videos", "Veterinarian Doctor On-Call Support"],
    pricingRange: "₹700 - ₹1,200 / Day",
    startingPrice: 700,
    category: "boarding"
  },
  {
    id: "daycare",
    title: "Dog Day Care",
    shortDesc: "Supervised dynamic sensory layout that builds structure, daily socialization, and play routines.",
    fullDesc: "Designed for parents with busy daily plans. Your pet stays highly engaged with energy release games, socialization, mental puzzle exercises, and mandatory mid-day power naps. Keeps separation anxiety at bay with loving constant interaction.",
    icon: "CalendarRange",
    highlights: ["Sensory Swimming Splashes", "Mandatory Structured Power Naps", "Assigned Play Companion Matching", "No-Slip Indoor Mats & Turf Zones", "Paddock Run Routines"],
    pricingRange: "₹400 - ₹700 / Day",
    startingPrice: 400,
    category: "daycare"
  },
  {
    id: "grooming",
    title: "Dog Grooming",
    shortDesc: "Full-spectrum hygiene care containing tick removal wash, specialized de-shedding, and gentle nail styling.",
    fullDesc: "An stress-releasing bathing environment for your companion. We utilize natural plant-derived organic dog cleansers, highly specialized low-temperature blow dryers, and customized styling trims tailored perfectly to coat thickness.",
    icon: "Sparkles",
    highlights: ["Organic Hypoallergenic Cleansers", "Deep Blow De-Shedding Brush", "Pain-Free Ear Cleaning & Trimming", "Slick Guard Professional Nail Grinding", "Soothing Oatmeal Skin Wash"],
    pricingRange: "₹800 - ₹2,500 / Session",
    startingPrice: 800,
    category: "grooming"
  },
  {
    id: "puppy",
    title: "Puppy Socialization",
    shortDesc: "Dedicated safety-fenced grounds setting foundational obedience and sensory touch habits.",
    fullDesc: "Crucial early-stage development tailored for playful puppies. We host supervised slow introduction parameters to help them adapt seamlessly to other dogs, tactile ground surfaces, human handlers, and normal city noises.",
    icon: "Smile",
    highlights: ["Vaccination Screening Security", "Gentle Play Handlers", "Soft Play Elements & Small Hurdles", "Positive Association Conditioning", "Claw & Ear Habituation Touches"],
    pricingRange: "₹500 - ₹800 / Session",
    startingPrice: 500,
    category: "socialization"
  },
  {
    id: "staycation",
    title: "Pet Staycation & Long-Term Stay",
    shortDesc: "Elite customized holiday retreat for longer durations with premium food menus and VIP treatment.",
    fullDesc: "Specially formulated for relocations, vacations, or home renovation periods. We construct personalized schedules for every guest with premium treat tasting bars, regular professional grooming schedules, and premium visual screen updates.",
    icon: "HeartHandshake",
    highlights: ["Extended Booking Discounts", "Curated Premium Food Selection", "Frequent Enrichment Exercises", "Weekly Grooming Wash Included", "VIP Private Suite Layouts"],
    pricingRange: "₹650 - ₹1,000 / Day",
    startingPrice: 650,
    category: "staycation"
  },
  {
    id: "transportation",
    title: "Pet Transportation Assistance",
    shortDesc: "Safe, air-conditioned vehicle transfers to and from Varthur and surrounding areas.",
    fullDesc: "Taking away the logistical worry of boarding. We offer high-safety AC SUV transfers with pet seats, seatbelts, and highly experienced drivers to pick up and drop/return your pet to Whitefield, Bellandur, Sarjapur, etc.",
    icon: "MapPin",
    highlights: ["Fully Air-Conditioned SUVs", "Pet Seatbelts & Crash-Tested Crates", "Experienced Pet-Friendly Staff", "Real-Time GPS Car Tracking", "Convenient Doorstep Pickup & Drop"],
    pricingRange: "₹15 - ₹20 / Kilometer",
    startingPrice: 15,
    category: "transport"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "g1",
    dogName: "Bruno",
    breed: "Golden Retriever",
    dogPhoto: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
    stayDuration: "14 Days (Boarding)",
    parentName: "Siddharth & Ananya",
    testimonial: "Bruno absolute loves The Wag Social! He always starts wagging his tail like crazy as soon as we drive onto Valepura Road. We got detailed WhatsApp videos every single day. The staff is immensely loving."
  },
  {
    id: "g2",
    dogName: "Kiwi",
    breed: "Shih Tzu",
    dogPhoto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
    stayDuration: "Weekly Day Care",
    parentName: "Meera Nair",
    testimonial: "Separation anxiety was a huge worry for Kiwi. The cage-free environment here has completely altered her confidence. She is playing smoothly with other small breeds now and comes home exhausted and happy!"
  },
  {
    id: "g3",
    dogName: "Rocky",
    breed: "Indie / Mixed Breed",
    dogPhoto: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80",
    stayDuration: "30 Days (Staycation)",
    parentName: "Rohan Das",
    testimonial: "I had to travel abroad for work for an entire month, and leaving Rocky was the toughest decision. The team treated Rocky like family, tracked his dynamic diet perfectly, and even accommodated on-call video calls!"
  },
  {
    id: "g4",
    dogName: "Marshmallow",
    breed: "Samoyed",
    dogPhoto: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=400&q=80",
    stayDuration: "Spa Grooming Day",
    parentName: "Deepa Reddy",
    testimonial: "We struggled with Samoyed coat shedding in Bangalore's heat. The Grooming Team at The Wag Social performed magic. Marshy's white coat is shining like a cloud now! Completely stress-free nail trimming too."
  }
];

export const REVIEWS_DATA: ReviewEntry[] = [
  {
    id: "r1",
    author: "Pranav Venkatesh",
    rating: 5,
    date: "1 month ago",
    text: "The absolute best pet daycare and hostel in East Bangalore! Located near Varthur, the facility is incredibly massive, clean, and entirely green. My German Shepherd had plenty of space to sprint and socialize.",
    isGoogleVerified: true,
    initials: "PV"
  },
  {
    id: "r2",
    author: "Kritika Sen",
    rating: 5,
    date: "2 weeks ago",
    text: "Super cage-free policy! They really monitor and pair dogs according to size and energy levels. The staff are so kind. I was constantly informed of matches, food logs, and cute playtime videos. High recommendation!",
    isGoogleVerified: true,
    initials: "KS"
  },
  {
    id: "r3",
    author: "Rahul Krishnan",
    rating: 5,
    date: "3 days ago",
    text: "Fabulous grooming service done with extreme patience! My dog usually hates bathing, but here he was perfectly calm. They handles him with genuine care. Highly competitive pricing for luxury levels of treatment.",
    isGoogleVerified: true,
    initials: "RK"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq1",
    question: "What makes The Wag Social the best dog boarding in Varthur, Bengaluru?",
    answer: "The Wag Social is uniquely spread over a clean, wide green campus offering true cage-free boarding. We prioritize personalized affection, socialization matches, highly hygienic play pavilions, 24/7 supervisor presence, and daily transparent updates.",
    category: "General"
  },
  {
    id: "faq2",
    question: "What vaccinations are securely required for my dog to stay?",
    answer: "For safety, we strictly require all dogs to be up-to-date with DHPPi (Core Multi-viral), Anti-Rabies Vaccine (ARV), and Kennel Cough (KC) vaccine. Proof of vaccination must be uploaded or presented during the check-in process.",
    category: "Health & Safety"
  },
  {
    id: "faq3",
    question: "Do you provide real-time updates while my pet is boarding?",
    answer: "Absolutely! We send consistent WhatsApp broadcasts with high-definition customized videos, photos, and update details regarding dietary schedules, water habits, and play friends.",
    category: "Updates"
  },
  {
    id: "faq4",
    question: "How do you handle medical emergencies or safety issues?",
    answer: "We have highly experienced caretakers certified in pet first-aid. For any escalation, we operate on-call vet associations and are situated 10 minutes away from premier veterinary polyclinics in Varthur & Whitefield.",
    category: "Health & Safety"
  },
  {
    id: "faq5",
    question: "Can I schedule an introductory visit before booking my dog's stay?",
    answer: "Yes, we encourage and love visits! We schedule tours between 11:00 AM and 4:00 PM onwards daily, except peak holidays, so you can inspect our playground, sleeping corridors, and grooming suites.",
    category: "General"
  },
  {
    id: "faq6",
    question: "What is your daily routine for day care and boarding guests?",
    answer: "A standard happy day starts with sensory morning paddock walks, breakfast, social playtimes in outdoor parks, dynamic agility loops, midday temperature-controlled power naps, fresh treat time, secondary cool-air group games, dinner, and relaxing cozy boarding bedtime cuddles.",
    category: "General"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal1",
    title: "Eco Boarding Cottages",
    category: "Boarding Area",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
    description: "Cozy custom-styled sleeping segments built with absolute comfort and temperature management."
  },
  {
    id: "gal2",
    title: "Green Agility Turf",
    category: "Play Zones",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
    description: "Expansive green run lawns offering tunnels, turf mounds, and social obstacle trails."
  },
  {
    id: "gal3",
    title: "Hydro Spa Session",
    category: "Grooming Station",
    imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80",
    description: "Water massage cleansing with organic oils and soothing herbal conditioners."
  },
  {
    id: "gal4",
    title: "Double Golden Chase",
    category: "Happy Dogs",
    imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80",
    description: "A secure chase of joy with golden retrievers Bruno and Max on Varthur grass lawns."
  },
  {
    id: "gal-vid1",
    title: "Varthur Campus Active Play Video Tour",
    category: "Videos",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
    description: "Watch how our canine guests socialize and stretch their legs in Varthur playfields.",
    videoUrl: "https://www.youtube.com/embed/s0xMU0Y6HHQ",
    isVideo: true
  },
  {
    id: "gal5",
    title: "Paddock Fetch Drill",
    category: "Outdoor Activities",
    imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
    description: "High-intensity agility fetch with seasoned caretakers supervising safe speeds."
  },
  {
    id: "gal6",
    title: "AC Lounge Zone",
    category: "Indoor Facilities",
    imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&w=600&q=80",
    description: "Indoor resting space optimized with soothing acoustic pet-calming music."
  },
  {
    id: "gal-vid2",
    title: "Agility & Socialization Drills Reel",
    category: "Videos",
    imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
    description: "Supervised puppy fetch, high jumps, and grooming sessions showing our cage-free spaces.",
    videoUrl: "https://www.youtube.com/embed/s0xMU0Y6HHQ",
    isVideo: true
  }
];

export const INSTAGRAM_POSTS_DATA: InstagramPost[] = [
  {
    id: "ig1",
    imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=500&q=80",
    likes: 342,
    comments: 29,
    caption: "Morning sprint drills! Bruno is testing out the speed parameters on our newly laid out agility grass turf. ☀️🌿🐾 #thewagsocial #dogboardingvarthur",
    date: "2 hours ago"
  },
  {
    id: "ig2",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80",
    likes: 512,
    comments: 41,
    caption: "Spa day highlights! Treat your little ones to our organic paw-butter scrub and oatmeal deep conditioning massage. Book slots now! 🧼✨🐩 #pawsome #dogsofvarthur",
    date: "1 day ago"
  },
  {
    id: "ig3",
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=500&q=80",
    likes: 429,
    comments: 18,
    caption: "Welcome to our newest puppy boarders - learning the gentle arts of chasing leaves and making friends! 🐾💛 #puppycare #wagsocial",
    date: "2 days ago"
  },
  {
    id: "ig4",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80",
    likes: 620,
    comments: 54,
    caption: "Safe, social, cage-free and surrounded by caring experts. This is why we call it 'Where Dogs Feel at Home' 🏡🐶✨ #varthurdogs #bestboardingbangalore",
    date: "4 days ago"
  }
];
