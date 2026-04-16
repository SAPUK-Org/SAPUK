import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suicidology - SAP;UK",
  description: "Suicidology for SAP;UK",
};

export default function SuicidologyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
