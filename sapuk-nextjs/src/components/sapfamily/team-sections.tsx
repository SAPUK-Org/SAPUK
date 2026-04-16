import TeamSection from "./team-section";
import {
  founder,
  directors,
  managementTeam,
  supervisors,
  admins,
} from "./team-data";

export default function TeamSections() {
  return (
    <section>
      <div className="container mx-auto px-4">
        {/* Founder Section */}
        <TeamSection
          title="Founder"
          members={[founder]}
          isSingleColumn={true}
        />

        {/* Directors Section */}
        <TeamSection title="Directors" members={directors} />

        {/* Management Team Section */}
        <TeamSection title="Management Team" members={managementTeam} />

        {/* Supervisors Section */}
        <TeamSection title="Supervisors" members={supervisors} />

        {/* Admins Section */}
        <TeamSection title="Admins" members={admins} />
      </div>
    </section>
  );
}
