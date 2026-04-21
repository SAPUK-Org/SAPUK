import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloadable Media - SAP;UK",
  description: "Downloadable Media - SAP;UK",
};

export default function DownloadableMediaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
