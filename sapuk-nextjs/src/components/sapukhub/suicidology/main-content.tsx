import { contentSections } from "./suicidology-data";
import SuicidologySection from "./SuicidologySection";

export default function MainContent() {
  return (
    <div className="space-y-8 lg:col-span-2">
      {contentSections.map((section, index) => (
        <SuicidologySection
          key={section.number}
          section={section}
          isLast={index === contentSections.length - 1}
        />
      ))}
    </div>
  );
}
