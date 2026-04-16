import { timelineData } from "./timeline-data";
import TimelineItem from "./timeline-item";

export default function DesktopTimeline() {
  return (
    <div className="hidden md:block relative">
      {/* Center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full"></div>

      {timelineData.map((item, index) => (
        <TimelineItem key={item.id} item={item} isMobile={false} />
      ))}
    </div>
  );
}
