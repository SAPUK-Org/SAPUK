import EvolutionCta from "@/components/sapevolution/EvolutionCta";
import EvolutionHero from "@/components/sapevolution/EvolutionHero";
import EvolutionStats from "@/components/sapevolution/EvolutionStats";
import MilestoneTimeline from "@/components/sapevolution/MilestoneTimeline";

export default function SapEvolution() {
  return (
    <main className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:gap-16">
        <EvolutionHero />
        <MilestoneTimeline />
        <EvolutionStats />
        <EvolutionCta />
      </div>
    </main>
  );
}
