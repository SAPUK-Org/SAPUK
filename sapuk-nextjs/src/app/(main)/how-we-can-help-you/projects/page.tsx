"use client";

import { useState } from "react";
import ProjectSectionCollapsible from "@/components/projects/ProjectSectionCollapsible";
import SemicolonProjectSection from "@/components/projects/semicolon-project/SemicolonProjectSection";
import IdkaeSection from "@/components/projects/idkae/IdkaeSection";
import SafeSpacesSection from "@/components/projects/safe-spaces/SafeSpacesSection";
import SemicolonFestSection from "@/components/projects/semicolon-fest/SemicolonFestSection";
import SuicidologySeminarSection from "@/components/projects/suicidology-seminar/SuicidologySeminarSection";
import FoodPantrySection from "@/components/projects/food-pantry/FoodPantrySection";

export default function ProjectsPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    semicolonProject: true,
    idkae: false,
    safeSpaces: false,
    semicolonFest: false,
    suicidologySeminar: false,
    foodPantry: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <section className="px-4">
      <div className="container mx-auto max-w-7xl">
        <ProjectSectionCollapsible
          title="The Semicolon Project"
          open={openSections.semicolonProject}
          onOpenChange={() => toggleSection("semicolonProject")}
          sectionClassName="py-16 md:py-20 border-t border-zinc-800 first:border-t-0"
        >
          <SemicolonProjectSection />
        </ProjectSectionCollapsible>

        <ProjectSectionCollapsible
          title="I Don't Know Anybody Either"
          open={openSections.idkae}
          onOpenChange={() => toggleSection("idkae")}
          sectionClassName="py-16 md:py-20 border-t border-zinc-800 first:border-t-0"
          innerClassName="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8"
        >
          <IdkaeSection />
        </ProjectSectionCollapsible>

        <ProjectSectionCollapsible
          title="Safe Spaces"
          open={openSections.safeSpaces}
          onOpenChange={() => toggleSection("safeSpaces")}
          sectionClassName="py-16 md:py-20 border-t border-zinc-800 first:border-t-0"
          innerClassName="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <SafeSpacesSection />
        </ProjectSectionCollapsible>

        <ProjectSectionCollapsible
          title="The Semicolon Fest"
          open={openSections.semicolonFest}
          onOpenChange={() => toggleSection("semicolonFest")}
          sectionClassName="py-16 md:py-20 border-t border-zinc-800 first:border-t-0"
          innerClassName="max-w-6xl mx-auto px-4"
        >
          <SemicolonFestSection />
        </ProjectSectionCollapsible>

        <ProjectSectionCollapsible
          title="Suicidology Seminar"
          open={openSections.suicidologySeminar}
          onOpenChange={() => toggleSection("suicidologySeminar")}
          sectionClassName="py-16 md:py-20 border-t border-zinc-800 first:border-t-0"
          innerClassName="max-w-6xl mx-auto px-4"
        >
          <SuicidologySeminarSection />
        </ProjectSectionCollapsible>

        <ProjectSectionCollapsible
          title="The Food Pantry"
          open={openSections.foodPantry}
          onOpenChange={() => toggleSection("foodPantry")}
          sectionClassName="py-16 md:py-20 border-t border-zinc-800 first:border-t-0"
        >
          <FoodPantrySection />
        </ProjectSectionCollapsible>
      </div>
    </section>
  );
}
