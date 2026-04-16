import { ReactNode } from "react";

interface ResourcesLayoutProps {
  children: ReactNode;
}

export default function ResourcesLayout({ children }: ResourcesLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background p-6">
      {children}
    </div>
  );
}
