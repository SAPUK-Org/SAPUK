"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, User } from "lucide-react";
import type { TeamMember } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DEFAULT_MEMBER_IMAGE } from "./constants";

type TeamMemberBioDialogProps = {
  member: TeamMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function TeamMemberBioDialog({
  member,
  open,
  onOpenChange,
}: TeamMemberBioDialogProps) {
  const hasMeta = Boolean(member.email || member.location);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto border-zinc-200 bg-white p-0 data-[state=open]:duration-300 data-[state=closed]:duration-200 sm:max-w-lg sm:rounded-xl">
        <DialogHeader className="space-y-0 border-b border-zinc-100 bg-purple-card/15 px-6 pb-5 pt-6 text-left">
          <div className="flex items-center gap-4 pr-8">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-purple-card/40 ring-4 ring-white shadow-sm">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-8 w-8 text-button-blue/60" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-2xl font-bold tracking-tight text-zinc-900">
                {member.name}
              </DialogTitle>
              {member.role && (
                <p className="mt-1.5 text-sm font-semibold text-button-blue">
                  {member.role}
                </p>
              )}
              {member.handle && (
                <p className="mt-1 text-sm text-link">{member.handle}</p>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 px-6 py-6">
          {member.bio && (
            <p className="text-[15px] leading-relaxed text-zinc-700 whitespace-pre-wrap">
              {member.bio}
            </p>
          )}

          {hasMeta && (
            <div className="flex flex-col gap-2.5 border-t border-zinc-100 pt-5 text-sm text-zinc-600">
              {member.email && (
                <Link
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 font-medium text-link transition-colors hover:text-link/80"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  {member.email}
                </Link>
              )}
              {member.location && (
                <p className="inline-flex items-center gap-2">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-button-blue/70"
                    aria-hidden
                  />
                  <span>{member.location}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MemberAvatar({
  member,
  className = "h-14 w-14",
  imageClassName = "rounded-full",
}: {
  member: TeamMember;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-purple-card/30 ${className} ${imageClassName}`}
    >
      {member.image ? (
        <Image
          src={member.image || DEFAULT_MEMBER_IMAGE}
          alt={member.name}
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <User className="h-6 w-6 text-button-blue/60" />
        </div>
      )}
    </div>
  );
}
