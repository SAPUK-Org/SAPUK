import SuicidologyHero from "@/components/sapukhub/suicidology/hero";
import MainContent from "@/components/sapukhub/suicidology/main-content";
import SuicidologySidebar from "@/components/sapukhub/suicidology/sidebar";
import StigmaSection from "@/components/sapukhub/suicidology/stigma-section";

const SuicidologyPage = () => {
  return (
    <section className="px-4 bg-saphub-bg">
      <div className="max-w-7xl mx-auto px-4 pb-12 pt-20 md:py-20">
        <SuicidologyHero />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <MainContent />
          <SuicidologySidebar />
        </div>

        <StigmaSection />
      </div>
    </section>
  );
};

export default SuicidologyPage;
