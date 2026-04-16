import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ImageCarousel() {
  return (
    <div className="bg-zinc-100 rounded-xl shadow-lg border border-zinc-200 p-12">
      <div className="max-w-2xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="p-2 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNtBXHLIUbwZSul74JmysrNKxcjGLYao9B5nIA"
                  alt="Safe Spaces Image 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="p-2 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNPyGCkKWLi3vBmhrD0MVN4cbfCuRa1P7JgwZX"
                  alt="Safe Spaces Image 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="p-2 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNvSrPUQL9k8OdJvDx54taYWbw1SN7Lu0ZcH2y"
                  alt="Safe Spaces Image 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="md:hidden absolute -bottom-20 left-0 w-full flex justify-center mb-4">
            <CarouselPrevious className="bg-zinc-800 text-white w-10 h-10 md:-left-10 md:top-1/2 md:-translate-y-1/2 static md:absolute mt-4 md:mt-0 hover:bg-zinc-700 transition-colors" />
            <CarouselNext className="bg-zinc-800 text-white w-10 h-10 md:-right-10 md:top-1/2 md:-translate-y-1/2 static md:absolute mt-4 md:mt-0 hover:bg-zinc-700 transition-colors" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
