"use client";

import { LogsTable } from "@/components/dashboard/logs";

export default function LogsPage() {
  return (
    <div className="flex flex-col bg-background px-6 py-4">
      <LogsTable />
    </div>
  );
}
