"use client";

import { useEffect, useMemo, useState } from "react";
import type { Event } from "@/components/dashboard/events/types";
import { eventEarliestStart } from "@/components/dashboard/events/events-utils";
import LocalServicesBanner from "@/components/how-we-can-help-you/local/LocalServicesBanner";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectsHero from "@/components/projects/ProjectsHero";
import VolunteerCta from "@/components/projects/VolunteerCta";

function sortEventsByStart(list: Event[]) {
  return [...list].sort((a, b) => {
    const ta = eventEarliestStart(a) ?? Infinity;
    const tb = eventEarliestStart(b) ?? Infinity;
    return ta - tb;
  });
}

export default function ProjectsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setEventsLoading(true);
      setEventsError(null);
      try {
        const res = await fetch("/api/public/events", {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
        const data = (await res.json().catch(() => null)) as {
          events?: Event[];
          msg?: string;
        };
        if (cancelled) return;
        if (!res.ok) {
          setEvents([]);
          setEventsError(data?.msg ?? "Could not load events");
          return;
        }
        setEvents(Array.isArray(data?.events) ? data.events : []);
      } catch {
        if (!cancelled) {
          setEvents([]);
          setEventsError("Could not load events");
        }
      } finally {
        if (!cancelled) setEventsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedEvents = useMemo(() => sortEventsByStart(events), [events]);

  return (
    <section className="bg-saphub-bg px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:gap-12">
        <LocalServicesBanner />
        <ProjectsHero />

        {eventsError ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {eventsError}
          </p>
        ) : null}

        <ProjectsGrid
          events={sortedEvents}
          loading={eventsLoading}
          emptyLabel="No public events are scheduled right now."
        />

        <VolunteerCta />
      </div>
    </section>
  );
}
