import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="mb-12 lg:mb-16">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Book Our Services
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            At SAPUK we have made it available for yourselves within the
            community to book out one of our services, we visit community
            centres, schools, universities, work spaces, colleges, etc. We offer
            our services in a number of ways –
            <Link
              href="/how-we-can-help-you/local/dewsbury#food-pantries"
              className="font-medium text-link hover:text-link/80 transition-colors duration-200 ease-in-out mx-1"
            >
              Food Pantries
            </Link>
            /
            <Link
              href="/how-we-can-help-you/local/dewsbury#safe-spaces"
              className="font-medium text-link hover:text-link/80 transition-colors duration-200 ease-in-out mx-1"
            >
              SAFE SPACE
            </Link>
            /
            <Link
              href="/projects/suicidology-seminar"
              className="font-medium text-link hover:text-link/80 transition-colors duration-200 ease-in-out mx-1"
            >
              Suicidology Seminar
            </Link>
            / Under 18&apos;s Presentations
          </p>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end">
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwTY5y9v2KO6WARsNna5Mh1bQFDqcwVEY0zvy9"
            alt="SAPUK Background"
            width={457}
            height={257}
            className="rounded-xl shadow-lg object-cover w-full max-w-md"
            priority
          />
        </div>
      </div>
    </div>
  );
}
