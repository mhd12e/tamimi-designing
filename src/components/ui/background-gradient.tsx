"use client";

import { cn } from "@/lib/utils";

export function BackgroundGradient({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 -z-10 bg-background pointer-events-none overflow-hidden", className)}>
            {/* Radial Gradient - using brand primary (Deep Red) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,var(--brand-primary),transparent)] opacity-10" />

            {/* Grid Pattern - using brand primary with low opacity */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.42_0.17_20_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.42_0.17_20_/_0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
    );
}
