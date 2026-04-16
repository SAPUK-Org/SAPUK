import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SemicolonActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
      <div>
        <Button
          asChild
          className="w-fit bg-button-blue text-white font-bold py-3 px-6 hover:bg-button-blue/80 hover:text-white transition-all duration-300 ease-linear"
        >
          <Link
            href="https://maps.app.goo.gl/Cw9NegCJ2L48PB1F8"
            target="_blank"
            rel="noopener noreferrer"
          >
            THE 2025 MAP
          </Link>
        </Button>
      </div>
      <div>
        <Button
          asChild
          className="w-fit bg-button-blue text-white font-bold py-2 px-4 hover:bg-button-blue/80 hover:text-white transition-all duration-300 ease-linear"
        >
          <Link href="https://suicideapuk.co.uk/studio-page/">
            FOR SCP STUDIO&apos;S
          </Link>
        </Button>
      </div>
      <div>
        <Button
          asChild
          className="w-fit bg-button-blue text-white font-bold py-3 px-6 hover:bg-button-blue/80 hover:text-white transition-all duration-300 ease-linear"
        >
          <Link
            href="https://www.facebook.com/groups/sapukscproject"
            target="_blank"
            rel="noopener noreferrer"
          >
            THE FB GROUP
          </Link>
        </Button>
      </div>
    </div>
  );
}
