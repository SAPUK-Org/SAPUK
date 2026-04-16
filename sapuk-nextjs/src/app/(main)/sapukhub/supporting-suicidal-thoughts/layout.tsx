import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supporting Someone with Suicidal Thoughts - SAP;UK",
  description: "Supporting Someone with Suicidal Thoughts for SAP;UK",
};

export default function SupportingSuicidalThoughtsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
