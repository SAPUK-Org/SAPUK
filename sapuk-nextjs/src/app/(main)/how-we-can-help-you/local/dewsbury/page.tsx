import Link from "next/link";
import DewsburyLocalServices from "@/components/how-we-can-help-you/local/dewsbury/DewsburyLocalServices";

export default function DewsburyLocalServicesPage() {
  return (
    <section className="bg-saphub-bg pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <Link
          href="/how-we-can-help-you/local"
          className="inline-block mb-8 text-sm text-link font-medium hover:underline"
        >
          ← All local services
        </Link>
        <div className="bg-white rounded-lg shadow-md p-8 md:p-10">
          <DewsburyLocalServices />
        </div>
      </div>
    </section>
  );
}
