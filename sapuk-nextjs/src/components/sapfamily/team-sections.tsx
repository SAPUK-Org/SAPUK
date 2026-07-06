import {
  directors,
  managementTeam,
  supervisors,
  admins,
} from "./team-data";
import type { TeamTab } from "./constants";
import TeamSection from "./team-section";

const SECTIONS = [
  {
    id: "directors" as const,
    title: "Directors",
    members: directors,
  },
  {
    id: "management" as const,
    title: "Management Team",
    members: managementTeam,
  },
  {
    id: "supervisors" as const,
    title: "Supervisors",
    members: supervisors,
  },
  {
    id: "admins" as const,
    title: "Admins",
    members: admins,
  },
];

type TeamSectionsProps = {
  activeTab: TeamTab;
  onViewAll: (tab: TeamTab) => void;
};

export default function TeamSections({
  activeTab,
  onViewAll,
}: TeamSectionsProps) {
  const visibleSections =
    activeTab === "all"
      ? SECTIONS
      : SECTIONS.filter((section) => section.id === activeTab);

  return (
    <div className="space-y-16">
      {visibleSections.map((section) => (
        <TeamSection
          key={section.id}
          id={section.id}
          title={section.title}
          members={section.members}
          onViewAll={onViewAll}
        />
      ))}
    </div>
  );
}
