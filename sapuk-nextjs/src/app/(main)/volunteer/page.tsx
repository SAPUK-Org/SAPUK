import AboutSection from "@/components/volunteer/about-section";
import BenefitsSection from "@/components/volunteer/benefits-section";
import ContactsSection from "@/components/volunteer/contacts-section";
import EventsCarousel from "@/components/volunteer/events-carousel";
import RegionsSection from "@/components/volunteer/regions";
import TestimonialsSection from "@/components/volunteer/testimonials-section";

export default function VolunteerPage() {
  return (
    <section className="bg-saphub-bg pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col items-center gap-8 lg:gap-12">
          <AboutSection />

          <hr className="w-4/5 h-1 bg-zinc-200 border-0" />

          <BenefitsSection />

          <hr className="w-4/5 h-1 bg-zinc-200 border-0" />

          <ContactsSection />

          <hr className="w-4/5 h-1 bg-zinc-200 border-0" />

          <RegionsSection />

          <hr className="w-4/5 h-1 bg-zinc-200 border-0" />

          <EventsCarousel />

          <hr className="w-4/5 h-1 bg-zinc-200 border-0" />

          <TestimonialsSection />
        </div>
      </div>
    </section>
  );
}
