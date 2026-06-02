import Link from "next/link";
import LancashireLocalServices from "@/components/how-we-can-help-you/local/lancashire/LancashireLocalServices";

export default function LancashireLocalServicesPage() {
  return (
    <section className="bg-saphub-bg pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <Link
          href="/how-we-can-help-you/local"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-link transition-colors hover:underline"
        >
          <span aria-hidden>←</span> All local services
        </Link>
        <LancashireLocalServices />
      </div>
    </section>
  );
}
