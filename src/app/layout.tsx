import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatBot } from "@/components/chat/chat-bot";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Noor Al Khan Printing | Premium Commercial Printing Services in UAE",
  description: "Dubai's leading commercial printing brand for luxury packaging, corporate branding, and high-volume offset usage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
