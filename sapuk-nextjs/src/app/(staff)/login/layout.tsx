import React from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-button-blue via-button-blue/90 to-primary">
      {children}
    </div>
  );
}
