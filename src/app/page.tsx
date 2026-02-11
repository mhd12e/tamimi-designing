import { MynaHero } from "@/components/ui/myna-hero";
import { ServicesSection } from "@/components/home/services-section";
import { GallerySection } from "@/components/home/gallery-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FindUsSection } from "@/components/home/find-us-section";

export default function Home() {
  return (
    <>
      <MynaHero />
      <ServicesSection />
      <TestimonialsSection />
      <GallerySection />
      <FindUsSection />
    </>
  );
}
