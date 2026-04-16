import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer - SAP;UK",
  description: "Volunteer for SAP;UK",
};

export default function VolunteerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
