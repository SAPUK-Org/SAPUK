import React from "react";

interface LogsLayoutProps {
  children: React.ReactNode;
}

export default function LogsLayout({ children }: LogsLayoutProps) {
  return <div>{children}</div>;
}
