import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CTA_COPY } from "./timeline-data";

export default function EvolutionCta() {
  return (
    <section className="rounded-2xl bg-footer px-6 py-8 text-white sm:px-8 sm:py-10">
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <HeartHandshake className="size-7 text-white" aria-hidden />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold sm:text-2xl">{CTA_COPY.title}</h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              {CTA_COPY.description}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            asChild
            className="w-full border-yellow-400 bg-yellow-400 font-bold text-slate-950 hover:bg-yellow-300 sm:w-auto"
          >
            <Link href="/donate">Donate Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-white/70 bg-transparent font-bold text-white hover:bg-white/10 hover:text-white sm:w-auto"
          >
            <Link href="/volunteer">Get Involved</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
