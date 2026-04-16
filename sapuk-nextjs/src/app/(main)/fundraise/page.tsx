import FundraiseHero from "@/components/fundraise/hero";
import FacebookEmbed from "@/components/fundraise/facebook-embed";
import FundraisingIdeas from "@/components/fundraise/fundraising-ideas";
import SupportSection from "@/components/fundraise/support-section";
import ContactCTA from "@/components/fundraise/contact-cta";

export default function FundraisePage() {
  return (
    <section className="bg-saphub-bg pt-5 px-4 sm:px-6 lg:px-8">
      <div className="w-[95%] mx-auto bg-blue-50/80 backdrop-blur-sm rounded-lg shadow-md p-8 my-12">
        <FundraiseHero />
        <FacebookEmbed />
        <FundraisingIdeas />
        <SupportSection />
        <ContactCTA />
      </div>
    </section>
  );
}
