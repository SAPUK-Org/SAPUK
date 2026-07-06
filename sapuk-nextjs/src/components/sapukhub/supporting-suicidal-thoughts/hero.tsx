import Image from "next/image";
import { heroContent } from "./supporting-data";

function HeroIllustration({
  className,
  outerClassName,
  innerClassName,
}: {
  className?: string;
  outerClassName: string;
  innerClassName: string;
}) {
  return (
    <div className={className}>
      <div
        className={`relative flex items-center justify-center ${outerClassName}`}
      >
        <div className="absolute inset-0 rounded-full bg-purple-card/25" />
        <div
          className={`relative overflow-hidden rounded-full ${innerClassName}`}
        >
          <Image
            src={heroContent.illustrationSrc}
            alt={heroContent.illustrationAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default function SupportingHero() {
  return (
    <header className="relative mb-0">
      <div className="max-w-4xl space-y-4 lg:pr-64 xl:pr-72">
        <p className="text-sm font-semibold uppercase tracking-wider text-button-blue">
          {heroContent.label}
        </p>
        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-5xl">
          {heroContent.title}
        </h1>
        <hr className="max-w-xs border-0 border-t-2 border-button-blue" />
        <p className="max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          {heroContent.intro}
        </p>
      </div>

      <HeroIllustration
        className="mt-6 flex justify-end sm:mt-8 lg:absolute lg:-top-3 lg:mr-0 lg:mt-0 lg:-right-10"
        outerClassName="h-44 w-44 sm:h-52 sm:w-52 lg:h-72 lg:w-72 xl:h-96 xl:w-96"
        innerClassName="h-36 w-36 sm:h-40 sm:w-40 lg:h-64 lg:w-64 xl:h-80 xl:w-80"
      />
    </header>
  );
}
