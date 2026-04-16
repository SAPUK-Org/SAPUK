import SapFamilyHero from "@/components/sapfamily/hero";
import TeamSections from "@/components/sapfamily/team-sections";

export default function SapFamily() {
  return (
    <section className="bg-saphub-bg pt-16">
      <SapFamilyHero />
      <TeamSections />
    </section>
  );
}
