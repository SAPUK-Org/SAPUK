import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function SemicolonMedia() {
  return (
    <div className="grid grid-cols-1 gap-8 md:mb-12">
      <div className="text-center">
        <div className="relative inline-block">
          <Link
            href="https://youtu.be/JoBwxn2_fco"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwsWUQUqp0xDA2L3YeKGIa1RlmdqkM6Xu5QSOC"
              alt="Semicolon Project Video"
              width={212}
              height={300}
              className="mx-auto"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#2ac4ea] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/9] p-4">
                <Image
                  src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwiMwWTwdaLOZF7JdImUlYVG50A4sqTeDWPrzj"
                  alt="Semicolon Project Timeline"
                  fill
                  className="object-contain rounded-lg shadow-md"
                  priority
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/9] p-4">
                <Image
                  src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwzFkamBHAi4GfyeapdFqr9M3x0wZPcuR6tEn2"
                  alt="2022 Tattoo Poster"
                  fill
                  className="object-contain rounded-lg shadow-md"
                  priority
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/9] p-4">
                <Image
                  src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwkIttEgPjBYWZ1mXwgkcO3AKat4oGFrMNz6f8"
                  alt="Semicolon Project Banner"
                  fill
                  className="object-contain rounded-lg shadow-md"
                  priority
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/9] p-4">
                <Image
                  src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwQqTqhysemPC0kX68MyfuVHZw4QtldxvpBE9K"
                  alt="SCP Leaflet"
                  fill
                  className="object-contain rounded-lg shadow-md"
                  priority
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/9] p-4">
                <Image
                  src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpw6G2tMdOOziusgoyUKjE3IwPm4T0fhNFk2qJW"
                  alt="SAP Leaflet"
                  fill
                  className="object-contain rounded-lg shadow-md"
                  priority
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/9] p-4">
                <Image
                  src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwr6owgkwq3Xm1F6YnsojQITZGlE8zbruyx5C0"
                  alt="Thank You Leaflet"
                  fill
                  className="object-contain rounded-lg shadow-md"
                  priority
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/9] p-4">
                <Image
                  src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwChEA35rdPZfDSwtuHs4l8m1p97xCiqyzea06"
                  alt="Semicolon Festival Banner"
                  fill
                  className="object-contain rounded-lg shadow-md"
                  priority
                />
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Desktop / large screens: side arrows */}
          <CarouselPrevious className="hidden md:flex md:translate-x-20" />
          <CarouselNext className="hidden md:flex md:-translate-x-20" />

          {/* Mobile / tablet: controls below carousel to avoid horizontal overflow */}
          <div className="mt-4 flex justify-center gap-4 md:hidden">
            <CarouselPrevious className="static -translate-y-14 left-auto right-auto top-auto md:hidden" />
            <CarouselNext className="static -translate-y-14 left-auto right-auto top-auto md:hidden" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
