"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface MotionSectionProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const MotionSection = React.forwardRef<HTMLDivElement, MotionSectionProps>(
    ({ children, className, delay = 0, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay }}
                className={cn(className)}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
MotionSection.displayName = "MotionSection";
