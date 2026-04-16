import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAP Family - SAP;UK",
  description: "SAP Family - SAP;UK",
};

export default function SapFamilyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
