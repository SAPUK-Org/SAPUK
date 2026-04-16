import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <div className="mt-16 bg-primary/10 border border-primary/20 rounded-tr-2xl rounded-tl-2xl p-8 text-center">
      <h3 className="text-2xl font-bold text-foreground mb-4">
        Remember, It's Okay to Ask for Help
      </h3>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Your mental health matters. Whether you're struggling with academic
        pressure, personal challenges, or just need someone to talk to, we're
        here to support you.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button
          asChild
          className="w-fit bg-button-blue text-white font-semibold hover:bg-button-blue/80 hover:text-white"
        >
          <Link href="/sapservices/thesapchat">Start a Chat</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="w-fit bg-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-300 hover:text-zinc-900"
        >
          <Link href="/sapservices/contact-us">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
