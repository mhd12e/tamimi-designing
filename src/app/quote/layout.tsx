import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Request a Free Quote | Premium Printing Services Sharjah & Dubai",
    description: "Get a customized quotation for your commercial printing, packaging, and branding needs. Fast response and expert consultation for all UAE businesses.",
    openGraph: {
        title: "Get a Quote | Al Tamimi Designing",
        description: "Submit your project details for a professional printing quotation. Specialized in luxury packaging and corporate branding.",
    },
};

export default function QuoteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
