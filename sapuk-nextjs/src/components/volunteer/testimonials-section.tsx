import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "./volunteer-data";

export default function TestimonialsSection() {
  return (
    <div className="w-full">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center">
        Hear From Our Volunteers
      </h2>
      <div className="h-[17rem] sm:h-[25rem] lg:h-[30rem]">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}
