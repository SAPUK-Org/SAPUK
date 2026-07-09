import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs & Community - SAP;UK",
  description:
    "SAPUK community features, founder blog links, submissions, and newsletter signup.",
};

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
