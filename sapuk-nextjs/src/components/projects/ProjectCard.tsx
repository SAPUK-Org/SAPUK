"use client";

import type { Event } from "@/components/dashboard/events/types";
import { formatEventLocations } from "@/components/dashboard/events/events-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import {
  getEventCardSchedule,
  getEventCoverImage,
  isProjectType,
} from "./projects-utils";

type ProjectCardProps = {
  event: Event;
  onViewDetails: (event: Event) => void;
};

function MetaRow({
  icon: Icon,
  children,
}: {
  icon: typeof CalendarDays;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2 text-sm text-zinc-600">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export default function ProjectCard({
  event,
  onViewDetails,
}: ProjectCardProps) {
  const coverImage = getEventCoverImage(event);
  const { date, time } = getEventCardSchedule(event);
  const location = formatEventLocations(event.location);
  const isProject = isProjectType(event.type);
  const typeLabel =
    event.type?.trim() || (isProject ? "Project" : "Community Event");

  return (
    <Card className="flex h-full flex-col overflow-hidden border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-100">
        <Image
          src={coverImage}
          alt={event.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <CardContent className="flex min-w-0 flex-1 flex-col gap-4 p-5 sm:p-6 border-t border-zinc-900/30">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold leading-snug text-zinc-900 sm:text-xl">
            {event.title}
          </h2>
          <Badge
            className={cn(
              "shrink-0 border-0 px-2.5 py-0.5 text-xs font-semibold",
              isProject
                ? "bg-emerald-100 text-emerald-800"
                : "bg-purple-card/25 text-link",
            )}
          >
            {typeLabel}
          </Badge>
        </div>

        <ul className="space-y-1.5">
          <MetaRow icon={CalendarDays}>{date}</MetaRow>
          {time ? <MetaRow icon={Clock}>{time}</MetaRow> : null}
          <MetaRow icon={MapPin}>{location}</MetaRow>
          {event.max_volunteers != null ? (
            <MetaRow icon={Users}>
              Up to {event.max_volunteers} attendees
            </MetaRow>
          ) : null}
        </ul>

        {event.description ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600">
            {event.description}
          </p>
        ) : null}

        <Button
          type="button"
          className="mt-auto self-end w-fit bg-button-blue text-white hover:bg-button-blue/90"
          onClick={() => onViewDetails(event)}
        >
          View details
        </Button>
      </CardContent>
    </Card>
  );
}
