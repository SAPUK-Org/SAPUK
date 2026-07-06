import SuicidologyHero from "@/components/sapukhub/suicidology/hero";
import MainContent from "@/components/sapukhub/suicidology/main-content";
import SuicidologySidebar from "@/components/sapukhub/suicidology/sidebar";

const SuicidologyPage = () => {
  return (
    <>
      {/* Pull background into main layout top padding so no page bg shows above hero */}
      <div className="relative mt-[-100px] w-full overflow-x-clip bg-zinc-100 pt-[100px] sm:mt-[-110px] sm:pt-[110px] md:mt-[-120px] md:pt-[120px]">
        <div className="mx-auto max-w-360 px-4 pb-12 pt-12 sm:px-6 sm:pt-14 md:pt-16 lg:px-8 lg:pb-16">
          <SuicidologyHero />
        </div>
      </div>

      <section className="bg-white pb-16 relative z-10">
        <div className="mx-auto grid max-w-360 grid-cols-1 gap-12 pt-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8 items-center">
          <MainContent />
          <SuicidologySidebar />
        </div>
      </section>
    </>
  );
};

export default SuicidologyPage;
