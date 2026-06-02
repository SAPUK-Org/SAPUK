import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lancashire local services | SAPUK",
  description:
    "SAPUK Lancashire outreach: safe spaces, walk and talk, Longridge days out, art week, and community events across Lancashire.",
};

export default function LancashireLocalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
