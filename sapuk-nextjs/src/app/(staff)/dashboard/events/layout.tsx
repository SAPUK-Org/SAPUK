import React from "react";

interface EventsLayoutProps {
  children: React.ReactNode;
}

export default function EventsLayout({ children }: EventsLayoutProps) {
  return <div className="space-y-6">{children}</div>;
}
