import { CarouselApi } from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel";

export type CarouselProps = {
  opts?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

export type CarouselContextProps = CarouselProps & {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

export type StorySlide = {
  src: string;
  alt: string;
};
