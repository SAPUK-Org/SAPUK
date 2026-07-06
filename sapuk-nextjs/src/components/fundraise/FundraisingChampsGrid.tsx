import Image from "next/image";
import Link from "next/link";
import type { FundraisingChamp } from "@/types/cms";

type FundraisingChampsGridProps = {
  champs: FundraisingChamp[];
};

export default function FundraisingChampsGrid({
  champs,
}: FundraisingChampsGridProps) {
  if (champs.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        Fundraising champions will appear here soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {champs.map((champ) => (
        <Link
          key={champ.id}
          href={`/fundraise/champs/${champ.slug}`}
          className="group block rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex items-center gap-4">
            {(champ.logo || champ.image) && (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                <Image
                  src={(champ.logo || champ.image)!}
                  alt={champ.name}
                  fill
                  className="object-contain p-1"
                  unoptimized
                />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                {champ.name}
              </h2>
              <span className="text-xs uppercase tracking-wide text-zinc-500">
                {champ.champ_type === "business" ? "Business" : "Individual"}
              </span>
            </div>
          </div>
          <p className="text-sm text-zinc-600 line-clamp-3">{champ.summary}</p>
          <span className="mt-4 inline-block text-sm font-medium text-blue-600">
            Read their story →
          </span>
        </Link>
      ))}
    </div>
  );
}
