import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - SAP;UK",
  description: "Dashboard - SAP;UK",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
