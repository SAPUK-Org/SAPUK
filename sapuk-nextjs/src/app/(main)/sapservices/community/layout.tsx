import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community - SAP;UK",
  description: "Community - SAP;UK",
};

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
