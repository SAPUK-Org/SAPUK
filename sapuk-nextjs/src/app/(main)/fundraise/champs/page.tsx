import type { Metadata } from "next";
import { fetchPublicFundraisingChamps } from "@/lib/cms-public";
import FundraisingChampsGrid from "@/components/fundraise/FundraisingChampsGrid";

export const metadata: Metadata = {
  title: "Fundraising Champs - SAP;UK",
  description:
    "Meet the individuals and businesses who have independently raised funds for SAP;UK.",
};

export const dynamic = "force-dynamic";

export default async function FundraisingChampsPage() {
  const champs = await fetchPublicFundraisingChamps();

  return (
    <section className="bg-saphub-bg pt-20 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="w-[95%] max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Fundraising Champs
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            These are individuals and businesses who have independently raised
            funds for our cause. The UK Semicolon Project sees hundreds of tattoo
            artists help raise awareness for suicide prevention, and we are
            grateful to every studio and supporter who donates to us each year.
          </p>
        </header>
        <FundraisingChampsGrid champs={champs} />
      </div>
    </section>
  );
}
