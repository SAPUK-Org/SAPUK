import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPublicFundraisingChampBySlug } from "@/lib/cms-public";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const champ = await fetchPublicFundraisingChampBySlug(slug);
  if (!champ) {
    return { title: "Fundraising Champ - SAP;UK" };
  }
  return {
    title: `${champ.name} - Fundraising Champ - SAP;UK`,
    description: champ.summary,
  };
}

export default async function FundraisingChampDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const champ = await fetchPublicFundraisingChampBySlug(slug);

  if (!champ) {
    notFound();
  }

  return (
    <section className="bg-saphub-bg pt-20 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="w-[95%] max-w-3xl mx-auto">
        <Link
          href="/fundraise/champs"
          className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
          ← All fundraising champs
        </Link>

        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
            {(champ.logo || champ.image) && (
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white border border-zinc-200 shadow-sm">
                <Image
                  src={(champ.logo || champ.image)!}
                  alt={champ.name}
                  fill
                  className="object-contain p-2"
                  unoptimized
                  priority
                />
              </div>
            )}
            <div>
              <span className="text-xs uppercase tracking-wide text-zinc-500">
                {champ.champ_type === "business" ? "Business" : "Individual"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-1">
                {champ.name}
              </h1>
              <p className="text-lg text-zinc-600 mt-2">{champ.summary}</p>
            </div>
          </div>

          {champ.image && champ.logo && champ.image !== champ.logo && (
            <div className="relative w-full h-56 sm:h-72 overflow-hidden rounded-xl mb-6">
              <Image
                src={champ.image}
                alt={champ.name}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          )}
        </header>

        {champ.body ? (
          <div className="prose prose-zinc max-w-none">
            {champ.body.split("\n").map((paragraph, i) => (
              <p key={i} className="text-zinc-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        {champ.website_url ? (
          <p className="mt-8">
            <a
              href={champ.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              Visit website →
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
