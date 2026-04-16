import HeroBanner from "@/components/sapservices/community/HeroBanner";
import SubmissionInfo from "@/components/sapservices/community/SubmissionInfo";
import FeaturedContent from "@/components/sapservices/community/FeaturedContent";
import CallToAction from "@/components/sapservices/community/CallToAction";

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
