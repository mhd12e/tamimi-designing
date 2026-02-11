"use client";

import { QuoteForm } from "@/components/forms/quote-form";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";

export default function QuotePage() {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden bg-white">
            {/* Animated Living Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-brand-primary/5 blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        x: [0, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-brand-accent/5 blur-[120px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20" />
            </div>

            <Container className="relative z-10">
                <QuoteForm />
            </Container>
        </div>
    );
}
