"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends Omit<HTMLMotionProps<"section">, "children"> {
    container?: boolean;
    children: React.ReactNode;
}

export function Section({
    className,
    children,
    container = true,
    ...props
}: SectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("py-16 md:py-24", className)}
            {...props}
        >
            {container ? (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            ) : (
                children
            )}
        </motion.section>
    );
}
