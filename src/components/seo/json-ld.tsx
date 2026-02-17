"use client";

import React from "react";

export function JsonLd() {
    const businessData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Al Tamimi Designing",
        "image": "https://altamimidesigning.com/icon.png",
        "@id": "https://altamimidesigning.com",
        "url": "https://altamimidesigning.com",
        "telephone": "+97165560227",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Majas 3",
            "addressLocality": "Sharjah",
            "addressRegion": "Sharjah",
            "postalCode": "00000",
            "addressCountry": "AE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.3223, // Approximate for Majas 3
            "longitude": 55.3764
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday"
                ],
                "opens": "09:00",
                "closes": "21:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/altamimidesign"
        ],
        "brand": {
            "@type": "Brand",
            "name": "Al Tamimi Designing"
        },
        "description": "Premium design and production house in Sharjah. Specializing in luxury rigid boxes, event stages, acrylic signage, and corporate gifting."
    };

    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Al Tamimi Designing",
        "url": "https://altamimidesigning.com",
        "logo": "https://altamimidesigning.com/icon.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+971-6-556-0227",
            "contactType": "customer service",
            "areaServed": "AE",
            "availableLanguage": ["en", "ar"]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
            />
        </>
    );
}
