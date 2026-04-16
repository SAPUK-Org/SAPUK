import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { eventCards } from "./volunteer-data";

export default function EventsCarousel() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8">
        Events
      </h2>

      <div className="relative w-full max-w-4xl mx-auto">
        <Carousel className="w-full px-4">
          <CarouselContent className="-ml-2 md:-ml-4">
            {eventCards.map((event, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                <Card className="h-fit">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl leading-tight">
                      {event.title}
                    </CardTitle>
                    {event.description && (
                      <CardDescription className="text-sm sm:text-base">
                        {event.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div
                      className="text-zinc-800 text-sm sm:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: event.content.replace(/\n/g, "<br />"),
                      }}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Responsive button positioning */}
          <div className="hidden sm:block">
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 bg-zinc-900 border-gray-200 hover:border-gray-300 shadow-lg text-zinc-900" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 bg-zinc-900 border-gray-200 hover:border-gray-300 shadow-lg text-zinc-900" />
          </div>

          {/* Mobile-friendly bottom navigation */}
          <div className="sm:hidden flex justify-center items-center gap-4 mt-6">
            <CarouselPrevious className="static translate-x-0 translate-y-0 bg-zinc-900 border-gray-200 hover:border-gray-300 shadow-md" />
            <CarouselNext className="static translate-x-0 translate-y-0 bg-zinc-900 border-gray-200 hover:border-gray-300 shadow-md" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
