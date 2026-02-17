"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { Globe } from "@/components/ui/globe";
import { MotionSection } from "@/components/ui/motion-section";
import Link from "next/link";
import { Container } from "@/components/shared/container";

export function FindUsSection() {
    return (
        <section className="relative py-24 sm:py-32 overflow-hidden bg-white" id="location">
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Side: Content & Map */}
                    <div className="relative z-10 flex flex-col gap-8">
                        <MotionSection>
                            <h2 className="text-base font-semibold leading-7 text-brand-primary uppercase tracking-wide">
                                Visit Us
                            </h2>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                                Locate Al Tamimi
                            </h2>
                            <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
                                We are conveniently located in Majas 3, Sharjah, U.A.E. Drop by for a consultation or to pick up your orders.
                            </p>
                        </MotionSection>

                        <MotionSection delay={0.1} className="flex flex-col gap-4">
                            <div className="flex items-start gap-4 p-4 rounded-2xl border border-neutral-100 bg-neutral-50/50">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-neutral-100">
                                    <MapPin className="h-6 w-6 text-brand-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-900">Our Location</h4>
                                    <p className="text-neutral-600 mt-1">Majas 3, Sharjah, U.A.E</p>
                                </div>
                            </div>

                            <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-neutral-200 shadow-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28852.11944935359!2d55.3415602743164!3d25.320496399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b9321296757%3A0x8e98c6fa492f66a3!2sAl%20Tamimi%20Designing!5e0!3m2!1sen!2sae!4v1771308621486!5m2!1sen!2sae"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 transition-all duration-500"
                                />
                            </div>
                        </MotionSection>

                        <MotionSection delay={0.2} className="w-full sm:w-auto">
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="w-full sm:w-auto"
                            >
                                <Button asChild className="w-full sm:w-auto h-16 px-8 bg-brand-primary hover:bg-brand-primary/95 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl shadow-brand-primary/20 transition-all flex items-center justify-center gap-4 text-sm group">
                                    <Link href="https://maps.app.goo.gl/fggzKxTFUbBHcqfg9" target="_blank">
                                        Get Directions
                                        <div className="bg-white/20 p-1.5 rounded-lg group-hover:translate-x-1 transition-transform">
                                            <Navigation className="h-4 w-4 fill-white" />
                                        </div>
                                    </Link>
                                </Button>
                            </motion.div>
                        </MotionSection>
                    </div>

                    {/* Right Side: Globe Visualization */}
                    <div className="absolute inset-0 lg:relative lg:inset-auto h-full w-full flex items-center justify-end z-0 lg:z-auto opacity-50 lg:opacity-100 pointer-events-none lg:pointer-events-auto overflow-hidden lg:overflow-visible lg:translate-y-12">
                        <div className="w-full h-full lg:w-full lg:h-full flex items-center justify-end translate-x-1/4 lg:translate-x-0">
                            <Globe className="scale-110 lg:scale-125" />
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
