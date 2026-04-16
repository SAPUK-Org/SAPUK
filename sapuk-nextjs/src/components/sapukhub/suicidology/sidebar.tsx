import { sidebarCards } from "./suicidology-data";

export default function SuicidologySidebar() {
  return (
    <div className="space-y-8">
      {sidebarCards.map((card, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <p className="text-gray-700 leading-relaxed">{card.content}</p>
        </div>
      ))}
    </div>
  );
}
