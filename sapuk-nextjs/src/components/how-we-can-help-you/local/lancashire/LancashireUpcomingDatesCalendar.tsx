"use client";

import { useCallback, useMemo } from "react";
import { format, isSameDay } from "date-fns";
import {
  MorphCalendar,
  type MorphCalendarDayData,
  type MorphCalendarEvent,
} from "@/components/ui/morph-calendar";
import {
  LANCASHIRE_SCHEDULED_EVENTS,
  LANCASHIRE_TBC_EVENTS,
} from "./lancashire-upcoming-events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const eventCardClass =
  "flex h-full w-full flex-col overflow-hidden border-zinc-200/90 bg-white shadow-sm transition-shadow hover:shadow-md";

function EventGrid({ children }: { children: React.ReactNode }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
      {children}
    </ul>
  );
}

function ScheduledEventCard({
  event,
}: {
  event: (typeof LANCASHIRE_SCHEDULED_EVENTS)[number];
}) {
  return (
    <li className="flex min-h-46">
      <Card className={eventCardClass}>
        <CardHeader className="shrink-0 space-y-1 border-b border-zinc-100 bg-zinc-50/80 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {format(event.date, "EEEE")}
          </p>
          <CardTitle className="text-base font-semibold leading-snug text-zinc-900">
            {format(event.date, "d MMMM yyyy")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <p className="font-semibold leading-snug text-zinc-900">
            {event.title}
          </p>
          <p className="mt-2 text-sm text-zinc-600">{event.time}</p>
          {event.note ? (
            <p className="mt-auto border-t border-zinc-100 pt-3 text-sm leading-relaxed text-zinc-500">
              {event.note}
            </p>
          ) : (
            <span className="mt-auto block min-h-px" aria-hidden />
          )}
        </CardContent>
      </Card>
    </li>
  );
}

function TbcEventCard({
  event,
}: {
  event: (typeof LANCASHIRE_TBC_EVENTS)[number];
}) {
  return (
    <li className="flex min-h-46">
      <Card className={cn(eventCardClass, "border-dashed bg-zinc-50/50")}>
        <CardHeader className="shrink-0 space-y-1 border-b border-zinc-200/80 bg-zinc-100/60 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            To be confirmed / recurring
          </p>
          <CardTitle className="text-base font-semibold leading-snug text-zinc-900">
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-center px-5 pb-5 pt-4">
          <p className="text-sm leading-relaxed text-zinc-600">{event.detail}</p>
        </CardContent>
      </Card>
    </li>
  );
}

function eventsOnDay(date: Date) {
  return LANCASHIRE_SCHEDULED_EVENTS.filter((event) =>
    isSameDay(event.date, date),
  );
}

function toMorphEvent(
  event: (typeof LANCASHIRE_SCHEDULED_EVENTS)[number],
): MorphCalendarEvent {
  const titleLower = event.title.toLowerCase();
  let type: MorphCalendarEvent["type"] = "meeting";
  if (titleLower.includes("walk")) type = "focus";
  else if (titleLower.includes("festival") || titleLower.includes("con"))
    type = "reminder";
  else if (titleLower.includes("day out")) type = "task";

  return {
    id: `${event.title}-${event.date.toISOString()}`,
    title: event.title,
    time: event.time,
    type,
  };
}

export function LancashireUpcomingDatesCalendar() {
  const defaultMonth = useMemo(
    () => LANCASHIRE_SCHEDULED_EVENTS[0]?.date ?? new Date(),
    [],
  );

  const fromYear = useMemo(
    () =>
      Math.min(...LANCASHIRE_SCHEDULED_EVENTS.map((e) => e.date.getFullYear())),
    [],
  );

  const toYear = useMemo(
    () =>
      Math.max(...LANCASHIRE_SCHEDULED_EVENTS.map((e) => e.date.getFullYear())),
    [],
  );

  const getDayData = useCallback((date: Date): MorphCalendarDayData => {
    const dayEvents = eventsOnDay(date);

    const notes =
      dayEvents.length === 0
        ? "No SAPUK Lancashire events on this day. Choose a date with activity dots, or see all upcoming dates listed below."
        : dayEvents
            .map((e) => [e.title, e.time, e.note].filter(Boolean).join(" · "))
            .join("\n");

    return {
      events: dayEvents.map(toMorphEvent),
      notes,
    };
  }, []);

  const getActivityLevel = useCallback((date: Date): number => {
    const count = eventsOnDay(date).length;
    if (count === 0) return 0;
    return Math.min(count, 4);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto w-full max-w-md">
        <MorphCalendar
          getDayData={getDayData}
          getActivityLevel={getActivityLevel}
          defaultMonth={defaultMonth}
          fromYear={fromYear}
          toYear={toYear}
          showStats={false}
          className="border-zinc-200 shadow-md"
        />
        <p className="mt-3 text-center text-xs text-zinc-500">
          Activity dots mark days with an event. Tap a date to open details.
        </p>
      </div>

      <div className="w-full space-y-10">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-zinc-900">
            All upcoming dates
          </h3>
          <EventGrid>
            {[...LANCASHIRE_SCHEDULED_EVENTS]
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event) => (
                <ScheduledEventCard
                  key={`${event.title}-${event.date.toISOString()}`}
                  event={event}
                />
              ))}
          </EventGrid>
        </div>

        {LANCASHIRE_TBC_EVENTS.length > 0 ? (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900">
              Recurring & to be confirmed
            </h3>
            <EventGrid>
              {LANCASHIRE_TBC_EVENTS.map((event) => (
                <TbcEventCard key={event.title} event={event} />
              ))}
            </EventGrid>
          </div>
        ) : null}
      </div>
    </div>
  );
}
