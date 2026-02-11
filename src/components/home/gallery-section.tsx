"use client";

import React from "react";
import Image from "next/image";
import { MotionSection } from "@/components/ui/motion-section";
import { Instagram, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/container";

export function GallerySection() {
    return (
        <div className="py-20 lg:py-24 bg-neutral-50 relative overflow-hidden" id="gallery">
            {/* Subtle Grid Pattern for Technical Feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <Container className="relative z-10">
                <MotionSection className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full mb-4 shadow-sm">
                        <Instagram className="h-5 w-5 text-brand-primary mr-2" />
                        <span className="text-sm font-medium text-neutral-600">@nooralkhanprinting</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-4">
                        Recent Works & Inspiration
                    </h2>
                    <p className="text-lg text-neutral-600 mb-8">
                        Follow us on Instagram to see our latest projects, behind-the-scenes, and printing magic in action.
                    </p>
                    <Link
                        href="https://www.instagram.com/nooralkhanprinting?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow Noor Al Khan Printing on Instagram"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg shadow-brand-primary/20 text-white bg-brand-primary hover:bg-brand-primary/90 transition-all hover:scale-105"
                    >
                        Follow our Journey
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </MotionSection>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                    {galleryImages.map((image, index) => (
                        <MotionSection
                            key={index}
                            delay={index * 0.1}
                            className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100 cursor-pointer hover:shadow-xl hover:shadow-brand-primary/10 transition-all duration-500"
                        >
                            <Link
                                href="https://www.instagram.com/nooralkhanprinting?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View our work on Instagram"
                                className="block w-full h-full"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <Instagram className="h-8 w-8 text-white drop-shadow-md" />
                                    </div>
                                </div>
                            </Link>
                        </MotionSection>
                    ))}
                </div>
            </Container>
        </div>
    );
}

const galleryImages = [
    {
        src: "https://picsum.photos/600/600?random=1",
        alt: "Premium Business Cards",
    },
    {
        src: "https://picsum.photos/600/600?random=2",
        alt: "Custom Packaging Box",
    },
    {
        src: "https://picsum.photos/600/600?random=3",
        alt: "Gold Foil Stamping",
    },
    {
        src: "https://picsum.photos/600/600?random=4",
        alt: "Office Branding Mockup",
    },
    {
        src: "https://picsum.photos/600/600?random=5",
        alt: "Wedding Invitation Suite",
    },
    {
        src: "https://picsum.photos/600/600?random=6",
        alt: "Large Format Banner",
    },
    {
        src: "https://picsum.photos/600/600?random=7",
        alt: "Custom Sticker Sheet",
    },
    {
        src: "https://picsum.photos/600/600?random=8",
        alt: "Corporate Gift Set",
    },
];
