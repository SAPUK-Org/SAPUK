"use client";

import { useMemo, useState } from "react";
import type { Event } from "@/components/dashboard/events/types";
import ProjectCard from "./ProjectCard";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import ProjectsFilterTabs from "./ProjectsFilterTabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  countEventsByTab,
  filterEventsByTab,
  type ProjectsFilter,
} from "./projects-utils";

type ProjectsGridProps = {
  events: Event[];
  loading?: boolean;
  emptyLabel?: string;
};

function ProjectCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <Skeleton className="aspect-[16/10] w-full shrink-0 rounded-none" />
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-auto h-10 w-full" />
      </div>
    </div>
  );
}

export default function ProjectsGrid({
  events,
  loading = false,
  emptyLabel = "No public events are scheduled right now.",
}: ProjectsGridProps) {
  const [filter, setFilter] = useState<ProjectsFilter>("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const counts = useMemo(() => countEventsByTab(events), [events]);
  const filteredEvents = useMemo(
    () => filterEventsByTab(events, filter),
    [events, filter],
  );

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <ProjectsFilterTabs value={filter} onChange={setFilter} counts={counts} />

      {loading ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 bg-white/60 px-6 py-10 text-center text-sm text-zinc-500">
          {emptyLabel}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {filteredEvents.map((event) => (
            <ProjectCard
              key={event.id}
              event={event}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      <ProjectDetailsDialog
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
