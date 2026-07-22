import Image from "next/image";
import { HERO_COPY, HERO_IMAGE } from "./timeline-data";

export default function EvolutionHero() {
  return (
    <section className="overflow-hidden rounded-2xl border border-violet-100 bg-linear-to-br from-violet-50 via-white to-violet-50/40 px-6 py-8 shadow-[0_20px_60px_rgba(76,29,149,0.06)] sm:px-8 lg:px-10 lg:py-10">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
            {HERO_COPY.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {HERO_COPY.title}
          </h1>
          <div
            className="mt-3 h-1.5 w-24 rounded-full bg-violet-600"
            aria-hidden
          />
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {HERO_COPY.description}
          </p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-violet-50/80 ring-1 ring-violet-100">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="object-contain p-4"
          />
        </div>
      </div>
    </section>
  );
}
