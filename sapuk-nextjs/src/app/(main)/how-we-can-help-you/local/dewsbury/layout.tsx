import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dewsbury (Kirklees) - SAP;UK",
  description:
    "SAPUK local services in Dewsbury and Kirklees: safe spaces, walk and talk, board game club, food pantries, and virtual safe space.",
};

export default function DewsburyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
