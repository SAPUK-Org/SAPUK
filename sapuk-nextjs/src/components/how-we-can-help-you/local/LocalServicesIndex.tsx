import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { localRegions, type LocalRegion } from "./local-regions-data";

const visibleRegions = localRegions.filter((region) => region.available);

const heroChips = [
  {
    label: `${visibleRegions.length} local areas`,
    detail: "Choose the team nearest to you",
    icon: MapPin,
  },
  {
    label: "Safe & inclusive",
    detail: "Everyone is welcome",
    icon: ShieldCheck,
  },
  {
    label: "Community support",
    detail: "Groups, events and activities",
    icon: HeartHandshake,
  },
] as const;

const accentStyles: Record<
  LocalRegion["accent"],
  {
    icon: string;
    ring: string;
    imageGlow: string;
    link: string;
  }
> = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    ring: "ring-blue-100",
    imageGlow: "from-blue-50",
    link: "text-blue-700 group-hover:text-blue-900",
  },
  purple: {
    icon: "bg-violet-50 text-violet-600",
    ring: "ring-violet-100",
    imageGlow: "from-violet-50",
    link: "text-violet-700 group-hover:text-violet-900",
  },
};

function RegionCard({ region }: { region: LocalRegion }) {
  const styles = accentStyles[region.accent];

  return (
    <li>
      <Link
        href={`/how-we-can-help-you/local/${region.slug}`}
        className="group grid h-full overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_22px_54px_rgba(15,23,42,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 md:grid-rows-[12.5rem_1fr]"
      >
        <div className="relative min-h-48 overflow-hidden bg-slate-100">
          <Image
            src={region.image.src}
            alt={region.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent",
              styles.imageGlow,
            )}
          />
        </div>

        <div className="flex h-full flex-col p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-full ring-1",
                styles.icon,
                styles.ring,
              )}
            >
              <MapPin className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {region.coverage}
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                {region.name}
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                {region.area}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-600">
            {region.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {region.services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600"
              >
                {service}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
              <CalendarDays className="size-4 text-slate-400" aria-hidden />
              {region.availability}
            </div>
            <div
              className={cn(
                "mt-4 inline-flex items-center gap-2 text-sm font-black transition",
                styles.link,
              )}
            >
              View local services
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default function LocalServicesIndex() {
  return (
    <section className="bg-white px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <article className="flex flex-col gap-8">
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-start">
            <div className="relative overflow-hidden rounded-lg border border-slate-200/70 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-8 lg:px-10 lg:py-9">
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Local services
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Find SAPUK programmes and support near you. Choose your area
                  to see safe spaces, groups, walks, community events and
                  practical support.
                </p>
              </div>

              <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
                {heroChips.map(({ label, detail, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-black text-slate-950">
                        {label}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500">
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute -bottom-16 -right-20 hidden h-64 w-80 rounded-tl-[9rem] bg-violet-50/70 sm:block" />
            </div>

            <aside className="rounded-lg border border-slate-200/80 bg-violet-50/70 p-5 shadow-[0_14px_34px_rgba(76,29,149,0.08)]">
              <span className="flex size-10 items-center justify-center rounded-full bg-white text-violet-600 ring-1 ring-violet-100">
                <UsersRound className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-sm font-black text-slate-950">
                Not sure where to start?
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                Start with the local team closest to you. Each page shows what
                is available, how to get in touch and any confirmed upcoming
                dates.
              </p>
              <Button
                asChild
                className="mt-5 h-10 w-full rounded-lg bg-amber-400 text-xs font-black text-slate-950 shadow-none hover:bg-amber-300"
              >
                <a href="#local-areas">View areas</a>
              </Button>
            </aside>
          </section>

          <section id="local-areas" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Sparkles className="size-4" aria-hidden />
              </span>
              <h2 className="text-lg font-bold text-slate-950">
                Choose your local area
              </h2>
            </div>

            <ul className="mt-5 grid gap-5 md:grid-cols-2">
              {visibleRegions.map((region) => (
                <RegionCard key={region.slug} region={region} />
              ))}
            </ul>
          </section>

          <section className="grid gap-4 rounded-lg border border-slate-200/80 bg-slate-50/60 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
            <div>
              <h2 className="text-base font-black text-slate-950">
                Local support is growing
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                We add new local pages as teams, volunteers and confirmed
                activities become available. For general questions, contact the
                team for your nearest area.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
              {visibleRegions.map((region) => (
                <a
                  key={region.email}
                  href={`mailto:${region.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-violet-800 hover:underline"
                >
                  <Mail className="size-4 text-slate-400" aria-hidden />
                  {region.email}
                </a>
              ))}
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}
