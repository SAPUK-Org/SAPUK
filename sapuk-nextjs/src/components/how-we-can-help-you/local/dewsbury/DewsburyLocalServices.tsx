import Link from "next/link";
import type { ReactNode } from "react";

const DEWSBURY_EVENTS_EMAIL = "dewsburyoffice@suicideapuk.co.uk";

function ServiceSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-zinc-900 mb-4">{title}</h2>
      <div className="space-y-3 text-zinc-700 leading-relaxed">{children}</div>
    </section>
  );
}

export default function DewsburyLocalServices() {
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
          Dewsbury (Kirklees)
        </h1>
        <p className="text-zinc-700 leading-relaxed">
          Our events volunteers in Dewsbury are Heidi, Mark, Nichola, Zoe,
          Rachael, Fiona and Chaz.
        </p>
        <p className="mt-3 text-zinc-700 leading-relaxed">
          Our events are usually regular but some do pop up or change, so do
          check our website for details. You can also see upcoming dates on our{" "}
          <Link
            href="/how-we-can-help-you/projects"
            className="text-link font-medium hover:underline"
          >
            Projects
          </Link>{" "}
          page.
        </p>
      </header>

      <ServiceSection id="safe-spaces" title="Dewsbury Safe Spaces">
        <p>
          We hold weekly safe spaces where anyone is welcome to come and have a
          chat with one of our facilitators. We offer 1 to 1 sessions and you
          can attend as much or as little as you need to.
        </p>
        <p>
          The safe space alternates between two venues: Dewsbury Moor
          Children&apos;s Centre and Leggers Inn.
        </p>
        <p>Our safe space facilitators are Heidi (Lead), Mark and Rachael.</p>
      </ServiceSection>

      <ServiceSection id="virtual-safe-space" title="Virtual Safe Space">
        <p>
          This is a new service that we are just introducing. This will be
          beneficial for those who cannot attend our physical safe spaces for
          whatever reason, or for areas where we don&apos;t have a physical safe
          space.
        </p>
        <p>
          This is a booking service which can be accessed by email where you
          will receive your link.
        </p>
        <p>
          <Link
            href={`mailto:${DEWSBURY_EVENTS_EMAIL}?subject=Virtual%20Safe%20Space%20booking`}
            className="inline-flex items-center gap-2 rounded-md bg-[#7cbddd] px-4 py-2 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Book by email
          </Link>
          {" · "}
          <Link
            href="/how-we-can-help-you/contact-us"
            className="text-link font-medium hover:underline"
          >
            Contact us
          </Link>
        </p>
      </ServiceSection>

      <ServiceSection id="walk-and-talk" title="Walk and Talk">
        <p>
          This is a monthly service where we meet outside Leggers Inn at 10:30
          and set off for a walk. The date varies so do check for details.
        </p>
        <p>
          Anyone is welcome to come. These walks are beneficial for our
          wellbeing.
        </p>
        <p>
          After the walk we go back to the Leggers Inn for free tea and coffee.
        </p>
      </ServiceSection>

      <ServiceSection id="board-game-club" title="Board Game Club">
        <p>
          Our board game club is run on every second Saturday of the month, 9:45
          to 11:45 at the Three Strand Cafe on Longcauseway.
        </p>
        <p>
          It&apos;s good for families or anyone feeling lonely or isolated to
          come and play games, connect and enjoy. We have many games to choose
          from including Monopoly, Scrabble, Sorry, Yes/No, Game of Life, and
          more.
        </p>
      </ServiceSection>

      <ServiceSection id="food-pantries" title="Food pantries">
        <p>
          Our food pantries are held during most of the school holidays. They
          are usually outside the Three Strand Cafe, Longcauseway where you can
          come and collect a free bag of food.
        </p>
        <p>
          We understand families and people are struggling with the cost of
          living and this in turn has a negative effect on mental health.
        </p>
      </ServiceSection>

      <ServiceSection title="Dates coming up">
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Leggers Inn Safe Space</strong> — 18th of May, 9:30am until
            12:00pm
          </li>
          <li>
            <strong>Dewsbury Moor Children&apos;s Centre Safe Space</strong> —
            22nd of May, 9:30am until 12:00pm (then alternates)
          </li>
          <li>
            <strong>Walk &amp; Talk</strong> — 23rd of May, meet outside Leggers
            Inn at 10:30am
          </li>
          <li>
            <strong>Board Game Club</strong> — 13th of June, 9:45 until 11:45,
            the Three Strand Cafe, Longcauseway
          </li>
          <li>
            <strong>Stall at Dewsbury Moor Children&apos;s Centre</strong> —
            28th of May, 10am until 2pm
          </li>
          <li>
            <strong>Virtual Safe Space</strong> — coming soon TBC
          </li>
          <li>
            <strong>Summer Food Pantry</strong> — coming soon TBC
          </li>
        </ul>
      </ServiceSection>
    </article>
  );
}
