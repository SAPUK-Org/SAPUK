import MobileTimeline from "@/components/sapevolution/mobile-timeline";
import DesktopTimeline from "@/components/sapevolution/desktop-timeline";

export default function SapEvolution() {
  return (
    <section className="bg-saphub-bg py-20 md:py-12 px-4 md:px-14">
      <div className="container mx-auto max-w-7xl">
        <MobileTimeline />
        <DesktopTimeline />
      </div>
    </section>
  );
}
