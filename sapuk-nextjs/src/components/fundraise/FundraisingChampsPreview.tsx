import Link from "next/link";
import { fetchPublicFundraisingChamps } from "@/lib/cms-public";
import FundraisingChampsGrid from "./FundraisingChampsGrid";

export default async function FundraisingChampsPreview() {
  const champs = await fetchPublicFundraisingChamps();
  const preview = champs.slice(0, 3);

  if (preview.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Fundraising Champs</h2>
          <p className="text-zinc-600 max-w-2xl">
            Individuals and businesses who have independently raised funds for
            our cause. Thank you for your incredible support.
          </p>
        </div>
        <Link
          href="/fundraise/champs"
          className="text-violet-700 font-medium hover:underline shrink-0"
        >
          View all champs →
        </Link>
      </div>
      <FundraisingChampsGrid champs={preview} />
    </div>
  );
}
