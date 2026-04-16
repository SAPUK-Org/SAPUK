import Image from "next/image";

interface TimelineIconProps {
  size?: "small" | "large";
}

export default function TimelineIcon({ size = "small" }: TimelineIconProps) {
  const iconSize = size === "large" ? "w-14 h-14" : "w-12 h-12";
  const imageSize = size === "large" ? 56 : 48;

  return (
    <div
      className={`z-20 flex items-center bg-cyan-bluish-gray shadow-inner shadow-black ${iconSize} rounded-full`}
    >
      <Image
        src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwqOpDZaF5N5weoZT7nX0E83VGLBvSPJhs94i6"
        alt="timelineicon"
        width={imageSize}
        height={imageSize}
        className="rounded-full pointer-events-none select-none"
        priority
      />
    </div>
  );
}
