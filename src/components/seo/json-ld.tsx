"use client";

import React from "react";

export function JsonLd() {
    const businessData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Noor Al Khan Printing",
        "image": "https://nooralkhan.com/og-image.png",
        "@id": "https://nooralkhan.com",
        "url": "https://nooralkhan.com",
        "telephone": "+97165214371",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Umm Al Thatfa, Rolla",
            "addressLocality": "Sharjah",
            "addressRegion": "Sharjah",
            "postalCode": "00000",
            "addressCountry": "AE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.3571,
            "longitude": 55.3911
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "09:00",
                "closes": "21:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/nooralkhanprinting"
        ],
        "brand": {
            "@type": "Brand",
            "name": "Noor Al Khan Printing"
        },
        "description": "Premium commercial printing, packaging, and branding solutions in the UAE. Specialist in luxury perfume stickers, corporate stationery, and urgent printing services."
    };

    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Noor Al Khan Printing",
        "url": "https://nooralkhan.com",
        "logo": "https://nooralkhan.com/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+971-6-521-4371",
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
