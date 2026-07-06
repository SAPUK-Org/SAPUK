import { founder } from "./team-data";
import TeamStatsBar from "./TeamStatsBar";
import FeaturedFounderCard from "./FeaturedFounderCard";

export default function SapFamilyHero() {
  return (
    <section className="mb-4">
      <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:gap-12">
        <div className="flex-1 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-button-blue">
            The Team
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            Meet the SAPUK Family
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            We are a young community, but we are fresh and focused. SAPUK does
            this so that you can feel welcome and understand who you are creating
            safe spaces with — building bonds in a friendly manner, as encouraged
            by counsellors and therapists.
          </p>
          <TeamStatsBar />
        </div>
        <div className="flex-1 lg:mt-10 lg:max-w-md xl:max-w-lg">
          <FeaturedFounderCard member={founder} />
        </div>
      </div>
    </section>
  );
}
