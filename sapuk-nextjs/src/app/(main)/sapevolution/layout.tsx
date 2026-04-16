import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAP Evolution - SAP;UK",
  description: "SAP Evolution - SAP;UK",
};

export default function SapEvolutionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
