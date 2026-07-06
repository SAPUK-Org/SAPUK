import { Shield, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { sidebarItems } from "./suicidology-data";

export default function SuicidologySidebar() {
  return (
    <aside className="space-y-6">
      {sidebarItems.map((item, index) => {
        if (item.type === "why-matters") {
          return (
            <Card
              key={index}
              className="border-amber/30 bg-amber/40 p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber">
                <Users className="h-5 w-5 text-button-blue" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-zinc-900">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700">
                {item.content}
              </p>
            </Card>
          );
        }

        if (item.type === "quote") {
          return (
            <Card
              key={index}
              className="border-purple-card/20 bg-purple-card/15 p-6 shadow-sm"
            >
              <span
                className="mb-2 block text-4xl leading-none text-button-blue/40"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="text-sm leading-relaxed text-zinc-700 italic">
                {item.content}
              </p>
              <p className="mt-4 text-sm font-medium text-zinc-900">
                — {item.attribution}, {item.role}
              </p>
            </Card>
          );
        }

        return (
          <Card key={index} className="border-0 bg-background/50 p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-button-blue text-white">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-zinc-900">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-700">
              {item.content}
            </p>
          </Card>
        );
      })}
    </aside>
  );
}
