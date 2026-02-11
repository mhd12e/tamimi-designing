"use client";

import { motion, useMotionValue, useVelocity, useAnimationFrame, MotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";

interface FloatingImageProps {
    src: string;
    initialX: string;
    initialY: string;
    rotation: number;
    delay: number;
    zIndex: number;
    onGrab: () => void;
    constraintsRef: React.RefObject<any>;
    isActive: boolean;
}

// Optimized Ghost Trail Component - No React Renders
const GhostTrail = ({ x, y, rotation, scale, isActive }: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    rotation: MotionValue<number>;
    scale: MotionValue<number>;
    isActive: boolean;
}) => {
    const ghostsRef = useRef<HTMLDivElement[]>([]);
    const pointsRef = useRef<{ x: number; y: number; rotate: number; scale: number }[]>([]);
    const TRAIL_LENGTH = 8; // Reduced from 12 for performance
    const isSleepingRef = useRef(false);

    useAnimationFrame((t) => {
        const px = x.get();
        const py = y.get();
        const pr = rotation.get();
        const ps = scale.get();

        // Check if moved significantly
        const newPoint = { x: px, y: py, rotate: pr, scale: ps };

        // Push point
        pointsRef.current.push(newPoint);
        if (pointsRef.current.length > TRAIL_LENGTH) {
            pointsRef.current.shift();
        }

        // Check for sleep condition:
        // If all points are nearly identical, we can sleep
        // (i.e. trail has collapsed into the card)
        const isStatic = pointsRef.current.every(p =>
            Math.abs(p.x - px) < 0.1 &&
            Math.abs(p.y - py) < 0.1 &&
            Math.abs(p.rotate - pr) < 1 &&
            Math.abs(p.scale - ps) < 0.01
        );

        if (isStatic && isSleepingRef.current) {
            return;
        }

        isSleepingRef.current = isStatic;

        // Update ghosts directly
        ghostsRef.current.forEach((ghost, i) => {
            // Map ghost index to point index
            const pointIndex = i - (TRAIL_LENGTH - pointsRef.current.length);
            const point = pointsRef.current[pointIndex];

            if (point && ghost) {
                ghost.style.display = 'block'; // Always visible when trail exists
                ghost.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) rotate(${point.rotate}deg) scale(${point.scale * 0.9})`;

                // Opacity: newer points (higher index) should be more visible
                // Fade out trail if not active to reduce visual noise
                const activeOpacityFactor = isActive ? 1 : 0.6;
                const opacity = (i / TRAIL_LENGTH) * 0.4 * activeOpacityFactor;

                // Optimization: if opacity is 0, hide
                if (opacity < 0.01) {
                    ghost.style.display = 'none';
                } else {
                    ghost.style.display = 'block';
                    ghost.style.opacity = opacity.toString();
                }
            } else if (ghost) {
                ghost.style.display = 'none';
            }
        });
    });

    return (
        <>
            {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
                <div
                    key={i}
                    ref={el => { if (el) ghostsRef.current[i] = el }}
                    className="absolute top-0 left-0 w-full h-full rounded-2xl bg-brand-primary pointer-events-none mix-blend-multiply"
                    style={{
                        zIndex: -1,
                        display: 'none',
                        willChange: 'transform, opacity'
                    }}
                />
            ))}
        </>
    );
};

export function FloatingImage({ src, initialX, initialY, rotation, delay, zIndex, onGrab, constraintsRef, isActive }: FloatingImageProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    // Internal physics state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xVelocity = useVelocity(x);
    const yVelocity = useVelocity(y);

    // Explicitly track rotation and scale for trail sync
    // Initialize with provided rotation and initial scale (0.8)
    const rotateMV = useMotionValue(rotation);
    const scaleMV = useMotionValue(0.8);

    const cardRef = useRef<HTMLDivElement>(null);

    // Physics simulation refs
    const velocity = useRef({ x: 0, y: 0 });
    const isSimulating = useRef(false);


    // Physics Loop
    useAnimationFrame((t, delta) => {
        if (!isSimulating.current || !cardRef.current || !constraintsRef?.current) return;

        // Convert delta to seconds (approx) for simpler math
        const dt = delta / 1000;

        // Icy friction
        const friction = 0.992;
        const timeFactor = delta / 16;
        velocity.current.x *= Math.pow(friction, timeFactor);
        velocity.current.y *= Math.pow(friction, timeFactor);

        // Update positions
        let nextX = x.get() + velocity.current.x * dt;
        let nextY = y.get() + velocity.current.y * dt;

        // Boundary Checks
        const cardRect = cardRef.current.getBoundingClientRect();
        const containerRect = constraintsRef.current.getBoundingClientRect();

        const restitution = 0.9;

        // Check LEFT
        if (cardRect.left < containerRect.left) {
            const overlap = containerRect.left - cardRect.left;
            nextX += overlap + 1;
            velocity.current.x = Math.abs(velocity.current.x) * restitution;
        }
        // Check RIGHT
        else if (cardRect.right > containerRect.right) {
            const overlap = cardRect.right - containerRect.right;
            nextX -= overlap + 1;
            velocity.current.x = -Math.abs(velocity.current.x) * restitution;
        }

        // Check TOP
        if (cardRect.top < containerRect.top) {
            const overlap = containerRect.top - cardRect.top;
            nextY += overlap + 1;
            velocity.current.y = Math.abs(velocity.current.y) * restitution;
        }
        // Check BOTTOM
        else if (cardRect.bottom > containerRect.bottom) {
            const overlap = cardRect.bottom - containerRect.bottom;
            nextY -= overlap + 1;
            velocity.current.y = -Math.abs(velocity.current.y) * restitution;
        }

        // Apply
        x.set(nextX);
        y.set(nextY);

        // Stop if slow
        const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
        if (speed < 5) {
            isSimulating.current = false;
        }
    });

    const handleDragEnd = () => {
        setIsDragging(false);
        const vx = xVelocity.get();
        const vy = yVelocity.get();
        velocity.current = { x: vx, y: vy };
        isSimulating.current = true;
    };

    return (
        // Wrapper div handles initial positioning
        // Visible only on screens >= 1440px
        // Unified size: w-56 h-72
        <div
            className="hidden min-[1440px]:block absolute w-56 h-72 pointer-events-none"
            style={{
                left: initialX,
                top: initialY,
                zIndex: zIndex,
            }}
        >
            <GhostTrail x={x} y={y} rotation={rotateMV} scale={scaleMV} isActive={isActive} />

            <motion.div
                ref={cardRef}
                drag
                dragMomentum={false}
                dragElastic={0}
                onPointerDown={() => {
                    onGrab();
                    isSimulating.current = false;
                }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                style={{
                    x,
                    y,
                    rotate: rotateMV,
                    scale: scaleMV,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 1 // Always fully visible
                }}
                initial={{
                    opacity: 0,
                    scale: 0.8,
                    rotate: rotation
                }}
                whileHover={{
                    scale: 1.1,
                    cursor: "grab"
                }}
                whileDrag={{
                    scale: 1.15,
                    cursor: "grabbing",
                    rotate: 0, // Reset rotation on drag
                }}
                animate={{
                    opacity: hasEntered ? 1 : 1, // Always visible
                    scale: 1,
                    rotate: isDragging ? 0 : rotation,
                }}
                className="rounded-2xl pointer-events-auto"
                onAnimationComplete={() => setHasEntered(true)}
                transition={{
                    duration: hasEntered ? 0.2 : 0.8,
                    delay: hasEntered ? 0 : delay,
                    ease: "easeOut"
                }}
            >
                {/* Inner container with smooth shadow transition */}
                <motion.div
                    className="w-full h-full rounded-2xl overflow-hidden border-[6px] border-white bg-white"
                    animate={{
                        boxShadow: isDragging
                            ? "0 30px 60px -12px rgba(0, 0, 0, 0.3)"
                            : "0 15px 30px -5px rgba(0, 0, 0, 0.1)"
                    }}
                    transition={{
                        boxShadow: { duration: 0.3 }
                    }}
                >
                    <img
                        src={src}
                        alt="Printing Showcase"
                        className="w-full h-full object-cover select-none pointer-events-none"
                        draggable={false}
                        loading="lazy"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
