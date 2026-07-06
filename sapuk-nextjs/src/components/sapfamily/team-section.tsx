import { ArrowRight } from "lucide-react";
import type { TeamMember } from "@/types";
import type { TeamTab } from "./constants";
import TeamMemberCard from "./TeamMemberCard";

interface TeamSectionProps {
  id: TeamTab;
  title: string;
  members: TeamMember[];
  onViewAll: (tab: TeamTab) => void;
}

export default function TeamSection({
  id,
  title,
  members,
  onViewAll,
}: TeamSectionProps) {
  return (
    <section id={`team-${id}`} className="scroll-mt-32">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-zinc-900">{title}</h2>
        <button
          type="button"
          onClick={() => onViewAll(id)}
          className="inline-flex items-center gap-1 text-sm font-medium text-link hover:text-link/80"
        >
          View all {title}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, index) => (
          <TeamMemberCard key={`${member.name}-${index}`} member={member} />
        ))}
      </div>
    </section>
  );
}
