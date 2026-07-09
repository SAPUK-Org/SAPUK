import Image from "next/image";
import { HandHeart, Heart2, People2 } from "reicon-react";

const HERO_IMAGE_URL =
  "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNXx0NuK2tn5dJxjXN6oFMAGrgBT1Yc8qbLwWC";

const features = [
  {
    icon: Heart2,
    label: "Safe & welcoming spaces",
    color: "#7c3aed",
  },
  {
    icon: People2,
    label: "Community connection",
    color: "#f59e0b",
  },
  {
    icon: HandHeart,
    label: "Support for mental well-being",
    color: "#059669",
  },
] as const;

export default function ProjectsHero() {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(300px,440px)] lg:gap-12 xl:grid-cols-[1fr_minmax(360px,520px)]">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            Community Events &amp; Projects
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            Connecting people, offering safe spaces, and providing support
            through events and projects that make a real difference.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {features.map(({ icon: Icon, label, color }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-sm font-medium text-zinc-800 sm:text-base"
            >
              <Icon
                size={24}
                weight="Filled"
                color={color}
                className="shrink-0"
                aria-hidden
              />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-4xl shadow-sm lg:mx-0 lg:aspect-[5/4] lg:max-w-none xl:aspect-[3/2]">
        <Image
          src={HERO_IMAGE_URL}
          alt="Diverse hands stacked together in a circle, representing community connection"
          fill
          className="object-cover"
          unoptimized
          priority
        />
      </div>
    </div>
  );
}
