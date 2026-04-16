import Image from "next/image";
import { TimelineItem as TimelineItemType } from "./timeline-data";
import TimelineIcon from "./timeline-icon";

interface TimelineItemProps {
  item: TimelineItemType;
  isMobile?: boolean;
}

export default function TimelineItem({
  item,
  isMobile = false,
}: TimelineItemProps) {
  const contentClasses = isMobile
    ? "bg-zinc-200 rounded-lg shadow-xl p-6 mb-8"
    : "w-5/12 bg-zinc-200 rounded-lg shadow-xl p-6";

  const titleClasses = isMobile
    ? "mb-3 font-bold text-gray-800 text-xl"
    : "mb-3 font-bold text-gray-800 text-2xl";

  const contentTextClasses = isMobile
    ? "text-base leading-relaxed text-gray-900"
    : "text-lg leading-relaxed text-gray-900";

  const imageSize = isMobile ? 300 : 400;

  if (isMobile) {
    return (
      <div className="relative">
        <div className={contentClasses}>
          <h3 className={titleClasses}>{item.title}</h3>
          <p className={contentTextClasses}>{item.content}</p>
        </div>
        <div className="flex justify-center">
          <TimelineIcon size="small" />
        </div>
        <div className="flex justify-center">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt}
            width={imageSize}
            height={imageSize}
            className="rounded-lg pointer-events-none select-none"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center w-full mb-16">
      <div className="w-5/12">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          width={imageSize}
          height={imageSize}
          className="rounded-lg pointer-events-none select-none"
          priority
        />
      </div>
      <TimelineIcon size="large" />
      <div className={contentClasses}>
        <h3 className={titleClasses}>{item.title}</h3>
        <p className={contentTextClasses}>{item.content}</p>
      </div>
    </div>
  );
}
