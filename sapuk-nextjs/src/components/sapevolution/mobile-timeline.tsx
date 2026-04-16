import { timelineData } from "./timeline-data";
import TimelineItem from "./timeline-item";

export default function MobileTimeline() {
  return (
    <div className="md:hidden space-y-8">
      {timelineData.map((item) => (
        <TimelineItem key={item.id} item={item} isMobile={true} />
      ))}
    </div>
  );
}
