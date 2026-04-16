import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Healing Checklist - SAP;UK",
  description: "My Healing Checklist for SAP;UK",
};

export default function SaphealsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
