"use client";

import { MorphTabs } from "@/components/ui/morph-tabs";
import type { ProjectsFilter } from "./projects-utils";

type ProjectsFilterTabsProps = {
  value: ProjectsFilter;
  onChange: (value: ProjectsFilter) => void;
  counts: { all: number; events: number; projects: number };
};

const FILTER_LABELS: Record<ProjectsFilter, string> = {
  all: "All",
  events: "Events",
  projects: "Projects",
};

function toTabLabel(filter: ProjectsFilter, counts: ProjectsFilterTabsProps["counts"]) {
  return `${FILTER_LABELS[filter]} (${counts[filter]})`;
}

function fromTabLabel(label: string): ProjectsFilter {
  if (label.startsWith("Projects")) return "projects";
  if (label.startsWith("Events")) return "events";
  return "all";
}

export default function ProjectsFilterTabs({
  value,
  onChange,
  counts,
}: ProjectsFilterTabsProps) {
  const tabLabels = (["all", "events", "projects"] as const).map((filter) =>
    toTabLabel(filter, counts),
  );

  return (
    <MorphTabs
      tabs={tabLabels}
      active={toTabLabel(value, counts)}
      onActiveChange={(label) => onChange(fromTabLabel(label))}
      className="w-full"
      size="lg"
      glowColor="rgb(86 65 156)"
      glowIntensity="subtle"
    />
  );
}
