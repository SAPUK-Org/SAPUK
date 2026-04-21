"use client";

import {
  CallToAction,
  DonationSection,
  MainContent,
  ScrollingText,
  ServicesSection,
} from "@/components/donate";

export default function WhyDonatePage() {
  return (
    <section className="bg-saphub-bg pt-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-8">
        <div id="donate" className="scroll-mt-28">
          <DonationSection />
        </div>
        <MainContent />
        <ServicesSection />
        <ScrollingText />
        <CallToAction />
      </div>
    </section>
  );
}
