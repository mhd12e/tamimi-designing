"use client";

import * as React from "react";
import {
    Printer,
    Crown,
    Tag,
    ArrowRight,
} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

const labels = [
    { icon: Tag, label: "Best Price Guaranteed" },
    { icon: Crown, label: "Premium Branding" },
    { icon: Printer, label: "Urgent Service" },
];

import InteractiveGrid from "@/components/ui/interactive-grid";
import { Container } from "@/components/shared/container";
import { FloatingImage } from "@/components/hero/floating-image";

const floatingImages = [
    // Top Left
    { src: "https://picsum.photos/id/10/400/600", x: "5%", y: "15%", rotate: -12, delay: 2.6, alt: "Luxury Branding Materials" },
    // Top Right
    { src: "https://picsum.photos/id/20/400/600", x: "80%", y: "10%", rotate: 8, delay: 2.8, alt: "Premium Corporate Stationery" },
    // Middle Left
    { src: "https://picsum.photos/id/30/400/600", x: "3%", y: "35%", rotate: -8, delay: 3.0, alt: "Custom Packaging Solutions" },
    // Middle Right
    { src: "https://picsum.photos/id/40/400/600", x: "82%", y: "35%", rotate: 12, delay: 3.2, alt: "High-Quality Business Cards" },
    // Bottom Left
    { src: "https://picsum.photos/id/50/400/600", x: "8%", y: "55%", rotate: 5, delay: 3.4, alt: "Urgent Stamp Services" },
    // Bottom Right
    { src: "https://picsum.photos/id/60/400/600", x: "78%", y: "58%", rotate: -15, delay: 3.6, alt: "Large Format Printing" },
];

export function MynaHero() {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const constraintsRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const [zIndices, setZIndices] = React.useState(floatingImages.map((_, i) => i + 1));
    const [activeCard, setActiveCard] = React.useState<number | null>(null);

    const handleGrab = (index: number) => {
        setActiveCard(index);
        setZIndices(prev => {
            const next = [...prev];
            const maxZ = Math.max(...next);
            next[index] = maxZ + 1;
            return next;
        });
    };

    React.useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    const titleWords = [
        "AL",
        "TAMIMI",
        "DESIGNING",
    ];

    return (
        <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white" id="hero">
            {/* Interactive hover grid background */}
            <InteractiveGrid resolution={28} coolingFactor={0.96} />

            {/* Floating Interactive Images - High Z-Index to overlay text - Hidden below 1440px */}
            <div ref={constraintsRef} className="absolute inset-0 z-30 pointer-events-none hidden min-[1440px]:block">
                {floatingImages.map((img, idx) => (
                    <FloatingImage
                        key={idx}
                        src={img.src}
                        alt={img.alt}
                        initialX={img.x}
                        initialY={img.y}
                        rotation={img.rotate}
                        delay={img.delay}
                        zIndex={zIndices[idx]}
                        onGrab={() => handleGrab(idx)}
                        isActive={activeCard === idx}
                        // @ts-ignore
                        constraintsRef={constraintsRef}
                    />
                ))}
            </div>

            {/* Subtle radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_200px,var(--brand-primary),transparent)] opacity-[0.06] pointer-events-none z-[1]" />
            <Container className="z-10">
                <main>
                    <section className="py-20 md:py-32">
                        <div className="flex flex-col items-center text-center">
                            <motion.h1
                                initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
                                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl mx-auto leading-tight tracking-tight"
                            >
                                {titleWords.map((text, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.15,
                                            duration: 0.6
                                        }}
                                        className="inline-block mx-2 md:mx-4 my-1 text-neutral-900"
                                    >
                                        {text}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.6 }}
                                className="mx-auto mt-8 max-w-2xl text-xl md:text-2xl text-brand-primary font-medium"
                            >
                                High Quality Printing - Packaging - Designing
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.6 }}
                                className="mt-10"
                            >
                                <a
                                    href="/quote"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-primary/95 text-white font-bold rounded-full shadow-2xl shadow-brand-primary/30 transition-all hover:scale-105 active:scale-95 group"
                                >
                                    Get a Quote
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.8, duration: 0.6 }}
                                className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8"
                            >
                                {labels.map((feature, index) => (
                                    <motion.div
                                        key={feature.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 1.8 + (index * 0.15),
                                            duration: 0.6,
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 10
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-full border shadow-sm"
                                    >
                                        <feature.icon className="h-5 w-5 text-brand-primary" />
                                        <span className="text-sm font-semibold">{feature.label}</span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Contact Info Added to Hero */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5, duration: 1 }}
                                className="mt-12 text-neutral-600 font-medium bg-white/50 px-6 py-3 rounded-2xl border border-neutral-100/50 backdrop-blur-sm"
                            >
                                <p>Call: +971 6 556 0227 &bull; Majas 3, Sharjah</p>
                            </motion.div>
                        </div>
                    </section>
                </main>
            </Container>
        </div>
    );
}
