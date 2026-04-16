import { TeamMember } from "@/types";
import TeamMemberCard from "./TeamMemberCard";

interface TeamSectionProps {
  title: string;
  members: TeamMember[];
  isSingleColumn?: boolean;
}

export default function TeamSection({
  title,
  members,
  isSingleColumn = false,
}: TeamSectionProps) {
  return (
    <div className="mb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        {title}
      </h2>
      <div
        className={
          isSingleColumn
            ? "flex justify-center max-w-[384px] md:max-w-none mx-auto"
            : `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[384px] md:max-w-none mx-auto items-start`
        }
      >
        {members.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}
