"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { storySlides } from "./students-data";

export default function StoryCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Student Stories & Experiences
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real stories from students who have faced similar challenges and found
          support
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent>
            {storySlides.map((slide, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 md:p-2">
                  <Card className="border-2 border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <CardContent className="flex aspect-square items-center justify-center p-2 md:p-4">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover rounded-lg max-w-[200px] md:max-w-none pointer-events-none select-none"
                        priority
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 md:left-4 lg:-left-16" />
          <CarouselNext className="right-1 md:right-4 lg:-right-16" />
        </Carousel>
        <div className="text-center mt-4 text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </div>
  );
}
