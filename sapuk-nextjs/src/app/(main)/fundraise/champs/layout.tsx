import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fundraising Champs - SAP;UK",
  description:
    "Meet the individuals and businesses who have independently raised funds for SAP;UK.",
};

export default function FundraisingChampsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
