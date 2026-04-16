import Images from "@/components/home/Images";
import Support from "@/components/home/Support";
import { Button } from "@/components/ui/button";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <StickyBanner className="bg-gradient-to-b from-header/0 to-header/70 backdrop-blur-sm">
        <p className="mx-0 max-w-[90%] text-sm md:text-base text-zinc-100 font-bold drop-shadow-md">
          A thank you message from the team at SAPUK.
        </p>
        <Button
          variant="ghost"
          className="text-zinc-100 text-sm md:text-base font-bold hover:bg-transparent hover:text-zinc-100/80"
        >
          <Link
            href="https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNZYnSXzTJ82GY1lQSOXRp0ztf4CiWEc9PDLs6"
            target="_blank"
            className="group flex items-center gap-1 underline"
          >
            Read More
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
          </Link>
        </Button>
      </StickyBanner>
      <Images />
      <Support />
    </section>
  );
}
