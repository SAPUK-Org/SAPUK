import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { LancashireUpcomingDatesCalendar } from "./LancashireUpcomingDatesCalendar";
import { LANCASHIRE_EVENT_YEAR } from "./lancashire-upcoming-events";
import { cn } from "@/lib/utils";

const LANCASHIRE_EMAIL = "lancashireoffice@suicideapuk.co.uk";

function ProgrammeBlock({
  id,
  title,
  className,
  children,
}: {
  id: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 space-y-4 leading-relaxed text-zinc-700", className)}
    >
      <h2 className="text-xl font-bold text-zinc-900 md:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export default function LancashireLocalServices() {
  return (
    <article>
      <section className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm">
        <header className="border-b border-zinc-100 px-6 py-8 md:px-10 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Local services · Lancashire
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            Lancashire
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-700">
            Welcome to our Lancashire outreach page. If you would like more
            information on a space, or wish to collaborate or volunteer, you can
            contact{" "}
            <a
              href={`mailto:${LANCASHIRE_EMAIL}`}
              className="font-medium text-link hover:underline"
            >
              {LANCASHIRE_EMAIL}
            </a>
            . Our socials reflect the most accurate information; please keep an
            eye on these for the latest updates.
          </p>
        </header>

        <div className="space-y-10 px-6 py-10 md:px-10 md:py-12">
          <ProgrammeBlock id="safe-spaces" title="Safe Spaces">
            <p>
              The first Thursday of the month, 9:30am to 12:30pm at Longridge
              Civic Hall Safe Space. Here you can find information and resources
              on suicide prevention and awareness in your local area, including
              information on regulating these feelings. Alongside this we have the
              Longridge weekly market, which hosts a variety of stalls including
              fresh fish and fresh fruit and vegetables. Come and grab a coffee
              with us.
            </p>
            <p>
              We are also available in Blackburn Mall on{" "}
              <Link
                href="#dates-coming-up"
                className="font-medium text-link hover:underline"
              >
                13 May {LANCASHIRE_EVENT_YEAR}
              </Link>
              .
            </p>
          </ProgrammeBlock>

          <ProgrammeBlock
            id="semicolon-project"
            title="The UK Semicolon Project"
          >
            <p>
              Available across Lancashire. An annual project that begins every
              April. Please see our{" "}
              <Link
                href="/how-we-can-help-you/projects"
                className="font-medium text-link hover:underline"
              >
                Projects
              </Link>{" "}
              page for more information.
            </p>
          </ProgrammeBlock>

          <ProgrammeBlock id="walk-and-talk" title="Walk & Talk">
            <p>
              Each month we provide an opportunity for you to get out and meet
              some new friends. Life can be difficult to navigate sometimes, but
              more so if you are on your own. Meet an hour before the walk at
              Longridge Civic Hall. Water and sandwiches are provided, but you
              can bring your own.
            </p>
            <p className="text-sm text-zinc-600">
              Times and locations may change. Please keep an eye on our social
              media pages. Confirmed walks are listed in{" "}
              <Link
                href="#dates-coming-up"
                className="font-medium text-link hover:underline"
              >
                dates coming up
              </Link>
              .
            </p>
            <ul className="list-inside list-disc space-y-1 text-zinc-800">
              <li>Sunday 12 July {LANCASHIRE_EVENT_YEAR}, 1pm</li>
              <li>Sunday 20 September {LANCASHIRE_EVENT_YEAR}, 12pm</li>
              <li>Sunday 4 October {LANCASHIRE_EVENT_YEAR}, 1pm</li>
              <li>Sunday 13 December {LANCASHIRE_EVENT_YEAR}, 1pm</li>
            </ul>
          </ProgrammeBlock>

          <ProgrammeBlock id="longridge-days-out" title="Longridge days out">
            <p>
              Come and join a group of us for socialising, approximately every
              six weeks. We generally meet at Wilfred&apos;s club in the
              afternoon, but please check our socials for more specific
              information as sometimes we start a bit later. No pressure on
              drinking; our facilitator is not drinking.
            </p>
            <p className="font-medium text-zinc-900">
              Dates we are out and about:
            </p>
            <ul className="list-inside list-disc space-y-1 text-zinc-800">
              <li>23 May {LANCASHIRE_EVENT_YEAR}</li>
              <li>4 July {LANCASHIRE_EVENT_YEAR}</li>
              <li>26 September {LANCASHIRE_EVENT_YEAR}</li>
              <li>7 November {LANCASHIRE_EVENT_YEAR}</li>
              <li>19 December {LANCASHIRE_EVENT_YEAR}</li>
            </ul>
          </ProgrammeBlock>

          <ProgrammeBlock id="art-week" title="Art Week">
            <p>
              Art is a good avenue for subconsciously regulating negative
              thoughts. From lived experience, just adding colours onto paper can
              really aid with deep healing. Art gives you a form of expressing
              your identity; it also allows you to exercise your motor skills.
            </p>
            <p>
              During my childhood I utilised art as an escape. That&apos;s why
              we bring you these groups so that you too can have the experience of
              an escape. All materials are provided; you can just bring
              yourself. We also have things to make, including bracelets,
              keyrings, and diamond art.
            </p>
            <ul className="space-y-2 text-zinc-800">
              <li>
                <span className="font-medium">Tuesdays in Darwen:</span> Darwen
                Urban Seed (times on socials; new groups starting April / May)
              </li>
              <li>
                <span className="font-medium">Fridays in Longridge:</span> 9:30am
                to 12:30pm at Longridge Library
              </li>
            </ul>
          </ProgrammeBlock>

          <ProgrammeBlock id="other-events" title="Other events">
            <ul className="list-inside list-disc space-y-1 text-zinc-800">
              <li>Leyland festival, 20 June {LANCASHIRE_EVENT_YEAR}</li>
              <li>Lytham community con, 2 August {LANCASHIRE_EVENT_YEAR}</li>
            </ul>
            <p className="text-sm text-zinc-600">
              See{" "}
              <Link
                href="#dates-coming-up"
                className="font-medium text-link hover:underline"
              >
                dates coming up
              </Link>{" "}
              for the full calendar.
            </p>
          </ProgrammeBlock>
        </div>

        <div
          id="dates-coming-up"
          className="scroll-mt-24 border-t border-zinc-100 bg-zinc-50/40 px-6 py-10 md:px-10 md:py-12"
        >
          <div className="mb-8 flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200/80">
              <CalendarDays className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Dates coming up
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                Use the calendar to explore each day, or browse the list of
                confirmed and recurring programmes.
              </p>
            </div>
          </div>
          <LancashireUpcomingDatesCalendar />
        </div>
      </section>
    </article>
  );
}
