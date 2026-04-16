"use client";

import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type ProjectSectionCollapsibleProps = {
  title: string;
  open: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
  sectionClassName?: string;
  innerClassName?: string;
};

export default function ProjectSectionCollapsible({
  title,
  open,
  onOpenChange,
  children,
  sectionClassName = "py-16 md:py-20 border-t border-gray-200",
  innerClassName = "max-w-6xl mx-auto",
}: ProjectSectionCollapsibleProps) {
  return (
    <section className={sectionClassName}>
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <div className={innerClassName}>
          <CollapsibleTrigger className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 flex items-center justify-center gap-3 hover:text-gray-700 transition-colors cursor-pointer">
              {title}
              <ChevronDown
                className={`h-6 w-6 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </h2>
          </CollapsibleTrigger>
          <CollapsibleContent>{children}</CollapsibleContent>
        </div>
      </Collapsible>
    </section>
  );
}
