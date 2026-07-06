import {
  Briefcase,
  Clock,
  Heart,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { SuicidologyContentSection } from "./suicidology-data";

const iconMap: Record<string, LucideIcon> = {
  "help-circle": HelpCircle,
  clock: Clock,
  briefcase: Briefcase,
  heart: Heart,
};

type SuicidologySectionProps = {
  section: SuicidologyContentSection;
  isLast?: boolean;
};

export default function SuicidologySection({
  section,
  isLast = false,
}: SuicidologySectionProps) {
  const Icon = iconMap[section.icon] ?? HelpCircle;
  const isHighlight = section.variant === "highlight";

  if (isHighlight) {
    return (
      <section className="rounded-2xl bg-purple-card/20 p-6 sm:p-8">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-button-blue text-white">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
            {section.number}. {section.title}
          </h2>
        </div>
        <div className="space-y-4 pl-0 sm:pl-14">
          {section.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-zinc-600 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
          {section.cta && (
            <p className="text-base font-bold text-button-blue sm:text-lg">
              {section.cta}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber">
          <Icon className="h-5 w-5 text-button-blue" />
        </div>
        <div className="min-w-0 flex-1 space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
            {section.number}. {section.title}
          </h2>
          {section.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-zinc-600 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      {!isLast && <hr className="mt-8 border-zinc-200" />}
    </section>
  );
}
