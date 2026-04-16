"use client";

import Image from "next/image";
import { useState } from "react";
import type { TeamMember } from "@/types";
import Link from "next/link";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 150; // Characters to show before truncating

  const shouldTruncate = member.bio && member.bio.length > MAX_LENGTH;
  const displayBio =
    shouldTruncate && !isExpanded
      ? `${member.bio?.slice(0, MAX_LENGTH)}...`
      : member.bio;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-72">
        <Image
          src={
            member.image ||
            "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwKoYcLufdxS9c2GgL1WqeDa7UV6P8pCjQtYof"
          }
          alt={member.name}
          fill
          className="object-cover transition-all ease-in-out duration-300 hover:scale-105 filter grayscale hover:grayscale-0"
        />
      </div>
      <div className="p-6">
        {member.name && (
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {member.name}
          </h3>
        )}
        {member.role && <p className="text-indigo-600 mb-2">{member.role}</p>}
        {member.email && (
          <Link
            href={`mailto:${member.email}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm block mb-2"
          >
            {member.email}
          </Link>
        )}
        <div className="text-gray-500 text-sm mb-4">
          {displayBio}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none cursor-pointer"
              aria-expanded={isExpanded}
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
        {member.location && (
          <p className="text-gray-500 text-sm">{member.location}</p>
        )}
      </div>
    </div>
  );
}
