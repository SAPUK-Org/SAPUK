import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ExternalLink,
  HeartHandshake,
  Mail,
  MessageCircleHeart,
  Newspaper,
  Send,
  Sparkles,
  UsersRound,
} from "lucide-react";
import NewsletterSignupForm from "@/components/how-we-can-help-you/community/NewsletterSignupForm";
import { Button } from "@/components/ui/button";
import { fetchPublicCommunityCauses } from "@/lib/cms-public";
import type { CommunityCause } from "@/types/cms";

const COMMUNITY_EMAIL = "community@suicideapuk.co.uk";
const NEWSLETTER_EMAIL = "sapnewsletter@suicideapuk.co.uk";
const DANI_BLOG_URL = "http://www.danisace.com";

const heroChips = [
  {
    title: "Community voices",
    detail: "Stories, causes and people",
    icon: UsersRound,
  },
  {
    title: "Newsletter",
    detail: "Updates from the team",
    icon: Newspaper,
  },
  {
    title: "Share with SAPUK",
    detail: "Blogs and initiatives welcome",
    icon: HeartHandshake,
  },
] as const;

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} className="flex scroll-mt-28 items-center gap-3">
      <h2 className="text-lg font-bold text-slate-950">{children}</h2>
    </div>
  );
}

function ShareCard() {
  return (
    <aside className="flex h-full flex-col rounded-lg border border-slate-200/80 bg-violet-50/70 p-5 shadow-[0_14px_34px_rgba(76,29,149,0.08)]">
      <span className="flex size-10 items-center justify-center rounded-full bg-white text-violet-600 ring-1 ring-violet-100">
        <Send className="size-5" aria-hidden />
      </span>
      <h2 className="mt-4 text-sm font-black text-slate-950">
        Share with SAPUK
      </h2>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        Send community features, blog ideas or newsletter contributions to the
        right inbox and our team will pick it up.
      </p>
      <div className="mt-4 flex flex-col gap-3 text-xs text-slate-600">
        <a
          href={`mailto:${COMMUNITY_EMAIL}`}
          className="flex min-w-0 items-center gap-2 font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
        >
          <Mail className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{COMMUNITY_EMAIL}</span>
        </a>
        <a
          href={`mailto:${NEWSLETTER_EMAIL}`}
          className="flex min-w-0 items-center gap-2 font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
        >
          <Newspaper className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{NEWSLETTER_EMAIL}</span>
        </a>
      </div>
      <Button
        asChild
        className="mt-auto h-10 w-full rounded-lg bg-amber-400 text-xs font-black text-slate-950 shadow-none hover:bg-amber-300"
      >
        <a href={`mailto:${COMMUNITY_EMAIL}`}>Send a community feature</a>
      </Button>
    </aside>
  );
}

function CommunityCauseCard({ cause }: { cause: CommunityCause }) {
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-100">
        {cause.image ? (
          <Image
            src={cause.image}
            alt={cause.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-violet-50 text-violet-500">
            <Sparkles className="size-10" aria-hidden />
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-base font-black text-slate-950">{cause.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {cause.summary}
        </p>
        {cause.link_url ? (
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-violet-700 transition group-hover:text-violet-900">
            Learn more
            <ExternalLink className="size-4" aria-hidden />
          </span>
        ) : null}
      </div>
    </>
  );

  const className =
    "group block rounded-lg border border-slate-200/80 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]";

  if (cause.link_url) {
    return (
      <a
        href={cause.link_url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}

function CommunityFeatures({ causes }: { causes: CommunityCause[] }) {
  return (
    <section className="scroll-mt-28">
      <SectionHeading id="community-features">
        Community features
      </SectionHeading>

      {causes.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {causes.map((cause) => (
            <CommunityCauseCard key={cause.id} cause={cause} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center">
          <h3 className="mt-4 text-base font-black text-slate-950">
            Community features are being refreshed
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            We will show causes, people and initiatives here as they are added
            by the SAPUK team. You can still send a feature for consideration.
          </p>
          <Button
            asChild
            className="mt-5 h-10 rounded-lg bg-amber-400 px-5 text-xs font-black text-slate-950 shadow-none hover:bg-amber-300"
          >
            <a href={`mailto:${COMMUNITY_EMAIL}`}>Send a feature</a>
          </Button>
        </div>
      )}
    </section>
  );
}

function ContributionCard({
  title,
  detail,
  email,
  accent = "violet",
}: {
  title: string;
  detail: string;
  email: string;
  accent?: "violet" | "blue";
}) {
  return (
    <article className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <h3 className="mt-4 text-base font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail}</p>
      <a
        href={`mailto:${email}`}
        className="mt-4 inline-flex max-w-full items-center gap-2 text-sm font-bold text-violet-700 transition hover:text-violet-900 hover:underline"
      >
        <Mail className="size-4 shrink-0" aria-hidden />
        <span className="truncate">{email}</span>
      </a>
    </article>
  );
}

export default async function CommunityPage() {
  const causes = await fetchPublicCommunityCauses();

  return (
    <section className="bg-white px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <article className="flex flex-col gap-8">
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-stretch">
            <div className="relative min-h-[315px] overflow-hidden rounded-lg border border-slate-200/70 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-8 lg:px-10 lg:py-9">
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Blogs & community
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Explore community features, the founder&apos;s blog and
                  updates from SAPUK. You can also share community work, blog
                  ideas or newsletter contributions with the team.
                </p>
              </div>

              <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
                {heroChips.map(({ title, detail, icon: Icon }) => (
                  <div key={title} className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-black text-slate-950">
                        {title}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500">
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Image
                src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwkgSFOAPjBYWZ1mXwgkcO3AKat4oGFrMNz6f8"
                alt=""
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority
                className="pointer-events-none absolute bottom-0 right-0 h-full w-[58%] object-cover object-center opacity-[0.1] [mask-image:linear-gradient(to_right,transparent,black_52%)]"
              />
            </div>

            <ShareCard />
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-stretch">
            <div className="flex min-w-0 flex-col">
              <SectionHeading id="founders-blog">
                Founder&apos;s blog
              </SectionHeading>
              <Link
                href={DANI_BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 grid flex-1 overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_22px_54px_rgba(15,23,42,0.09)] md:grid-cols-[18rem_minmax(0,1fr)]"
              >
                <div className="relative min-h-64 bg-slate-50 md:min-h-full">
                  <Image
                    src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwdo0eWUJbL4gc3lW6mErD8QxRv72fCtPpujIJ"
                    alt="Dani's Ace Blog"
                    fill
                    sizes="(min-width: 768px) 18rem, 100vw"
                    className="object-contain p-5 transition duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Dani&apos;s Ace
                  </p>
                  <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                    Writing, guidance and reflections since 2016
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Our founder&apos;s blog covers suicide awareness,
                    prevention, lived experience and supportive guidance across
                    a range of topics.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-violet-700 transition group-hover:text-violet-900">
                    Visit danisace.com
                    <ExternalLink className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </div>

            <aside className="flex h-full flex-col rounded-lg border border-slate-200/80 bg-slate-50/70 p-5 lg:mt-[3.25rem] lg:h-[calc(100%-3.25rem)]">
              <h2 className="text-sm font-black text-slate-950">
                Want to feature your community or blog?
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                Send one finished design or a short summary for the SAPUK team
                to review for the community page.
              </p>
              <a
                href={`mailto:${COMMUNITY_EMAIL}`}
                className="mt-auto inline-flex max-w-full items-center gap-2 pt-4 text-xs font-bold text-violet-700 transition hover:text-violet-900 hover:underline"
              >
                <Mail className="size-4 shrink-0" aria-hidden />
                <span className="truncate">{COMMUNITY_EMAIL}</span>
              </a>
            </aside>
          </section>

          <CommunityFeatures causes={causes} />

          <section className="grid gap-6 rounded-lg border border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1fr)] lg:p-6">
            <div className="relative min-h-72 overflow-hidden rounded-lg bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <Image
                src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwOQBw1hD8NQwMH653xlI4dYPbUV9vmJRzgcES"
                alt="Newsletter signup"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-6">
              <SectionHeading id="newsletter">
                Join our newsletter community
              </SectionHeading>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                SAPUK&apos;s newsletter is produced and led by the team,
                bringing you updates, resources and community news.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Have something to share? Email{" "}
                <a
                  href={`mailto:${NEWSLETTER_EMAIL}`}
                  className="font-bold text-violet-700 transition hover:text-violet-900 hover:underline"
                >
                  {NEWSLETTER_EMAIL}
                </a>
                .
              </p>
              <div className="mt-5">
                <NewsletterSignupForm />
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <ContributionCard
              title="Community and blog submissions"
              detail="Send a single design, feature idea, blog link or community initiative for the SAPUK team to review."
              email={COMMUNITY_EMAIL}
            />
            <ContributionCard
              title="Newsletter contributions"
              detail="Send team updates, useful resources or newsletter-ready notes for inclusion in a future edition."
              email={NEWSLETTER_EMAIL}
              accent="blue"
            />
          </section>
        </article>
      </div>
    </section>
  );
}
