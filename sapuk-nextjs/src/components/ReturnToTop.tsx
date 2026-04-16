"use client";

import { Button } from "./ui/button";
import { ArrowUpIcon } from "lucide-react";
import { useScroll } from "@/hooks/useScroll";
import { useDynamicScrollThreshold } from "@/hooks/useDynamicScrollThreshold";

export default function ReturnToTop() {
  const dynamicThreshold = useDynamicScrollThreshold(30);
  const isScrolled = useScroll(dynamicThreshold);

  return (
    <Button
      variant="returnToTop"
      className={`fixed bottom-32 right-8 bg-footer text-secondary-foreground border border-zinc-100 transition-opacity duration-300 ${
        isScrolled
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUpIcon className="w-4 h-4" />
    </Button>
  );
}
