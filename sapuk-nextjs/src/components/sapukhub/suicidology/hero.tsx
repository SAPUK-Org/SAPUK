import { mainSections } from "./suicidology-data";

export default function SuicidologyHero() {
  return (
    <div className="space-y-4 mb-16">
      {mainSections.map((section, index) => (
        <div key={index}>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {section.title}
          </h1>
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            {section.content}
          </h2>
        </div>
      ))}
    </div>
  );
}
