import Image from "next/image";
import type { ComponentType, ReactNode } from "react";
import {
  Brush,
  CalendarDays,
  ChevronRight,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { LancashireUpcomingDatesCalendar } from "./LancashireUpcomingDatesCalendar";
import {
  LANCASHIRE_COMMUNITY_HIGHLIGHTS,
  LANCASHIRE_RECURRING_SERVICES,
  type LancashireAccent,
  type LancashireRecurringService,
} from "./lancashire-upcoming-events";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LANCASHIRE_EMAIL = "lancashireoffice@suicideapuk.co.uk";
const MAILTO = `mailto:${LANCASHIRE_EMAIL}`;

const accentStyles: Record<
  LancashireAccent,
  {
    icon: string;
    surface: string;
    ring: string;
  }
> = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    surface: "bg-blue-50",
    ring: "ring-blue-100",
  },
  green: {
    icon: "bg-emerald-50 text-emerald-600",
    surface: "bg-emerald-50",
    ring: "ring-emerald-100",
  },
  amber: {
    icon: "bg-amber-50 text-amber-700",
    surface: "bg-amber-50",
    ring: "ring-amber-100",
  },
  rose: {
    icon: "bg-rose-50 text-rose-600",
    surface: "bg-rose-50",
    ring: "ring-rose-100",
  },
  purple: {
    icon: "bg-violet-50 text-violet-600",
    surface: "bg-violet-50",
    ring: "ring-violet-100",
  },
};

const summaryChips = [
  {
    title: "Local support",
    detail: "People who understand",
    icon: HeartHandshake,
  },
  {
    title: "Safe & inclusive",
    detail: "Everyone is welcome",
    icon: ShieldCheck,
  },
  {
    title: "Get involved",
    detail: "Volunteer or take part",
    icon: UsersRound,
  },
] as const;

const serviceIcons = {
  shield: ShieldCheck,
  semicolon: Sparkles,
  walk: MessageCircleHeart,
  art: Brush,
} as const;

function SectionHeading({
  id,
  icon: Icon,
  children,
}: {
  id: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: ReactNode;
}) {
  return (
    <div id={id} className="flex scroll-mt-28 items-center gap-3">
      <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
        <Icon className="size-4" aria-hidden />
      </span>
      <h2 className="text-lg font-bold text-slate-950">{children}</h2>
    </div>
  );
}

function ContactCard({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={cn(
        "rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]",
        compact
          ? "bg-violet-50/70 shadow-[0_14px_34px_rgba(76,29,149,0.08)]"
          : "",
      )}
    >
      <h2 className="text-sm font-black text-slate-950">
        {compact ? "Need help or have a question?" : "Lancashire at a glance"}
      </h2>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        {compact
          ? "Our Lancashire team is here to help you find the right support or activity."
          : "Covering Lancashire communities including Preston, Lancaster, Burnley, Blackburn, Leyland and more."}
      </p>
      <div className="mt-4 flex flex-col gap-3 text-xs text-slate-600">
        <a
          href={MAILTO}
          className="flex min-w-0 items-center gap-2 font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
        >
          <Mail className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{LANCASHIRE_EMAIL}</span>
        </a>
        <p className="flex items-center gap-2">
          <UsersRound className="size-4 shrink-0 text-slate-400" aria-hidden />
          Everyone welcome
        </p>
      </div>
      <Button
        asChild
        className="mt-5 h-10 w-full rounded-lg bg-violet-600 text-xs font-black text-white shadow-none hover:bg-violet-500"
      >
        <a href={MAILTO}>Get in touch</a>
      </Button>
    </aside>
  );
}

function RecurringServiceCard({
  service,
}: {
  service: LancashireRecurringService;
}) {
  const Icon = serviceIcons[service.icon];
  const styles = accentStyles[service.accent];

  return (
    <article
      id={
        service.icon === "semicolon"
          ? "semicolon-project"
          : service.icon === "walk"
            ? "talk-walk"
            : service.icon === "art"
              ? "art-week"
              : undefined
      }
      className="scroll-mt-28 rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
    >
      <span
        className={cn(
          "mb-4 flex size-11 items-center justify-center rounded-full ring-1",
          styles.icon,
          styles.ring,
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {service.category}
      </p>
      <h3 className="mt-1 text-base font-black text-slate-950">
        {service.title}
      </h3>
      <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-slate-600">
        {service.detail}
      </p>
      <dl className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <div>
          <dt className="font-bold text-slate-700">When</dt>
          <dd>{service.schedule}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-700">Where</dt>
          <dd>{service.location}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function LancashireLocalServices() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const visibleCommunityHighlights = LANCASHIRE_COMMUNITY_HIGHLIGHTS.filter(
    (highlight) => !highlight.eventDate || highlight.eventDate >= today,
  );

  return (
    <article id="lancashire-top" className="flex flex-col gap-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-slate-200/70 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-8 lg:px-10 lg:py-9">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Lancashire
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Welcome to our Lancashire local services hub. Here you&apos;ll
              find support, safe spaces, projects and community activities
              across the county.
            </p>
          </div>

          <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
            {summaryChips.map(({ title, detail, icon: Icon }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-black text-slate-950">{title}</p>
                  <p className="text-[11px] font-medium text-slate-500">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Image
            src="/local/lancashire-hero.png"
            alt=""
            width={887}
            height={444}
            priority
            className="pointer-events-none absolute bottom-0 right-0 h-full w-[58%] object-cover object-right-bottom opacity-[0.55] [mask-image:linear-gradient(to_right,transparent,black_48%)]"
          />
        </div>

        <ContactCard />
      </section>

      <section
        id="upcoming-dates"
        className="scroll-mt-28 rounded-lg border border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 lg:p-6"
      >
        <LancashireUpcomingDatesCalendar />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start">
        <div className="min-w-0">
          <SectionHeading id="regular-groups" icon={CalendarDays}>
            Regular & recurring
          </SectionHeading>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {LANCASHIRE_RECURRING_SERVICES.map((service) => (
              <RecurringServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>

        <div className="lg:pt-14">
          <ContactCard compact />
        </div>
      </section>

      <section>
        <SectionHeading id="community-highlights" icon={Sparkles}>
          Other events & community highlights
        </SectionHeading>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {visibleCommunityHighlights.map((highlight) => {
            const styles = accentStyles[highlight.accent];

            return (
              <article
                key={highlight.title}
                className="flex items-center gap-4 rounded-lg border border-slate-200/80 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"
              >
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-lg ring-1",
                    styles.surface,
                    styles.ring,
                  )}
                >
                  <MapPin className="size-5 text-slate-700" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-slate-950">
                    {highlight.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-500">
                    {highlight.date}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {highlight.detail}
                  </p>
                </div>
                <ChevronRight
                  className="ml-auto size-4 shrink-0 text-slate-300"
                  aria-hidden
                />
              </article>
            );
          })}
        </div>
      </section>
    </article>
  );
}
