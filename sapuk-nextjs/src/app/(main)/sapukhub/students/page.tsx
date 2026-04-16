import StudentsHero from "@/components/sapukhub/students/hero";
import StoryCarousel from "@/components/sapukhub/students/story-carousel";
import ResourcesSection from "@/components/sapukhub/students/resources-section";
import CallToAction from "@/components/sapukhub/students/call-to-action";

export default function Students() {
  return (
    <section className="min-h-screen pt-4">
      <StudentsHero />
      <StoryCarousel />
      <ResourcesSection />
      <CallToAction />
    </section>
  );
}
