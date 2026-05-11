"use client";

import { useEffect, useMemo, useState } from "react";
import type { Event } from "@/components/dashboard/events/types";
import ProjectEventsList from "@/components/projects/ProjectEventsList";

function sortEventsByStart(list: Event[]) {
  return [...list].sort((a, b) => {
    const ta = a.starts_at ? new Date(a.starts_at).getTime() : Infinity;
    const tb = b.starts_at ? new Date(b.starts_at).getTime() : Infinity;
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
    <section className="px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-3xl">
        {eventsLoading ? (
          <p className="text-sm text-zinc-400">Loading events…</p>
        ) : null}
        {eventsError ? (
          <p className="text-sm text-amber-500/90">{eventsError}</p>
        ) : null}

        {!eventsLoading && !eventsError ? (
          <ProjectEventsList
            events={sortedEvents}
            emptyLabel="No public events are scheduled right now."
          />
        ) : null}
      </div>
    </section>
  );
}
