"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  HeartHandshake,
  Laptop,
  Mail,
  MapPin,
  MessageCircleHeart,
  Monitor,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FEATURED_SAFE_SPACES,
  HOW_IT_WORKS,
  RECURRING_SAFE_SPACES,
  SAFE_SPACES_FILTERS,
  VALUE_PROPS,
  VIRTUAL_CONTACTS,
  type FeaturedSafeSpace,
  type RecurringSafeSpace,
  type SafeSpaceFilter,
} from "./safe-spaces-data";

const valueIcons = [Laptop, HeartHandshake, ShieldCheck, UsersRound] as const;
const howIcons = [
  CalendarDays,
  MessageCircleHeart,
  HeartHandshake,
  Sparkles,
] as const;

function FeaturedCard({ space }: { space: FeaturedSafeSpace }) {
  const isVirtual = space.type === "virtual";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
      <div
        className={cn(
          "relative flex min-h-40 items-center justify-center overflow-hidden",
          isVirtual ? "bg-violet-50" : "bg-emerald-50",
        )}
      >
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
            isVirtual
              ? "bg-sky-100 text-sky-800"
              : "bg-emerald-100 text-emerald-800",
          )}
        >
          {isVirtual ? "Virtual" : "In person"}
        </span>
        {space.image ? (
          <Image
            src={space.image.src}
            alt={space.image.alt}
            width={280}
            height={160}
            className="h-36 w-auto object-contain px-4 pt-6"
          />
        ) : (
          <span
            className={cn(
              "flex size-16 items-center justify-center rounded-full ring-1",
              isVirtual
                ? "bg-white text-violet-600 ring-violet-100"
                : "bg-white text-emerald-600 ring-emerald-100",
            )}
          >
            {isVirtual ? (
              <Monitor className="size-7" aria-hidden />
            ) : (
              <MapPin className="size-7" aria-hidden />
            )}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-black tracking-tight text-slate-950">
          {space.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {space.description}
        </p>

        <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-500">
          <li className="flex items-center gap-2">
            <CalendarDays
              className="size-3.5 shrink-0 text-violet-500"
              aria-hidden
            />
            {space.schedule}
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-3.5 shrink-0 text-violet-500" aria-hidden />
            {space.time}
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-violet-500" aria-hidden />
            {space.location}
          </li>
        </ul>

        <div className="mt-auto pt-5">
          <Button
            asChild
            className="h-10 w-full rounded-lg bg-violet-600 text-xs font-black text-white shadow-none hover:bg-violet-500"
          >
            <Link href={space.href}>View details</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function RecurringCard({ item }: { item: RecurringSafeSpace }) {
  return (
    <Link
      href={item.href}
      className="flex min-w-46 flex-col rounded-xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.07)]"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-violet-50 text-violet-600 ring-1 ring-violet-100">
        {item.type === "virtual" ? (
          <Monitor className="size-4" aria-hidden />
        ) : (
          <MapPin className="size-4" aria-hidden />
        )}
      </span>
      <h3 className="mt-3 text-sm font-black text-slate-950">{item.title}</h3>
      <p className="mt-1 text-[11px] font-semibold text-slate-500">
        {item.schedule}
      </p>
      <p className="mt-1 text-[11px] font-medium text-slate-400">
        {item.location}
      </p>
    </Link>
  );
}

export default function SafeSpacesPage() {
  const [filter, setFilter] = useState<SafeSpaceFilter>("all");

  const featured = useMemo(
    () =>
      FEATURED_SAFE_SPACES.filter((space) => space.filters.includes(filter)),
    [filter],
  );

  const recurring = useMemo(
    () => RECURRING_SAFE_SPACES.filter((item) => item.filters.includes(filter)),
    [filter],
  );

  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <article className="flex flex-col gap-12">
          {/* Hero */}
          <section className="overflow-hidden rounded-2xl border border-violet-100 bg-linear-to-br from-violet-50 via-white to-violet-50/40 px-6 py-8 shadow-[0_20px_60px_rgba(76,29,149,0.06)] sm:px-8 lg:px-10 lg:py-10">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Safe Spaces
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Need someone to talk to? Safe Spaces are places — online and
                  in person — where you can connect, talk, and feel supported
                  without judgement. You belong here.
                </p>
              </div>
              <div className="relative mx-auto aspect-4/3 w-full max-w-md overflow-hidden rounded-2xl bg-violet-50/80 ring-1 ring-violet-100">
                <Image
                  src="/safe-spaces/virtual-safe-spaces.png"
                  alt="Illustration of people connecting through a virtual safe space session"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="object-contain p-4"
                />
              </div>
            </div>
          </section>

          {/* Value props */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((prop, index) => {
              const Icon = valueIcons[index];
              return (
                <div
                  key={prop.title}
                  className="flex flex-col items-center text-center"
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h2 className="mt-3 text-sm font-black text-slate-950">
                    {prop.title}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {prop.detail}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Filters + featured grid */}
          <section className="scroll-mt-28" id="safe-spaces">
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter safe spaces"
            >
              {SAFE_SPACES_FILTERS.map((item) => {
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

            {featured.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((space) => (
                  <FeaturedCard key={space.id} space={space} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  No safe spaces match this filter yet. Try another option or
                  view all safe spaces.
                </p>
              </div>
            )}
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-center text-2xl font-black tracking-tight text-slate-950">
              How safe spaces work
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((item, index) => {
                const Icon = howIcons[index];
                return (
                  <div key={item.title} className="text-center">
                    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-sm font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Map teaser + contact */}
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-6">
              <h2 className="text-lg font-black text-slate-950">
                In-person safe spaces
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Find local Safe Spaces across Lancashire and Dewsbury
                (Kirklees), with more locations to come.
              </p>
              <div className="relative mt-5 min-h-48 overflow-hidden rounded-xl bg-linear-to-br from-violet-100 via-emerald-50 to-sky-50 ring-1 ring-violet-100">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_1px_1px,#94a3b8_1px,transparent_0)] bg-size-[18px_18px]" />
                <div className="relative flex h-full min-h-48 flex-col items-center justify-center gap-4 p-6">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm ring-1 ring-violet-100">
                      <MapPin className="size-3.5" aria-hidden />
                      Lancashire
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                      <MapPin className="size-3.5" aria-hidden />
                      Dewsbury
                    </span>
                  </div>
                  <p className="max-w-sm text-center text-xs font-medium text-slate-500">
                    Safe spaces across Lancashire and Dewsbury (Kirklees)
                  </p>
                </div>
              </div>
              <Link
                href="/how-we-can-help-you/local"
                className="mt-4 inline-flex text-sm font-black text-violet-700 transition hover:text-violet-900 hover:underline"
              >
                View locations via Local Services →
              </Link>
            </div>

            <aside className="flex flex-col rounded-xl border border-violet-100 bg-violet-50/80 p-5 shadow-[0_14px_34px_rgba(76,29,149,0.08)] sm:p-6">
              <h2 className="text-lg font-black text-slate-950">
                Need support or have a question?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Get in touch about Virtual Safe Spaces or promotional materials.
              </p>
              <div className="mt-4 space-y-3 text-xs text-slate-600">
                <a
                  href={`mailto:${VIRTUAL_CONTACTS.general.email}`}
                  className="flex items-start gap-2 font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>
                    <span className="block font-black text-slate-950">
                      {VIRTUAL_CONTACTS.general.name}
                    </span>
                    {VIRTUAL_CONTACTS.general.email}
                  </span>
                </a>
                <a
                  href={`mailto:${VIRTUAL_CONTACTS.promo.email}`}
                  className="flex items-start gap-2 font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>
                    <span className="block font-black text-slate-950">
                      {VIRTUAL_CONTACTS.promo.name}
                    </span>
                    {VIRTUAL_CONTACTS.promo.email}
                  </span>
                </a>
                <p className="flex items-center gap-2 font-semibold text-slate-500">
                  <Clock className="size-4 shrink-0" aria-hidden />
                  Virtual sessions: Fridays 9:00am – 12:30pm
                </p>
              </div>
              <Button
                asChild
                className="mt-auto h-10 w-full rounded-lg bg-violet-600 text-xs font-black text-white shadow-none hover:bg-violet-500"
              >
                <a href={`mailto:${VIRTUAL_CONTACTS.general.email}`}>
                  Get in touch
                </a>
              </Button>
            </aside>
          </section>

          {/* Recurring strip */}
          <section>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-lg font-black text-slate-950">
                Regular & recurring safe spaces
              </h2>
              <Link
                href="/how-we-can-help-you/local"
                className="text-xs font-black text-violet-700 transition hover:text-violet-900 hover:underline"
              >
                View all local groups →
              </Link>
            </div>
            {recurring.length > 0 ? (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {recurring.map((item) => (
                  <RecurringCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                No recurring groups for this filter.
              </p>
            )}
          </section>

          {/* Welcome CTA */}
          <section className="overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/80 px-6 py-8 sm:px-8 lg:px-10">
            <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr]">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white text-violet-600 shadow-sm ring-1 ring-violet-100">
                <HeartHandshake className="size-8" aria-hidden />
              </span>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  You are welcome here.
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                  Our safe spaces are open, non-judgemental, and supportive.
                  Wherever you are on your journey, you don&apos;t have to face
                  it alone.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}
