import {
  Clock,
  Heart,
  MessageCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import { evolutionStats, type EvolutionStat } from "./timeline-data";

const STAT_ICONS: Record<EvolutionStat["icon"], LucideIcon> = {
  users: Users,
  messages: MessageCircle,
  heart: Heart,
  clock: Clock,
};

export default function EvolutionStats() {
  return (
    <section
      className="rounded-2xl bg-violet-50 px-6 py-10 sm:px-8 lg:px-10"
      aria-label="SAPUK impact at a glance"
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {evolutionStats.map((stat) => {
          const Icon = STAT_ICONS[stat.icon];
          return (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-white text-violet-700 ring-1 ring-violet-100">
                <Icon className="size-6" aria-hidden />
              </span>
              <p className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 max-w-[12rem] text-xs leading-relaxed text-slate-600 sm:text-sm">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
