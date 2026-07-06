"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { TeamMember } from "@/types";
import TeamMemberBioDialog from "./TeamMemberBioDialog";

type FeaturedFounderCardProps = {
  member: TeamMember;
};

export default function FeaturedFounderCard({ member }: FeaturedFounderCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-lg sm:flex-row">
        <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:w-2/5 sm:min-h-[280px]">
          {member.image && (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-all duration-300 ease-in-out filter grayscale hover:grayscale-0 hover:scale-105"
              priority
            />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-8">
          <span className="w-fit rounded px-2 py-1 text-xs font-bold uppercase tracking-wide text-zinc-900 bg-amber">
            Founder
          </span>
          <h2 className="text-2xl font-bold text-zinc-900">{member.name}</h2>
          {member.handle && (
            <p className="text-sm font-medium text-link">{member.handle}</p>
          )}
          {member.bio && (
            <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600">
              {member.bio}
            </p>
          )}
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="mt-2 inline-flex w-fit items-center gap-1 rounded-lg bg-button-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-button-blue/90"
          >
            Read bio
            <ArrowRight className="h-4 w-4" />
          </button>
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
