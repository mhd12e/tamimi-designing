"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";

const routes = [
    { href: "/", label: "Home" },
];

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        // Only scroll if we are on the home page
        if (pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
            }
        } else {
            // If on another page, let the default link behavior handle it (it will go to /#id)
            setIsOpen(false);
        }
    };

    const navLinks = [
        { href: "/#hero", id: "hero", label: "Home" }, // Special case, scrolls to top
        { href: "/#services", id: "services", label: "Services" },
        { href: "/#testimonials", id: "testimonials", label: "Stories" },
        { href: "/#gallery", id: "gallery", label: "Gallery" },
        { href: "/#location", id: "location", label: "Locate Us" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
            <Container className="flex h-20 items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm group-hover:border-brand-primary/30 group-hover:shadow-md transition-all duration-300">
                        <img
                            src="/logo.png"
                            alt="Al Tamimi Logo"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-brand-primary transition-colors">Al Tamimi Designing</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navLinks.map((route) => (
                        <Link
                            key={route.label}
                            href={route.href}
                            onClick={(e) => route.id ? scrollToSection(e, route.id) : undefined}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-brand-primary relative group py-2",
                                "text-neutral-600"
                            )}
                        >
                            {route.label}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <Button
                            className="bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20 rounded-full px-6"
                            asChild
                        >
                            <Link href="/quote">Get a Quote</Link>
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden hover:bg-neutral-100 rounded-full">
                                <Menu className="h-6 w-6 text-neutral-700" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-white/20 bg-white/95 backdrop-blur-xl p-0">
                            <div className="flex flex-col h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/10 via-transparent to-transparent">
                                <SheetHeader className="p-6 border-b border-neutral-100">
                                    <SheetTitle className="text-left text-2xl font-bold text-brand-primary">Al Tamimi Designing</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-2 p-6 flex-1">
                                    {navLinks.map((route, i) => (
                                        <Link
                                            key={route.label}
                                            href={route.href}
                                            onClick={(e) => route.id ? scrollToSection(e, route.id) : setIsOpen(false)}
                                            className={cn(
                                                "text-lg font-medium p-4 rounded-xl transition-all duration-300 hover:bg-brand-primary/5 hover:translate-x-2 flex items-center justify-between group",
                                                "text-neutral-600"
                                            )}
                                        >
                                            {route.label}
                                        </Link>
                                    ))}
                                    <div className="mt-auto pt-8">
                                        <Button className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 h-12 text-lg rounded-xl shadow-lg shadow-brand-primary/20" asChild>
                                            <Link href="/quote" onClick={() => setIsOpen(false)}>Get a Quote</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}
