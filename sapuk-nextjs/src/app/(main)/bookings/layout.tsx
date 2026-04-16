import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookings - SAP;UK",
  description: "Bookings for SAP;UK",
};

export default function BookingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
