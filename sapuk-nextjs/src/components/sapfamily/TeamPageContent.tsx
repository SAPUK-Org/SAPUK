"use client";

import { useCallback, useState } from "react";
import { MorphTabs } from "@/components/ui/morph-tabs";
import SapFamilyHero from "./hero";
import TeamSections from "./team-sections";
import {
  TEAM_TAB_LABELS,
  teamTabFromLabel,
  teamTabLabel,
  type TeamTab,
} from "./constants";

export default function TeamPageContent() {
  const [activeTab, setActiveTab] = useState<TeamTab>("all");

  const handleViewAll = useCallback((tab: TeamTab) => {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      document
        .getElementById(`team-${tab}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <>
      <SapFamilyHero />
      <div className="mt-12 space-y-12">
        <MorphTabs
          tabs={TEAM_TAB_LABELS}
          active={teamTabLabel(activeTab)}
          onActiveChange={(label) => setActiveTab(teamTabFromLabel(label))}
          className="w-full"
          glowColor="rgb(129 140 248)"
          glowIntensity="strong"
        />
        <TeamSections activeTab={activeTab} onViewAll={handleViewAll} />
      </div>
    </>
  );
}
