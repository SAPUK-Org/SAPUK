"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-4 pr-6">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-purple-card/30">
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
            <div className="min-w-0 text-left">
              <DialogTitle className="text-xl font-bold text-zinc-900">
                {member.name}
              </DialogTitle>
              {member.role && (
                <p className="mt-1 text-sm font-medium text-button-blue">
                  {member.role}
                </p>
              )}
              {member.handle && (
                <p className="mt-0.5 text-sm text-link">{member.handle}</p>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 text-sm text-zinc-600">
          {member.bio && (
            <p className="leading-relaxed whitespace-pre-wrap">{member.bio}</p>
          )}
          {member.email && (
            <Link
              href={`mailto:${member.email}`}
              className="block font-medium text-link hover:text-link/80"
            >
              {member.email}
            </Link>
          )}
          {member.location && <p>{member.location}</p>}
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
