import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fundraise for SAP;UK",
  description: "Fundraise for SAP;UK",
};

export default function FundraiseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
