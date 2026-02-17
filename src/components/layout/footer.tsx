"use client";

import { Container } from "@/components/shared/container";
import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-neutral-900 text-neutral-300 border-t border-white/10 relative overflow-hidden">
            {/* Background Pattern */}

            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <Container className="py-16 md:py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <Link href="/" className="flex items-center gap-3 mb-4 group">
                            <div className="h-12 w-12 bg-white rounded-xl overflow-hidden border border-white/10 group-hover:border-brand-primary/50 transition-colors shadow-sm">
                                <img src="/logo.png" alt="Al Tamimi Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors tracking-tight">Al Tamimi Designing</span>
                        </Link>
                        <p className="text-neutral-400 leading-relaxed max-w-sm">
                            Your trusted partner for luxury packaging, event fabrication, and corporate branding in Sharjah & UAE. Delivering excellence since establishment.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a
                                href="https://www.instagram.com/altamimidesign"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow Al Tamimi Designing on Instagram"
                                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-300"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:info@altamimi.ae"
                                aria-label="Email Al Tamimi Designing"
                                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-300"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                        <h4 className="font-semibold text-white text-lg mb-6">Explore</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-neutral-400 hover:text-brand-primary transition-colors relative group py-1.5 inline-block">
                                    Our Services
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </a>
                            </li>
                            <li>
                                <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-neutral-400 hover:text-brand-primary transition-colors relative group py-1.5 inline-block">
                                    Client Stories
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </a>
                            </li>
                            <li>
                                <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-neutral-400 hover:text-brand-primary transition-colors relative group py-1.5 inline-block">
                                    Recent Work
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </a>
                            </li>
                            <li>
                                <a href="#location" onClick={(e) => scrollToSection(e, 'location')} className="text-neutral-400 hover:text-brand-primary transition-colors relative group py-1.5 inline-block">
                                    Locate Us
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@altamimidesigning.com" className="text-neutral-400 hover:text-brand-primary transition-colors relative group py-1.5 inline-block">
                                    Get a Quote
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4">
                        <h4 className="font-semibold text-white text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 group">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-brand-primary/50 transition-colors">
                                    <MapPin className="h-5 w-5 text-brand-primary" />
                                </div>
                                <div>
                                    <span className="block text-white font-medium mb-1">Visit Us</span>
                                    <address className="not-italic text-sm">
                                        Majas 3, Sharjah,<br />
                                        United Arab Emirates
                                    </address>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-brand-primary/50 transition-colors">
                                    <Clock className="h-5 w-5 text-brand-primary" />
                                </div>
                                <div>
                                    <span className="block text-white font-medium mb-1">Working Hours</span>
                                    <span className="text-sm">Sat - Thu: 9:00 AM - 9:00 PM<br />Friday: Closed</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-brand-primary/50 transition-colors">
                                    <Phone className="h-5 w-5 text-brand-primary" />
                                </div>
                                <div>
                                    <span className="block text-white font-medium mb-1">Call Us</span>
                                    <a href="tel:+971501234567" className="text-sm hover:text-white transition-colors">+971 50 123 4567</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
                    <p>© {new Date().getFullYear()} Al Tamimi Designing L.L.C. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made by <Link href="https://mhd12.dev" target="_blank" className="text-white hover:text-brand-primary transition-colors font-medium">mhd12</Link>
                    </p>
                </div>
            </Container>
        </footer>
    );
}
