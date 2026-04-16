import Image from "next/image";
import Link from "next/link";
import LogoMarquee from "@/components/home/LogoMarquee";
import { Button } from "@/components/ui/button";

export default function Support() {
  return (
    <section className="flex flex-col w-full">
      <div className="w-full min-h-[63vh] px-4 sm:px-8 md:px-16 lg:px-32 py-8 flex flex-col md:flex-row items-center justify-center bg-background">
        <div className="flex flex-col md:flex-row items-center justify-center gap-14 w-full">
          <div className="flex flex-col justify-center gap-6 w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-primary">
              We're here for you
            </h1>
            <p className="text-muted text-lg md:text-xl pr-0 md:pr-10">
              On here you will find most information you need to know in
              relation to suicidal ideations and tendencies, and how you can
              gain and engage with suicide prevention support, if you need
              instant support the chat icon is in the corner of the page – thank
              you for your time, if you have any questions please feel free to
              use the contact page;
            </p>
            <div className="mt-2">
              <Link
                href="https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMN0KlviYDzKpQyTlM5Y9rC3gIVt8sbjuxod6PL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="supportBlue" className="w-fit py-6 font-bold">
                  Read Our Mission &amp; Purpose
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-purple-card flex flex-col text-center py-10 px-8 sm:px-16 rounded-3xl gap-6 w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground">
              "You do not need to struggle in silence, #reachout"
            </h2>
            <p className="text-secondary-foreground text-lg md:text-xl">
              SAP;UK
            </p>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[56vh] flex flex-col md:flex-row text-center">
        <div className="bg-amber w-full md:w-1/2 flex flex-col justify-center gap-6 px-4 sm:px-8 md:px-16 lg:px-32 py-8 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            PLEASE DONATE
          </h1>
          <p className="text-primary text-lg md:text-xl">
            Donating to SAPUK, will ensure our services are supported, it allows
            us to train our volunteers and use community outreach programs
            within the community, please see the donate page for more
            information
          </p>
          <div className="flex items-center justify-center">
            <Link href="/sapservices/donate">
              <Button variant="supportBlue" size="lg">
                DONATE
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-support-blue w-full md:w-1/2 flex flex-col justify-center gap-6 px-4 sm:px-8 md:px-16 lg:px-32 py-8 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-foreground">
            WE&apos;RE HERE TO HELP
          </h1>
          <p className="text-lg md:text-xl text-secondary-foreground">
            SAPUK has devoted since 2016, supporting others and will continue to
            do so, we are unique in our support avenues as each service is, we
            know it is okay to not be okay, say &apos;hey&apos; if you are
            struggling, we might be able to help ✌️
          </p>
          <div className="flex items-center justify-center">
            <Link href="/sapservices/contact-us">
              <Button variant="supportAmber" size="lg">
                CLICK FOR SUPPORT
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[40vh] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16 bg-background px-6 sm:px-8 md:px-16 lg:px-32 py-8">
        <div className="flex items-center justify-center">
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwz1WGe9RHAi4GfyeapdFqr9M3x0wZPcuR6tEn"
            alt="support"
            width={200}
            height={200}
            className="w-44 md:w-64 h-auto rounded-xl select-none pointer-events-none"
          />
        </div>
        <div className="flex flex-col text-center md:text-left">
          <p className="text-primary text-xl">
            “Suicidal thoughts can recover, we just need you to make it to
            tomorrow;”
          </p>
          <p className="text-primary text-lg mt-4 text-center">SAPUK</p>
        </div>
      </div>
      <hr />
      <div className="w-full min-h-[40vh] flex flex-col items-center justify-center bg-zinc-100 px-6 sm:px-8 md:px-16 lg:px-32">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-6">
          Our Community
        </h1>
        <LogoMarquee />
      </div>
    </section>
  );
}
