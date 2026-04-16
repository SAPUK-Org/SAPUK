import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students - SAP;UK",
  description: "Students for SAP;UK",
};

export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
