"use client";

import { RearrangeableGrid } from "@/components/dashboard/RearrangeableGrid";
import { CrisisContactsCard } from "@/components/dashboard/CrisisContactsCard";
import { UsefulLinksCard } from "@/components/dashboard/UsefulLinksCard";
import { ResourceLibraryCard } from "@/components/dashboard/ResourceLibraryCard";
import { QuickNotesCard } from "@/components/dashboard/QuickNotesCard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background p-6">
      <div className="mb-8">
        <RearrangeableGrid
          cards={[
            {
              id: "crisis",
              component: <CrisisContactsCard />,
              colSpan: "",
            },
            {
              id: "links",
              component: <UsefulLinksCard />,
              colSpan: "",
            },
            {
              id: "resources",
              component: <ResourceLibraryCard />,
              colSpan: "",
            },
            {
              id: "notes",
              component: <QuickNotesCard />,
              colSpan: "",
            },
          ]}
          defaultOrder={["notes", "crisis", "links", "resources"]}
        />
      </div>
    </div>
  );
}
