import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter - SAP;UK",
  description: "Newsletter for SAP;UK",
};

export default function NewsletterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
