import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatBot } from "@/components/chat/chat-bot";
import { JsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://altamimidesigning.com"), // Assuming domain update or placeholder
  title: {
    default: "Al Tamimi Designing | Luxury Packaging & Event Fabrication UAE",
    template: "%s | Al Tamimi Designing"
  },
  description: "Premier design and production house in Sharjah. Specializing in luxury rigid boxes, event stages, acrylic signage, and corporate gifting.",
  keywords: [
    "packaging design sharjah",
    "event fabrication uae",
    "laser cutting sharjah",
    "luxury boxes manufacturing",
    "acrylic signage dubai",
    "corporate gifts uae",
    "printing press majas 3",
    "wedding invitations uae",
    "custom fabrication uae",
    "al tamimi designing"
  ],
  authors: [{ name: "Al Tamimi Designing" }],
  creator: "Al Tamimi Designing",
  publisher: "Al Tamimi Designing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://altamimidesigning.com",
    title: "Al Tamimi Designing | Luxury Packaging & Events",
    description: "Sharjah's premier destination for luxury packaging, event fabrication, and corporate branding.",
    siteName: "Al Tamimi Designing",
    images: [{
      url: "/og-image.png", // Assuming we might want to add this, or use a placeholder
      width: 1200,
      height: 630,
      alt: "Al Tamimi Designing Showcase",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Tamimi Designing | Luxury Packaging & Events",
    description: "Premium commercial printing and design services in Sharjah and Dubai.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className={cn(inter.variable, "font-sans min-h-screen flex flex-col antialiased")}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
