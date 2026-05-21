import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { DewsburyGalleryCarousel } from "./DewsburyGalleryCarousel";
import { DewsburyUpcomingDatesCalendar } from "./DewsburyUpcomingDatesCalendar";

export default function DewsburyLocalServices() {
  return (
    <article className="space-y-10 md:space-y-12">
      <header className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Local services · Kirklees
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          Dewsbury
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-700">
          Weekly safe spaces, walks, board games, food pantries, and more —
          delivered by our Dewsbury volunteer team with SAPUK facilitators.
        </p>
        <p className="mt-5 text-sm text-zinc-600">
          Events can change, so check dates below or our{" "}
          <Link
            href="/how-we-can-help-you/projects"
            className="font-medium text-link hover:underline"
          >
            Projects
          </Link>{" "}
          page for wider listings.
        </p>
      </header>

      <DewsburyGalleryCarousel />

      <section
        id="dates-coming-up"
        className="scroll-mt-24 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm md:p-8"
      >
        <div className="mb-6 flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
            <CalendarDays className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">
              Dates coming up
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Use the calendar to explore each day, or browse the list of
              confirmed and TBC events.
            </p>
          </div>
        </div>
        <DewsburyUpcomingDatesCalendar />
      </section>
    </article>
  );
}
