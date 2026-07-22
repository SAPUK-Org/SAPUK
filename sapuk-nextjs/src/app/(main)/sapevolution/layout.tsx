import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Beginning of SAPUK - SAP;UK",
  description:
    "Every step, every conversation, every life reached — the story of how SAPUK began and continues to grow.",
};

export default function SapEvolutionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
