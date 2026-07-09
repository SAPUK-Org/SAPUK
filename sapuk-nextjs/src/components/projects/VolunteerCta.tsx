import { ArrowRight } from "lucide-react";
import { HandHeart } from "reicon-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VolunteerCta() {
  return (
    <div className="rounded-2xl border border-purple-card/30 bg-purple-card/15 px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <HandHeart size={28} weight="Filled" color="#0000FF" aria-hidden />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
              Want to get involved?
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-700 sm:text-base">
              Volunteer at an event, help behind the scenes, or share your
              skills with our community.
            </p>
          </div>
        </div>

        <Button
          asChild
          className="w-full shrink-0 border-button-blue bg-button-blue text-white hover:bg-button-blue/80 sm:w-auto"
        >
          <Link href="/volunteer">
            Explore volunteering opportunities
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}
