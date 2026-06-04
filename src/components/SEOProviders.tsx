/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { FAQ_DATA, BUSINESS_INFO } from "../data";

export default function SEOProviders() {
  useEffect(() => {
    // 1. Local Business & Reviews Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "PetStore", // Also can use SportsActivityLocation or general LocalBusiness, PetStore fits booking hostel
      "name": BUSINESS_INFO.name,
      "image": [
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80"
      ],
      "logo": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=200&h=200&q=80",
      "url": "https://thewagsocial.netlify.app",
      "telephone": BUSINESS_INFO.phone,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Site No. 38/1, Valepura Road, Near Milk Dairy, Varthur",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560087",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9336495,
        "longitude": 77.7479708
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "ratingCount": "104",
        "reviewAspect": "Dog Boarding, Day Care and Grooming"
      },
      "sameAs": [
        "https://www.instagram.com/thewagsocial"
      ]
    };

    // 2. FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    // 3. Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://thewagsocial.netlify.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Dog Boarding Varthur",
          "item": "https://thewagsocial.netlify.app/#services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Booking Desk",
          "item": "https://thewagsocial.netlify.app/#book-stay"
        }
      ]
    };

    // Construct Script Tags
    const lbScript = document.createElement("script");
    lbScript.type = "application/ld+json";
    lbScript.id = "schema-local-business";
    lbScript.text = JSON.stringify(localBusinessSchema);

    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "schema-faq";
    faqScript.text = JSON.stringify(faqSchema);

    const bcScript = document.createElement("script");
    bcScript.type = "application/ld+json";
    bcScript.id = "schema-breadcrumb";
    bcScript.text = JSON.stringify(breadcrumbSchema);

    // Remove any existing tags to avoid duplicate hydration issues
    const removeExisting = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
    removeExisting("schema-local-business");
    removeExisting("schema-faq");
    removeExisting("schema-breadcrumb");

    // Append to document head
    document.head.appendChild(lbScript);
    document.head.appendChild(faqScript);
    document.head.appendChild(bcScript);

    // Cleanup when component unmounts
    return () => {
      removeExisting("schema-local-business");
      removeExisting("schema-faq");
      removeExisting("schema-breadcrumb");
    };
  }, []);

  return null;
}
