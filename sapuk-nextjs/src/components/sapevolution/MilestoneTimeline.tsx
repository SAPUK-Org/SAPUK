"use client";

import { useState } from "react";
import {
  Heart,
  Home,
  Megaphone,
  MessageCircle,
  Quote,
  Sprout,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FOUNDER_QUOTE,
  MILESTONE_FILTERS,
  type MilestoneFilter,
  type MilestoneIcon,
  type TimelineMilestone,
  timelineData,
} from "./timeline-data";

const MILESTONE_ICONS: Record<MilestoneIcon, LucideIcon> = {
  sprout: Sprout,
  megaphone: Megaphone,
  users: Users,
  "message-circle": MessageCircle,
  heart: Heart,
  home: Home,
  star: Star,
};

function MilestoneCard({
  item,
  align = "left",
}: {
  item: TimelineMilestone;
  align?: "left" | "right";
}) {
  const Icon = MILESTONE_ICONS[item.icon];

  return (
    <article
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6",
        align === "right" && "md:text-left",
      )}
    >
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-violet-700">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 space-y-2">
          <p className="text-sm font-bold text-violet-700">{item.year}</p>
          <h3 className="text-lg font-bold text-slate-950 sm:text-xl">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            {item.content}
          </p>
        </div>
      </div>
    </article>
  );
}

function QuoteCard() {
  return (
    <aside className="rounded-2xl border border-amber/40 bg-amber/70 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6">
      <Quote className="size-8 text-violet-700" aria-hidden />
      <blockquote className="mt-3 space-y-3">
        <p className="text-base font-medium leading-relaxed text-slate-900 sm:text-lg">
          &ldquo;{FOUNDER_QUOTE.text}&rdquo;
        </p>
        <footer className="text-sm font-semibold text-violet-800">
          — {FOUNDER_QUOTE.attribution}
        </footer>
      </blockquote>
    </aside>
  );
}

export default function MilestoneTimeline() {
  const [filter, setFilter] = useState<MilestoneFilter>("all");

  const milestones =
    filter === "all"
      ? timelineData
      : timelineData.filter((item) => item.category === filter);

  return (
    <section className="space-y-8" aria-labelledby="milestones-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="milestones-heading" className="sr-only">
          Our milestones
        </h2>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter milestones"
        >
          {MILESTONE_FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold transition",
                  active
                    ? "bg-violet-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-700",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="relative space-y-6 md:hidden">
        <div
          className="absolute top-3 bottom-3 left-[1.35rem] w-0.5 bg-violet-300"
          aria-hidden
        />
        {milestones.map((item) => (
          <div key={item.id} className="relative flex gap-4 pl-1">
            <span className="relative z-10 mt-5 size-3 shrink-0 rounded-full bg-violet-600 ring-4 ring-violet-100" />
            <div className="min-w-0 flex-1">
              <MilestoneCard item={item} />
            </div>
          </div>
        ))}
        <div className="relative flex gap-4 pl-1">
          <span className="relative z-10 mt-5 size-3 shrink-0 rounded-full bg-amber ring-4 ring-amber/40" />
          <div className="min-w-0 flex-1">
            <QuoteCard />
          </div>
        </div>
      </div>

      {/* Desktop alternating timeline */}
      <div className="relative hidden md:block">
        <div
          className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-violet-300"
          aria-hidden
        />
        <ul className="space-y-10">
          {milestones.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <li key={item.id} className="relative grid grid-cols-2 gap-10">
                <span
                  className="absolute top-8 left-1/2 z-10 size-3.5 -translate-x-1/2 rounded-full bg-violet-600 ring-4 ring-violet-100"
                  aria-hidden
                />
                {isLeft ? (
                  <>
                    <div className="pr-6">
                      <MilestoneCard item={item} align="left" />
                    </div>
                    <div aria-hidden />
                  </>
                ) : (
                  <>
                    <div aria-hidden />
                    <div className="pl-6">
                      <MilestoneCard item={item} align="right" />
                    </div>
                  </>
                )}
              </li>
            );
          })}
          <li className="relative grid grid-cols-2 gap-10">
            <span
              className="absolute top-8 left-1/2 z-10 size-3.5 -translate-x-1/2 rounded-full bg-amber ring-4 ring-amber/40"
              aria-hidden
            />
            <div aria-hidden />
            <div className="pl-6">
              <QuoteCard />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
