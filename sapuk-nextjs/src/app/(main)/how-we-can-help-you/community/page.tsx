import HeroBanner from "@/components/how-we-can-help-you/community/HeroBanner";
import SubmissionInfo from "@/components/how-we-can-help-you/community/SubmissionInfo";
import FeaturedContent from "@/components/how-we-can-help-you/community/FeaturedContent";
import CallToAction from "@/components/how-we-can-help-you/community/CallToAction";

export default function CommunityPage() {
  return (
    <section className="bg-saphub-bg pt-20 px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      <HeroBanner />
      <SubmissionInfo />
      <FeaturedContent />
      <CallToAction />
    </section>
  );
}
