import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type GuidanceCardVariant = "neutral" | "sky" | "purple" | "white";

const variantStyles: Record<
  GuidanceCardVariant,
  { card: string; icon: string; iconColor: string; title: string }
> = {
  neutral: {
    card: "border-zinc-200 bg-white",
    icon: "bg-zinc-100",
    iconColor: "text-button-blue",
    title: "text-zinc-900",
  },
  sky: {
    card: "border-sky-100 bg-sky-50",
    icon: "bg-sky-100",
    iconColor: "text-sky-700",
    title: "text-sky-900",
  },
  purple: {
    card: "border-purple-card/20 bg-purple-card/10",
    icon: "bg-purple-card/20",
    iconColor: "text-button-blue",
    title: "text-zinc-900",
  },
  white: {
    card: "border-zinc-200 bg-white",
    icon: "bg-purple-card/20",
    iconColor: "text-button-blue",
    title: "text-zinc-900",
  },
};

type GuidanceCardProps = {
  title: string;
  body?: string;
  icon?: LucideIcon;
  variant?: GuidanceCardVariant;
  className?: string;
  children?: React.ReactNode;
};

export default function GuidanceCard({
  title,
  body,
  icon: Icon,
  variant = "neutral",
  className,
  children,
}: GuidanceCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card className={cn("rounded-2xl p-6 shadow-sm sm:p-8", styles.card, className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {Icon && (
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
              styles.icon,
            )}
          >
            <Icon className={cn("h-6 w-6", styles.iconColor)} />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-3">
          <h2 className={cn("text-xl font-bold sm:text-2xl", styles.title)}>
            {title}
          </h2>
          {body && (
            <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
              {body}
            </p>
          )}
          {children}
        </div>
      </div>
    </Card>
  );
}

export function BulletList({ bullets }: { bullets: { before: string; bold?: string; after?: string }[] }) {
  return (
    <ul className="mt-2 space-y-2 text-sm text-zinc-700 sm:text-base">
      {bullets.map((bullet, index) => (
        <li key={index} className="flex gap-2 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-button-blue" />
          <span>
            {bullet.before}
            {bullet.bold && (
              <span className="font-semibold text-zinc-900">{bullet.bold}</span>
            )}
            {bullet.after}
          </span>
        </li>
      ))}
    </ul>
  );
}
