import Link from "next/link";
import {
  HandHeart,
  Heart,
  MapPin,
  MessagesSquare,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import GuidanceCard, { BulletList } from "./GuidanceCard";
import {
  conversationSection,
  firstStepsSection,
  selfCareSection,
  supportSection,
  understandingSection,
} from "./supporting-data";

export default function GuidanceContent() {
  return (
    <div className="space-y-6">
      <GuidanceCard
        title={understandingSection.title}
        body={understandingSection.body}
        icon={Heart}
        variant="neutral"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <GuidanceCard
          title={firstStepsSection.title}
          body={firstStepsSection.intro}
          icon={Shield}
          variant="sky"
        >
          <BulletList bullets={firstStepsSection.bullets} />
        </GuidanceCard>

        <GuidanceCard
          title={conversationSection.title}
          body={conversationSection.intro}
          icon={MessagesSquare}
          variant="purple"
        >
          <BulletList bullets={conversationSection.bullets} />
        </GuidanceCard>
      </div>

      <GuidanceCard title={supportSection.title} body={supportSection.body} variant="white">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            {supportSection.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors",
                  link.variant === "primary"
                    ? "bg-violet-600 text-white hover:bg-violet-500"
                    : "border border-zinc-200 bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-card/20 sm:flex">
            <MapPin className="h-7 w-7 text-button-blue" />
          </div>
        </div>
      </GuidanceCard>

      <div className="flex gap-4 rounded-2xl border border-amber/30 bg-amber/40 p-6 sm:p-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber">
          <HandHeart className="h-6 w-6 text-button-blue" />
        </div>
        <p className="text-sm leading-relaxed text-zinc-700 sm:text-base">
          {selfCareSection.body}
        </p>
      </div>
    </div>
  );
}
