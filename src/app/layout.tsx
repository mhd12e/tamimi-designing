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
  metadataBase: new URL("https://nooralkhan.com"),
  title: {
    default: "Noor Al Khan Printing | Premium Commercial Printing & Branding in UAE",
    template: "%s | Noor Al Khan Printing"
  },
  description: "Leading commercial printing brand in Sharjah & Dubai. Specializing in luxury packaging, corporate stationery, large format branding, and urgent digital printing services since establishment.",
  keywords: [
    "printing services sharjah",
    "commercial printing uae",
    "luxury packaging dubai",
    "corporate stationery printing",
    "large format printing sharjah",
    "digital printing uae",
    "stickers and labels printing dubai",
    "urgent rubber stamps sharjah",
    "booklet printing sharjah",
    "customized gifts uae"
  ],
  authors: [{ name: "Noor Al Khan Printing" }],
  creator: "Noor Al Khan Printing",
  publisher: "Noor Al Khan Printing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://nooralkhan.com",
    title: "Noor Al Khan Printing | Premium Commercial Printing Services",
    description: "Dubai and Sharjah's choice for luxury packaging, branding, and high-volume offset printing.",
    siteName: "Noor Al Khan Printing",
    images: [{
      url: "/og-image.png", // Assuming we might want to add this, or use a placeholder
      width: 1200,
      height: 630,
      alt: "Noor Al Khan Printing Showcase",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noor Al Khan Printing | Business Branding & Printing",
    description: "Premium commercial printing services in Sharjah and Dubai. Quality packaging and stationery.",
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
