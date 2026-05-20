import Link from "next/link";
import { localRegions } from "./local-regions-data";

export default function LocalServicesIndex() {
  return (
    <section className="bg-saphub-bg pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Local Services
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Find SAPUK programmes and support near you. Select your area to see
            what&apos;s available, including safe spaces, community events, and
            food pantries.
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-1">
          {localRegions.map((region) =>
            region.available ? (
              <li key={region.slug}>
                <Link
                  href={`/how-we-can-help-you/local/${region.slug}`}
                  className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-zinc-100"
                >
                  <h2 className="text-xl font-bold text-zinc-900">
                    {region.name}{" "}
                    <span className="font-normal text-zinc-600">
                      ({region.area})
                    </span>
                  </h2>
                  <p className="mt-2 text-zinc-600">{region.summary}</p>
                  <span className="inline-block mt-4 text-link font-medium">
                    View services →
                  </span>
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      </div>
    </section>
  );
}
