import Link from "next/link"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <Section className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <h1 className="text-9xl font-bold text-primary tracking-tighter">404</h1>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
                </p>
            </div>
            <Button size="lg" asChild className="mt-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </Section>
    )
}
