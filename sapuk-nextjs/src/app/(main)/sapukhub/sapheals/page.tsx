import SapHealsIntroSection from "@/components/sapukhub/sapheals/IntroSection";
import SapHealSummary from "@/components/sapukhub/sapheals/SapHealSummary";

export default function Sapheals() {
  return (
    <section className="bg-saphub-bg pb-4 px-4 md:p-14 pt-20 md:pt-24">
      <SapHealsIntroSection />
      <SapHealSummary />
    </section>
  );
}
