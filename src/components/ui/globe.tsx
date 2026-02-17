"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => { },
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [0.85, 0.85, 0.85],
    markerColor: [255 / 255, 215 / 255, 0 / 255], // Brand Gold
    glowColor: [1, 1, 1],
    markers: [
        { location: [25.348766, 55.405403], size: 0.1 }, // Sharjah/Dubai approx
    ],
};

export function Globe({
    className,
    config = GLOBE_CONFIG,
}: {
    className?: string;
    config?: COBEOptions;
}) {
    const phiRef = useRef(0);
    const widthRef = useRef(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<any>(null);
    const pointerInteractionMovement = useRef(0);
    const rRef = useRef(0);

    const updatePointerInteraction = (value: any) => {
        pointerInteracting.current = value;
        if (canvasRef.current) {
            canvasRef.current.style.cursor = value ? "grabbing" : "grab";
        }
    };

    const updateMovement = (clientX: any) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            rRef.current = delta / 200;
        }
    };

    const onResize = () => {
        if (canvasRef.current) {
            widthRef.current = canvasRef.current.offsetWidth;
        }
    };

    useEffect(() => {
        window.addEventListener("resize", onResize);
        onResize();

        const globe = createGlobe(canvasRef.current!, {
            ...config,
            width: widthRef.current * 2,
            height: widthRef.current * 2,
            onRender: (state) => {
                if (!pointerInteracting.current) {
                    phiRef.current += 0.005;
                }
                state.phi = phiRef.current + rRef.current;
                state.width = widthRef.current * 2;
                state.height = widthRef.current * 2;
            },
        });

        setTimeout(() => (canvasRef.current!.style.opacity = "1"));
        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [config]);

    return (
        <div
            className={cn(
                "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
                className
            )}
        >
            <canvas
                className={cn(
                    "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
                )}
                ref={canvasRef}
                onPointerDown={(e) =>
                    updatePointerInteraction(
                        e.clientX - pointerInteractionMovement.current
                    )
                }
                onPointerUp={() => updatePointerInteraction(null)}
                onPointerOut={() => updatePointerInteraction(null)}
                onMouseMove={(e) => updateMovement(e.clientX)}
                onTouchMove={(e) =>
                    e.touches[0] && updateMovement(e.touches[0].clientX)
                }
            />
        </div>
    );
}
