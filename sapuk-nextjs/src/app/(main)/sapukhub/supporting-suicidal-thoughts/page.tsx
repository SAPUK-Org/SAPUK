import SupportingHero from "@/components/sapukhub/supporting-suicidal-thoughts/hero";
import GuidanceContent from "@/components/sapukhub/supporting-suicidal-thoughts/GuidanceContent";

export default function SupportingSomeone() {
  return (
    <>
      <div className="relative mt-[-100px] w-full overflow-x-clip bg-zinc-100 pt-[130px] sm:mt-[-110px] sm:pt-[150px] md:mt-[-120px] md:pt-[160px]">
        <div className="mx-auto max-w-360 px-4 pb-12 pt-12 sm:px-6 sm:pt-14 md:pt-16 lg:px-8 lg:pb-16">
          <SupportingHero />
        </div>
      </div>

      <section className="relative z-10 bg-white pb-16">
        <div className="mx-auto max-w-360 space-y-6 px-4 py-12 sm:px-6 lg:px-8">
          <GuidanceContent />
        </div>
      </section>
    </>
  );
}
