import { Heart, Star, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Stat {
  icon: React.ElementType;
  label: string;
  value: string;
}

const STATS: Stat[] = [
  { icon: Users, label: "Team Members", value: "36" },
  { icon: Heart, label: "Volunteers", value: "100+" },
  { icon: Star, label: "Core Team", value: "8" },
];

export default function TeamStatsBar() {
  return (
    <div className="flex flex-wrap gap-3">
      {STATS.map(({ icon: Icon, label, value }) => (
        <Card
          key={label}
          className="min-w-[140px] flex-1 border-zinc-200 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.15)]"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-zinc-700">{label}</span>
              <Icon className="h-4 w-4 shrink-0 text-button-blue" />
            </div>
            <span className="text-2xl font-bold text-zinc-900">{value}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
