"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";
import {
  LANCASHIRE_SCHEDULED_EVENTS,
  type LancashireAccent,
  type LancashireScheduledEvent,
} from "./lancashire-upcoming-events";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const accentStyles: Record<
  LancashireAccent,
  {
    badge: string;
    icon: string;
    rail: string;
    day: string;
    dot: string;
  }
> = {
  blue: {
    badge: "bg-blue-50 text-blue-700 ring-blue-100",
    icon: "bg-blue-50 text-blue-600",
    rail: "bg-blue-50 text-blue-900",
    day: "bg-blue-100 text-blue-800",
    dot: "bg-blue-500",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    icon: "bg-emerald-50 text-emerald-600",
    rail: "bg-emerald-50 text-emerald-900",
    day: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
  },
  amber: {
    badge: "bg-amber-50 text-amber-700 ring-amber-100",
    icon: "bg-amber-50 text-amber-700",
    rail: "bg-amber-50 text-amber-900",
    day: "bg-amber-100 text-amber-800",
    dot: "bg-amber-500",
  },
  rose: {
    badge: "bg-rose-50 text-rose-700 ring-rose-100",
    icon: "bg-rose-50 text-rose-600",
    rail: "bg-rose-50 text-rose-900",
    day: "bg-rose-100 text-rose-800",
    dot: "bg-rose-500",
  },
  purple: {
    badge: "bg-violet-50 text-violet-700 ring-violet-100",
    icon: "bg-violet-50 text-violet-600",
    rail: "bg-violet-50 text-violet-900",
    day: "bg-violet-100 text-violet-800",
    dot: "bg-violet-500",
  },
};

const allSortedEvents = [...LANCASHIRE_SCHEDULED_EVENTS].sort(
  (a, b) => a.date.getTime() - b.date.getTime(),
);

function getEventKey(event: LancashireScheduledEvent) {
  return `${event.title}-${event.date.toISOString()}`;
}

function getEventsOnDay(events: LancashireScheduledEvent[], date: Date) {
  return events.filter((event) => isSameDay(event.date, date));
}

function EventCard({ event }: { event: LancashireScheduledEvent }) {
  const styles = accentStyles[event.accent];

  return (
    <article className="grid min-h-[154px] grid-cols-[4.75rem_1fr] overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)]">
      <time
        dateTime={format(event.date, "yyyy-MM-dd")}
        className={cn(
          "flex flex-col items-center justify-start gap-1 border-r border-slate-100 px-2 py-4 text-center",
          styles.rail,
        )}
      >
        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {format(event.date, "EEE")}
        </span>
        <span className="text-2xl font-black leading-none">
          {format(event.date, "d")}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {format(event.date, "MMM")}
        </span>
      </time>

      <div className="flex min-w-0 flex-col gap-2 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold leading-tight text-slate-950">
            {event.title}
          </h3>
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ring-1",
              styles.badge,
            )}
          >
            {event.category}
          </span>
        </div>
        <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">{event.location}</span>
        </p>
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
          {event.summary}
        </p>
        <p className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Clock3 className="size-3.5 shrink-0" aria-hidden />
          {event.time}
        </p>
      </div>
    </article>
  );
}

function CompactMonthCalendar({
  currentMonth,
  selectedDate,
  events,
  minMonth,
  maxMonth,
  onMonthChange,
  onSelectDate,
}: {
  currentMonth: Date;
  selectedDate: Date;
  events: LancashireScheduledEvent[];
  minMonth: Date;
  maxMonth: Date;
  onMonthChange: (date: Date) => void;
  onSelectDate: (date: Date) => void;
}) {
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    return eachDayOfInterval({
      start: startOfWeek(monthStart, { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 }),
    });
  }, [currentMonth]);

  const canGoPrevious = currentMonth.getTime() > minMonth.getTime();
  const canGoNext = currentMonth.getTime() < maxMonth.getTime();
  const monthEvents = events.filter((event) =>
    isSameMonth(event.date, currentMonth),
  );

  return (
    <aside className="rounded-lg border border-slate-200/80 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canGoPrevious && onMonthChange(subMonths(currentMonth, 1))}
          disabled={!canGoPrevious}
          className="flex size-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Show previous month"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <h3 className="text-sm font-bold text-slate-950">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          type="button"
          onClick={() => canGoNext && onMonthChange(addMonths(currentMonth, 1))}
          disabled={!canGoNext}
          className="flex size-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Show next month"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map((date) => {
          const dayEvents = getEventsOnDay(events, date);
          const primaryEvent = dayEvents[0];
          const selected = isSameDay(date, selectedDate);
          const inMonth = isSameMonth(date, currentMonth);

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => {
                if (inMonth) onSelectDate(date);
              }}
              disabled={!inMonth}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-full text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2",
                inMonth ? "text-slate-600 hover:bg-slate-100" : "text-slate-300",
                primaryEvent ? accentStyles[primaryEvent.accent].day : "",
                selected ? "bg-violet-600 text-white hover:bg-violet-600" : "",
              )}
              aria-label={`${format(date, "d MMMM yyyy")}${
                dayEvents.length ? `, ${dayEvents.length} event` : ""
              }`}
            >
              {format(date, "d")}
              {dayEvents.length > 0 && !selected ? (
                <span
                  className={cn(
                    "absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full",
                    accentStyles[primaryEvent.accent].dot,
                  )}
                  aria-hidden
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
        <span className="size-2 rounded-full bg-violet-500" aria-hidden />
        {monthEvents.length} {monthEvents.length === 1 ? "event" : "events"} this
        month
      </div>
    </aside>
  );
}

export function LancashireUpcomingDatesCalendar() {
  const upcomingEvents = useMemo(() => {
    const today = startOfDay(new Date());
    return allSortedEvents.filter((event) => event.date >= today);
  }, []);
  const firstEvent = upcomingEvents[0];
  const lastEvent = upcomingEvents[upcomingEvents.length - 1];
  const minMonth = startOfMonth(firstEvent?.date ?? new Date());
  const maxMonth = startOfMonth(lastEvent?.date ?? new Date());

  const [currentMonth, setCurrentMonth] = useState(minMonth);
  const [selectedDate, setSelectedDate] = useState(firstEvent?.date ?? new Date());
  const [showAll, setShowAll] = useState(false);
  const visibleEvents = showAll ? upcomingEvents : upcomingEvents.slice(0, 6);
  const selectedEvents = getEventsOnDay(upcomingEvents, selectedDate);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <CalendarDays className="size-4" aria-hidden />
            </span>
            <h2 className="text-lg font-bold text-slate-950">Upcoming dates</h2>
          </div>
          <button
            type="button"
            onClick={() => setCurrentMonth(startOfMonth(selectedDate))}
            className="text-xs font-bold text-violet-600 transition hover:text-violet-800 hover:underline"
          >
            View selected in calendar
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleEvents.length > 0 ? (
            visibleEvents.map((event) => (
              <button
                key={getEventKey(event)}
                type="button"
                onClick={() => {
                  setSelectedDate(event.date);
                  setCurrentMonth(startOfMonth(event.date));
                }}
                className="block min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
              >
                <EventCard event={event} />
              </button>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-600 md:col-span-2 xl:col-span-3">
              There are no upcoming Lancashire dates listed right now. Please
              check back soon or get in touch with the Lancashire team.
            </div>
          )}
        </div>

        {upcomingEvents.length > 6 ? (
          <div className="mt-5 flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAll((value) => !value)}
              className="rounded-lg border-slate-200 bg-white px-4 text-xs font-bold text-violet-600 shadow-sm hover:bg-violet-50 hover:text-violet-700"
            >
              {showAll ? "Show fewer dates" : "See all upcoming dates"}
              <ChevronRight className="size-3.5" aria-hidden />
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <CompactMonthCalendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          events={upcomingEvents}
          minMonth={minMonth}
          maxMonth={maxMonth}
          onMonthChange={setCurrentMonth}
          onSelectDate={setSelectedDate}
        />

        <div
          className="rounded-lg border border-slate-200/80 bg-white p-4 text-sm shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
          aria-live="polite"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Selected date
          </p>
          <p className="mt-1 font-bold text-slate-950">
            {format(selectedDate, "d MMMM yyyy")}
          </p>
          {selectedEvents.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-2">
              {selectedEvents.map((event) => (
                <li key={getEventKey(event)} className="text-xs text-slate-600">
                  <span className="font-bold text-slate-800">{event.title}</span>{" "}
                  · {event.time}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              No listed Lancashire event on this date.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
