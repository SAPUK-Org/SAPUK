import Image from "next/image";
import Link from "next/link";
import { fetchPublicCommunityCauses } from "@/lib/cms-public";

export default async function SupportedCauses() {
  const causes = await fetchPublicCommunityCauses();

  if (causes.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Causes &amp; people we support
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Here are causes and individuals from SAP;UK that we support.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {causes.map((cause) => {
          const content = (
            <>
              {cause.image && (
                <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-4 bg-zinc-100">
                  <Image
                    src={cause.image}
                    alt={cause.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {cause.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {cause.summary}
              </p>
              {cause.link_url ? (
                <span className="mt-3 inline-block text-sm font-medium text-blue-600">
                  Learn more →
                </span>
              ) : null}
            </>
          );

          if (cause.link_url) {
            return (
              <a
                key={cause.id}
                href={cause.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-zinc-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={cause.id}
              className="rounded-lg border border-zinc-100 bg-white p-6 shadow-sm"
            >
              {content}
            </div>
          );
        })}
      </div>

      <p className="text-center mt-8 text-sm text-gray-500">
        Want to feature your community initiative?{" "}
        <Link
          href="mailto:community@suicideapuk.co.uk"
          className="text-blue-600 hover:underline"
        >
          Get in touch
        </Link>
      </p>
    </section>
  );
}
