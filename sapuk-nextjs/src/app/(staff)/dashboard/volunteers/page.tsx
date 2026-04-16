"use client";

import { useAuth } from "@/contexts/AuthContext";
import { StaffManagement } from "@/components/dashboard/staff";

export default function StaffPage() {
  const { user, token } = useAuth();

  return (
    <div className="flex flex-col bg-background px-6">
      {user?.role === "admin" && token && <StaffManagement token={token} />}
    </div>
  );
}
