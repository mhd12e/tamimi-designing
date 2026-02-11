"use client";

import { TestimonialsColumn, Testimonial } from "@/components/ui/testimonials-columns";
import { motion } from "motion/react";
import { MotionSection } from "@/components/ui/motion-section";
import { Container } from "@/components/shared/container";

const testimonials: Testimonial[] = [
    {
        text: "The quality of their business cards is unmatched. The gold foil finish added exactly the premium touch we needed for our executives.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
        name: "Sarah Al-Mansouri",
        role: "Marketing Director, TechFlow",
    },
    {
        text: "Urgent stamp delivery saved us! We needed a company seal for a last-minute contract, and Noor Al Khan delivered within hours.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
        name: "Ahmed Hassan",
        role: "Operations Manager, BuildCo",
    },
    {
        text: "Our product packaging redesign was a huge success. The team helped us choose the right materials and finishes. Highly recommended!",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
        name: "Layla Kareem",
        role: "Founder, Pure Beauty",
    },
    {
        text: "Best place for large format printing. The roll-up banners for our exhibition were vibrant and sturdy. Great attention to detail.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
        name: "Omar Farooq",
        role: "Event Coordinator",
    },
    {
        text: "We ordered customized mugs and pens for our corporate giveaway. The print quality was sharp and the delivery was on time.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
        name: "Zainab Ali",
        role: "HR Manager",
    },
    {
        text: "Professional service for architectural drawings. They handle large blueprints with precision and the paper quality is excellent.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
        name: "Khalid Rahman",
        role: "Architect",
    },
    {
        text: "The laser engraving on our metal tags was perfect. Clean lines and deep etching. Will definitely come back for more.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
        name: "Fatima Syed",
        role: "Production Supevisor",
    },
    {
        text: "Reliable partner for all our office stationery. From letterheads to envelopes, consistency in color branding is always maintained.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
        name: "Bilal Siddiqui",
        role: "Procurement Officer",
    },
    {
        text: "Their sticker printing service is top-notch. We needed waterproof labels for our juice bottles and they look fantastic.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
        name: "Noura Al-Sayed",
        role: "Business Owner",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
    return (
        <section className="bg-neutral-50 py-24 sm:py-32 relative overflow-hidden" id="testimonials">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px]" />
            </div>

            <Container className="relative z-10">
                <MotionSection
                    className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center mb-16"
                >
                    <h2 className="text-base font-semibold leading-7 text-brand-primary uppercase tracking-wide">
                        Client Stories
                    </h2>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                        What Our Clients Say
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-neutral-600">
                        Trusted by businesses across the region for quality prints and exceptional service.
                    </p>
                </MotionSection>

                <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[700px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={40} className="w-full md:w-1/2 lg:w-1/3" />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block w-1/2 lg:w-1/3" duration={50} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block w-1/3" duration={45} />
                </div>
            </Container>
        </section>
    );
}
