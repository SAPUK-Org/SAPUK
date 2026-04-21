import IntroSection from "@/components/how-we-can-help-you/downloadable-media/IntroSection";
import MediaGallery from "@/components/how-we-can-help-you/downloadable-media/MediaGallery";
import CustomMaterialsCta from "@/components/how-we-can-help-you/downloadable-media/CustomMaterialsCta";
import UsageGuidelines from "@/components/how-we-can-help-you/downloadable-media/UsageGuidelines";

export default function DownloadableMediaPage() {
  return (
    <section className="bg-saphub-bg pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12">
        <IntroSection />
        <MediaGallery />
        <CustomMaterialsCta />
        <UsageGuidelines />
      </div>
    </section>
  );
}
