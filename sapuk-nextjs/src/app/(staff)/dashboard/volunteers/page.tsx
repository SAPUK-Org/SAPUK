"use client";

import { useAuth } from "@/contexts/AuthContext";
import { StaffManagement } from "@/components/dashboard/staff";

export default function StaffPage() {
  const { user, token } = useAuth();

  if (user?.role !== "admin" || !token) {
    return null;
  }

  return <StaffManagement token={token} />;
}
