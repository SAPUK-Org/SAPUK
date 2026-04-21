import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Donate to Us? - SAP;UK",
  description: "Why Donate to Us? - SAP;UK",
};

export default function WhyDonateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
