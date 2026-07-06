"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, User } from "lucide-react";
import type { TeamMember } from "@/types";
import TeamMemberBioDialog from "./TeamMemberBioDialog";

type TeamMemberCardProps = {
  member: TeamMember;
};

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md">
        <div className="relative h-72 w-full shrink-0 bg-purple-card/20">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-all duration-300 ease-in-out filter grayscale hover:grayscale-0 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-16 w-16 text-button-blue/40" />
            </div>
          )}
        </div>
        <div className="flex min-h-[180px] flex-1 flex-col p-5">
          <h3 className="text-lg font-bold text-zinc-900">{member.name}</h3>
          {member.role && (
            <p className="mt-1 text-sm font-medium text-button-blue">
              {member.role}
            </p>
          )}
          {member.bio ? (
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600">
              {member.bio}
            </p>
          ) : (
            <div className="flex-1" />
          )}
          {member.bio && (
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-link hover:text-link/80"
            >
              Read more
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <TeamMemberBioDialog
        member={member}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
