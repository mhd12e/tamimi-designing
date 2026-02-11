"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Grid cell size in pixels. Lower = finer grid.
     * Default: 28
     */
    resolution?: number;
    /**
     * Cooling rate (0 to 1). Higher = trails fade faster.
     * Default: 0.96
     */
    coolingFactor?: number;
}

const InteractiveGrid = ({
    className,
    resolution = 28,
    coolingFactor = 0.96,
    style,
    ...props
}: InteractiveGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // Simulation State
        let grid: Float32Array;
        let cols = 0;
        let rows = 0;
        let width = 0;
        let height = 0;
        let animationId: number;

        // Mouse State
        const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, active: false };

        // Brand colors for the grid
        // Gold accent: HSL(38, 97%, 47%) -> rgb(236, 172, 6)
        // Deep Red primary: HSL(0, 73%, 42%) -> rgb(185, 29, 29)
        const getHeatColor = (t: number): string => {
            // Light theme: white bg -> gold accent -> deep red at max heat
            // t: 0.0 = transparent (white bg shows through)
            // t: 0.3 = subtle gold tint
            // t: 0.6 = warm gold
            // t: 1.0 = deep red-gold

            // Gold: 236, 172, 6
            // Red:  185, 29, 29
            const r = Math.round(236 + (185 - 236) * t * t);  // Shifts from gold-R to red-R at high temp
            const g = Math.round(172 * (1 - t * 0.7));          // Gold-G fades down
            const b = Math.round(6 + 23 * t);                   // Slight blue shift
            const a = Math.min(0.55, t * 0.7);                  // Max 55% opacity so text stays readable

            return `rgba(${r}, ${g}, ${b}, ${a})`;
        };

        const resize = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            cols = Math.ceil(width / resolution);
            rows = Math.ceil(height / resolution);
            grid = new Float32Array(cols * rows).fill(0);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const rect = container.getBoundingClientRect();
                mouse.x = e.touches[0].clientX - rect.left;
                mouse.y = e.touches[0].clientY - rect.top;
                mouse.active = true;
            }
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        const update = () => {
            // Clear canvas (transparent so white bg shows)
            ctx.clearRect(0, 0, width, height);

            // Draw subtle base grid dots
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * resolution + resolution / 2;
                    const y = r * resolution + resolution / 2;
                    ctx.beginPath();
                    ctx.arc(x, y, 1.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Inject heat from mouse
            if (mouse.active) {
                const dx = mouse.x - mouse.prevX;
                const dy = mouse.y - mouse.prevY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const steps = Math.max(1, Math.ceil(dist / (resolution / 2)));

                for (let s = 0; s <= steps; s++) {
                    const t = steps > 0 ? s / steps : 0;
                    const x = mouse.prevX + dx * t;
                    const y = mouse.prevY + dy * t;

                    const col = Math.floor(x / resolution);
                    const row = Math.floor(y / resolution);

                    const radius = 2;
                    for (let i = -radius; i <= radius; i++) {
                        for (let j = -radius; j <= radius; j++) {
                            const c = col + i;
                            const rr = row + j;
                            if (c >= 0 && c < cols && rr >= 0 && rr < rows) {
                                const idx = c + rr * cols;
                                const d = Math.sqrt(i * i + j * j);
                                if (d <= radius) {
                                    grid[idx] = Math.min(1.0, grid[idx] + 0.35 * (1 - d / radius));
                                }
                            }
                        }
                    }
                }
            }

            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;

            // Render heated cells & cool down
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = c + r * cols;
                    const temp = grid[idx];

                    // Cool down
                    grid[idx] *= coolingFactor;

                    // Only render if warm enough
                    if (temp > 0.03) {
                        const x = c * resolution;
                        const y = r * resolution;

                        // Cells grow slightly when hot
                        const expand = temp * 2;
                        const gap = 1.5; // gap between cells
                        const cellSize = resolution - gap + expand;
                        const offset = (resolution - cellSize) / 2;

                        // Rounded rect for premium feel
                        const rx = 3 + temp * 2; // Corner radius grows with heat
                        ctx.fillStyle = getHeatColor(temp);
                        ctx.beginPath();
                        ctx.roundRect(x + offset, y + offset, cellSize, cellSize, rx);
                        ctx.fill();
                    }
                }
            }

            animationId = requestAnimationFrame(update);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("touchmove", handleTouchMove, { passive: true });
        container.addEventListener("touchend", handleMouseLeave);

        // Check if mouse left the window entirely
        document.addEventListener("mouseleave", handleMouseLeave);

        resize();
        update();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleMouseLeave);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [resolution, coolingFactor]);

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 z-0 overflow-hidden", className)}
            style={style}
            {...props}
        >
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};

export default InteractiveGrid;
