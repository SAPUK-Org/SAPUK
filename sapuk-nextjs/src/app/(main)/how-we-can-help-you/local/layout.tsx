import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Services - SAP;UK",
  description:
    "Find SAPUK programmes and support near you, including safe spaces and community events.",
};

export default function LocalServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
