"use client";

import React, { useId } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MotionSection } from "@/components/ui/motion-section";
import { Container } from "@/components/shared/container";

import { CardSpotlight } from "@/components/ui/card-spotlight";

export function ServicesSection() {
    return (
        <div className="relative py-24 sm:py-32 overflow-hidden bg-white" id="services">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full bg-white">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-accent/10 blur-[120px] animate-pulse delay-1000" />

            </div>

            <Container className="relative isolate px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <MotionSection>
                        <h2 className="text-base font-semibold leading-7 text-brand-primary uppercase tracking-wide">
                            Our Capabilities
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                            Comprehensive Printing Solutions
                        </p>
                        <p className="mt-6 text-lg leading-8 text-neutral-600">
                            From corporate essentials to large-scale industrial branding.
                        </p>
                    </MotionSection>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <Drawer key={service.category} shouldScaleBackground={false}>
                            <DrawerTrigger asChild>
                                <MotionSection
                                    delay={index * 0.1}
                                    className="h-full"
                                >
                                    <CardSpotlight className="group relative bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-brand-primary/30 flex flex-col h-full cursor-pointer text-left">

                                        <Grid size={20} pattern={service.pattern} />

                                        <div className="relative z-20 flex flex-col h-full p-6">
                                            <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-brand-primary transition-colors min-h-[3.5rem] flex items-end">
                                                {service.category}
                                            </h3>

                                            <p className="text-sm text-neutral-600 mb-6 line-clamp-2">
                                                {service.shortDescription}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-sm font-semibold text-brand-primary group-hover:underline decoration-brand-primary/30 underline-offset-4 flex items-center gap-1">
                                                    View Services <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                </span>

                                                {/* Bottom Right Illustration/Image Preview */}
                                                <div className="relative w-24 h-24 opacity-90 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 -mr-4 -mb-4 shadow-sm rounded-xl overflow-hidden border-2 border-white">
                                                    <img
                                                        src={`/services/${service.image}`}
                                                        alt={service.category}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                        className="object-cover w-full h-full bg-neutral-100"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardSpotlight>
                                </MotionSection>
                            </DrawerTrigger>

                            <DrawerContent className="h-[96dvh] max-h-[96dvh]">
                                <div className="mx-auto w-full max-w-3xl flex flex-col h-full bg-white rounded-t-[20px] overflow-hidden">


                                    <DrawerHeader className="px-6 py-4 flex-none">
                                        <DrawerTitle className="text-xl sm:text-3xl font-bold text-brand-primary mb-1 text-center sm:text-left leading-tight">
                                            {service.category}
                                        </DrawerTitle>
                                        <DrawerDescription className="text-sm sm:text-base text-neutral-600 text-center sm:text-left">
                                            Explore our range of {service.category.toLowerCase()} solutions.
                                        </DrawerDescription>
                                    </DrawerHeader>

                                    <div className="flex-1 overflow-y-auto px-6 py-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {service.items.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/50 hover:bg-white hover:border-brand-primary/20 hover:shadow-md transition-all duration-300"
                                                >
                                                    <h4 className="font-bold text-neutral-900 mb-1 text-base">{item.title}</h4>
                                                    <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 mb-8 h-48 sm:h-64 w-full rounded-2xl overflow-hidden relative group">
                                            <img
                                                src={`/services/${service.image}`}
                                                alt={service.category}
                                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                                                <p className="text-white font-medium text-xs sm:text-sm">Production Quality: {service.category}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <DrawerFooter className="px-6 py-4 border-t border-neutral-100 bg-white flex-none">
                                        <DrawerClose asChild>
                                            <Button variant="outline" className="w-full sm:w-auto mx-auto min-w-[150px] rounded-full h-12 text-base shadow-sm">
                                                Close Details
                                            </Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    ))}
                </div>
            </Container>
        </div>
    );
}

const services = [
    {
        category: "Corporate & Office Stationery",
        shortDescription: "Essential branding tools for your business identity, from stamps to letterheads.",
        items: [
            { title: "Rubber Stamps", description: "Urgent self-inking, pre-inked, and laser-engraved stamps ready in minutes. Brands include Trodat, Shiny, and Neo." },
            { title: "Business Cards", description: "Standard and premium professional cards for corporate identity." },
            { title: "Letterheads & Envelopes", description: "Custom branded office paper stationery." },
            { title: "ID Accessories", description: "Lanyards and ID card holders for employee identification." }
        ],
        image: "corporate.png",
        pattern: [[1, 2], [3, 4], [5, 1], [7, 3], [9, 5]] as number[][],
    },
    {
        category: "Branding, Labels & Packaging",
        shortDescription: "Premium packaging solutions and custom labels to elevate your product presentation.",
        items: [
            { title: "Perfume Stickers", description: "Specialized engraved and PVC stickers with gold/silver metallic finishes for cosmetic branding." },
            { title: "Shopping Bags", description: "Branded paper bags for retail and corporate use." },
            { title: "Product Decals", description: "Vinyl cutting and sticker printing for general product labeling." }
        ],
        image: "perfume.png",
        pattern: [[0, 1], [2, 5], [4, 2], [6, 4], [8, 0]] as number[][],
    },
    {
        category: "Marketing & Large Format Advertising",
        shortDescription: "High-impact visual communication tools for outdoor and indoor advertising.",
        items: [
            { title: "Flyers & Brochures", description: "Tri-fold brochures, leaflets, and handouts for mass marketing." },
            { title: "Roll-up Banners", description: "Portable standing banners for events and exhibitions." },
            { title: "Outdoor Signage", description: "Large format vinyl banners and billboard printing." },
            { title: "Vehicle Graphics", description: "Branding stickers applied to cars and delivery vehicles." },
            { title: "Advertising Flags", description: "Teardrop and feather flags for outdoor visibility." }
        ],
        image: "flyer.png",
        pattern: [[1, 5], [2, 1], [5, 4], [7, 2], [9, 3]] as number[][],
    },
    {
        category: "Promotional Gifts & Merchandise",
        shortDescription: "Customized gifts and apparel to promote your brand and appreciate clients.",
        items: [
            { title: "Mug Printing", description: "Custom sublimation printing on ceramic mugs." },
            { title: "Apparel Printing", description: "Custom branding on T-shirts and caps/hats." },
            { title: "Tech Accessories", description: "Printed USB flash drives and mousepads." },
            { title: "Souvenirs & Trinkets", description: "Customized keychains, buttons/badges, pens, and table clocks." },
            { title: "Drinkware", description: "Branded sports water bottles." },
            { title: "Seasonal Items", description: "Specialty die-cut Eid Money Cards for festive gifting." }
        ],
        image: "mug.png",
        pattern: [[0, 4], [3, 2], [5, 5], [7, 1], [9, 2]] as number[][],
    },
    {
        category: "Industrial & Technical Services",
        shortDescription: "Precision services for technical requirements including engraving and digital printing.",
        items: [
            { title: "Laser Engraving", description: "Precision engraving on rigid materials (metal/plastic), capable of QR codes." },
            { title: "Digital Document Printing", description: "High-quality production digital printing for reports and booklets." }
        ],
        image: "laser.png",
        pattern: [[1, 3], [2, 0], [4, 5], [6, 1], [8, 4]] as number[][],
    },
];

const Grid = ({
    pattern,
    size,
}: {
    pattern?: number[][];
    size?: number;
}) => {
    const p = pattern ?? [[0, 0]];
    return (
        <div className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-neutral-100/30 to-neutral-300/30 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-1"
                    y="-1"
                    squares={p as [number, number][]}
                    className="absolute inset-0 h-full w-full stroke-black/5 fill-black/5"
                />
            </div>
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }: React.SVGProps<SVGSVGElement> & {
    width: number;
    height: number;
    x: string | number;
    y: string | number;
    squares?: Array<[number, number]>;
}) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}
