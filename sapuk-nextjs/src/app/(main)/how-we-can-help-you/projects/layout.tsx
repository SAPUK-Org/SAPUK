import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - SAP;UK",
  description: "Projects - SAP;UK",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
