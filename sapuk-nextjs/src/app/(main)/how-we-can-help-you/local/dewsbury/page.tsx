import Link from "next/link";
import DewsburyLocalServices from "@/components/how-we-can-help-you/local/dewsbury/DewsburyLocalServices";

export default function DewsburyLocalServicesPage() {
  return (
    <section className="bg-white px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/how-we-can-help-you/local"
          className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-violet-700 hover:underline"
        >
          <span>All local services</span>
          <span aria-hidden className="text-slate-300">
            /
          </span>
          <span className="text-violet-700">Dewsbury</span>
        </Link>
        <DewsburyLocalServices />
      </div>
    </section>
  );
}
