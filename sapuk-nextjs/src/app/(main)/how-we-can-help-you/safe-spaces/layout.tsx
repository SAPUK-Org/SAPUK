import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safe Spaces - SAP;UK",
  description:
    "Find SAPUK Safe Spaces online and in person — Virtual Safe Spaces across the UK, plus local support in Lancashire and Dewsbury.",
};

export default function SafeSpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
