import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Mail,
  MessageCircleHeart,
  Monitor,
  Phone,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  VIRTUAL_ACCESSIBILITY,
  VIRTUAL_CONTACTS,
  VIRTUAL_EXPECT,
  VIRTUAL_WHO_FOR,
} from "./safe-spaces-data";

const heroChips = [
  {
    title: "Free & confidential",
    detail: "Unless significant risk of harm",
    icon: ShieldCheck,
  },
  {
    title: "UK-wide, 16+",
    detail: "Join from anywhere in the UK",
    icon: UsersRound,
  },
  {
    title: "Online or phone",
    detail: "Teams or call — your choice",
    icon: Monitor,
  },
] as const;

function SectionHeading({
  id,
  icon: Icon,
  children,
}: {
  id: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: ReactNode;
}) {
  return (
    <div id={id} className="flex scroll-mt-28 items-center gap-3">
      <span className="flex size-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
        <Icon className="size-4" aria-hidden />
      </span>
      <h2 className="text-lg font-bold text-slate-950">{children}</h2>
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
          <CheckCircle2
            className="mt-0.5 size-4 shrink-0 text-violet-500"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BookCard() {
  return (
    <aside className="flex h-full flex-col rounded-lg border border-slate-200/80 bg-violet-50/70 p-5 shadow-[0_14px_34px_rgba(76,29,149,0.08)]">
      <span className="flex size-10 items-center justify-center rounded-full bg-white text-violet-600 ring-1 ring-violet-100">
        <CalendarDays className="size-5" aria-hidden />
      </span>
      <h2 className="mt-4 text-sm font-black text-slate-950">Book a session</h2>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        Virtual Safe Spaces run every Friday 9am–12:30pm. Choose Microsoft Teams
        or a phone call — 1-1 and group slots available.
      </p>
      <Button
        asChild
        className="mt-auto h-10 w-full rounded-lg bg-amber-400 text-xs font-black text-slate-950 shadow-none hover:bg-amber-300"
      >
        <a href="#book">How to book</a>
      </Button>
    </aside>
  );
}

export default function VirtualSafeSpaces() {
  return (
    <article className="flex flex-col gap-8">
      <Link
        href="/how-we-can-help-you/safe-spaces"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-violet-700 hover:underline"
      >
        <span>All safe spaces</span>
        <span aria-hidden className="text-slate-300">
          /
        </span>
        <span className="text-violet-700">Virtual</span>
      </Link>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-stretch">
        <div className="relative min-h-[315px] overflow-hidden rounded-lg border border-slate-200/70 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-8 lg:px-10 lg:py-9">
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wide text-violet-600">
              Virtual Safe Spaces
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Need someone to talk to?
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Our Virtual Safe Spaces are free, confidential online support
              sessions open to anyone across the UK over 16 years of age. The
              sessions provide a calm, welcoming environment where individuals
              can talk about how they are feeling, reflect, and receive
              emotional support from trained volunteers.
            </p>
          </div>

          <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
            {heroChips.map(({ title, detail, icon: Icon }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-black text-slate-950">{title}</p>
                  <p className="text-[11px] font-medium text-slate-500">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Image
            src="/safe-spaces/virtual-safe-spaces.png"
            alt=""
            width={480}
            height={360}
            priority
            className="pointer-events-none absolute bottom-0 right-0 h-full w-[52%] object-contain object-right-bottom opacity-25 [mask-image:linear-gradient(to_right,transparent,black_48%)]"
          />
        </div>

        <BookCard />
      </section>

      <section className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-6">
        <SectionHeading id="overview" icon={HeartHandshake}>
          Overview
        </SectionHeading>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            These sessions are designed to be accessible and barrier-free with
            no travel, no waiting rooms, and no location restrictions. Whether
            someone is feeling overwhelmed, lonely, anxious, or simply needs a
            supportive space to talk, Virtual Safe Spaces provide a secure and
            understanding environment.
          </p>
          <p>
            Participants can join from home or any private space, making this a
            valuable option for people who may find it difficult to access
            in-person services.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-6">
          <SectionHeading id="who" icon={UsersRound}>
            Who Virtual Safe Spaces are for
          </SectionHeading>
          <p className="mt-3 text-sm text-slate-600">
            Virtual Safe Spaces are suitable for anyone who:
          </p>
          <BulletList items={VIRTUAL_WHO_FOR} />
        </div>

        <div className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-6">
          <SectionHeading id="expect" icon={MessageCircleHeart}>
            What to expect
          </SectionHeading>
          <p className="mt-3 text-sm text-slate-600">
            During a Virtual Safe Space session, participants can:
          </p>
          <BulletList items={VIRTUAL_EXPECT} />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200/80 bg-slate-50/60 p-5 sm:p-6">
        <SectionHeading id="sessions" icon={Clock}>
          Upcoming sessions
        </SectionHeading>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Virtual Safe Spaces are currently held on Microsoft Teams or by a
          phone call every Friday 9am – 12:30pm.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          We offer both 1-1 and group sessions depending on your preference, in
          1-hour slots.
        </p>
      </section>

      <section
        id="book"
        className="scroll-mt-28 rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-6"
      >
        <SectionHeading id="book-heading" icon={Mail}>
          How to book onto a Virtual Safe Space
        </SectionHeading>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-violet-100 bg-violet-50/60 p-4">
            <div className="flex items-center gap-2">
              <Monitor className="size-4 text-violet-600" aria-hidden />
              <h3 className="text-sm font-black text-slate-950">
                Microsoft Teams
              </h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Email the following Virtual Safe Space facilitator to book a
              Microsoft Teams slot:
            </p>
            <a
              href={`mailto:${VIRTUAL_CONTACTS.teams.email}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-violet-700 transition hover:text-violet-900 hover:underline"
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              {VIRTUAL_CONTACTS.teams.email}
            </a>
          </div>

          <div className="rounded-lg border border-sky-100 bg-sky-50/60 p-4">
            <div className="flex items-center gap-2">
              <Phone className="size-4 text-sky-700" aria-hidden />
              <h3 className="text-sm font-black text-slate-950">Phone call</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Email the following Virtual Safe Space facilitator to book a phone
              call:
            </p>
            <a
              href={`mailto:${VIRTUAL_CONTACTS.phone.email}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-violet-700 transition hover:text-violet-900 hover:underline"
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              {VIRTUAL_CONTACTS.phone.email}
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-6">
        <SectionHeading id="accessibility" icon={ShieldCheck}>
          Accessibility
        </SectionHeading>
        <p className="mt-3 text-sm text-slate-600">Virtual Safe Spaces are:</p>
        <BulletList items={VIRTUAL_ACCESSIBILITY} />
      </section>

      <section className="rounded-lg border border-violet-100 bg-violet-50/70 p-5 sm:p-6">
        <SectionHeading id="contact" icon={Mail}>
          Contact us
        </SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          If you have questions or would like more information, please get in
          touch with one of the following:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/80 bg-white/80 p-4">
            <h3 className="text-sm font-black text-slate-950">
              General queries
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Heidi (Events Director)
            </p>
            <a
              href={`mailto:${VIRTUAL_CONTACTS.general.email}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-violet-700 transition hover:text-violet-900 hover:underline"
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              {VIRTUAL_CONTACTS.general.email}
            </a>
          </div>
          <div className="rounded-lg border border-white/80 bg-white/80 p-4">
            <h3 className="text-sm font-black text-slate-950">
              Promotional materials
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Isobel (Director Support for Events) — posters and leaflets
            </p>
            <a
              href={`mailto:${VIRTUAL_CONTACTS.promo.email}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-violet-700 transition hover:text-violet-900 hover:underline"
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              {VIRTUAL_CONTACTS.promo.email}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
