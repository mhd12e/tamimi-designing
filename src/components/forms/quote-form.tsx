"use client";

import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function QuoteForm() {
    const [state, handleSubmit] = useForm("xeeleebn");

    if (state.succeeded) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-brand-primary/20 shadow-xl max-w-lg mx-auto"
            >
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-brand-primary mb-3">Request Sent!</h2>
                <p className="text-neutral-600 mb-6">
                    Thank you for reaching out. Our team will review your requirements and get back to you with a competitive quote shortly.
                </p>
                <Button
                    onClick={() => window.location.href = '/'}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full px-8"
                >
                    Back to Home
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto px-4"
        >
            <div className="relative z-10 w-full">
                <div className="mb-12 text-center sm:text-left">
                    <h2 className="text-4xl sm:text-6xl font-black text-brand-primary mb-4 tracking-tighter">Get a Quote</h2>
                    <p className="text-neutral-500 text-lg max-w-xl">Share your project details with us. We'll provide a custom tailored quote within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        {/* Full Name */}
                        <div className="space-y-1 group">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-brand-primary/60">Full Name</Label>
                            <div className="relative">
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 h-10 text-lg px-0 transition-all placeholder:text-neutral-300 peer"
                                />
                                {/* Static underline */}
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200" />
                                {/* Animated underline */}
                                <motion.div
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 ease-out"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1 group">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-brand-primary/60">Email Address</Label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    required
                                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 h-10 text-lg px-0 transition-all placeholder:text-neutral-300 peer"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200" />
                                <motion.div
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 ease-out"
                                />
                            </div>
                            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-500 mt-1" />
                        </div>

                        {/* Service Required - Full Width */}
                        <div className="space-y-1 group md:col-span-2">
                            <Label htmlFor="service" className="text-xs font-bold uppercase tracking-widest text-brand-primary/60">Service Required</Label>
                            <div className="relative">
                                <Select name="service" required>
                                    <SelectTrigger
                                        id="service"
                                        className="w-full h-10 bg-transparent border-none focus:outline-none focus:ring-0 rounded-none outline-none transition-all text-lg appearance-none px-0 peer cursor-pointer shadow-none data-[placeholder]:text-neutral-300"
                                    >
                                        <SelectValue placeholder="Select a service..." />
                                    </SelectTrigger>
                                    <SelectContent position="popper" sideOffset={12} align="start">
                                        <SelectItem value="luxury-packaging">Luxury Packaging</SelectItem>
                                        <SelectItem value="event-fabrication">Event Fabrication</SelectItem>
                                        <SelectItem value="corporate-branding">Corporate Branding</SelectItem>
                                        <SelectItem value="laser-cutting">Laser Cutting</SelectItem>
                                        <SelectItem value="personalized-occasions">Personalized Occasions</SelectItem>
                                        <SelectItem value="printing-press">Printing Press</SelectItem>
                                        <SelectItem value="other">Other Specialties</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 pointer-events-none" />
                                <motion.div
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 ease-out pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* Project Details - Full Width */}
                        <div className="space-y-1 group md:col-span-2">
                            <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-brand-primary/60">Project Details</Label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Describe your requirements..."
                                    required
                                    className="w-full min-h-[120px] bg-transparent border-none focus:outline-none focus:ring-0 p-0 pt-2 text-lg transition-all resize-none placeholder:text-neutral-300 peer"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200" />
                                <motion.div
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 ease-out"
                                />
                            </div>
                            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-red-500 mt-1" />
                        </div>
                    </div>

                    <div className="pt-8">
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full"
                        >
                            <Button
                                type="submit"
                                disabled={state.submitting}
                                className="w-full h-16 bg-brand-primary hover:bg-brand-primary/95 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl shadow-brand-primary/20 transition-all flex items-center justify-center gap-4 text-sm group"
                            >
                                {state.submitting ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Submit Inquiry
                                        <div className="bg-white/20 p-1.5 rounded-lg group-hover:translate-x-1 transition-transform">
                                            <Send className="h-4 w-4" />
                                        </div>
                                    </>
                                )}
                            </Button>
                        </motion.div>
                        <p className="text-center text-neutral-400 text-xs mt-6 uppercase tracking-widest font-medium opacity-50">
                            Professional service guaranteed • Majas 3, Sharjah, UAE
                        </p>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
