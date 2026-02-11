"use client";
import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div className="p-8 rounded-3xl border border-neutral-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow max-w-sm w-full" key={i}>
                                    <div className="text-neutral-700 leading-relaxed font-medium">"{text}"</div>
                                    <div className="flex items-center gap-3 mt-6">
                                        <img
                                            width={48}
                                            height={48}
                                            src={image}
                                            alt={name}
                                            className="h-12 w-12 rounded-full object-cover border border-neutral-100"
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-bold text-neutral-900 tracking-tight leading-5">{name}</div>
                                            <div className="text-sm leading-5 text-neutral-500 tracking-tight mt-0.5">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};
