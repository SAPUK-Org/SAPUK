import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - SAP;UK",
  description: "Contact Us - SAP;UK",
};

export default function ContactUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
