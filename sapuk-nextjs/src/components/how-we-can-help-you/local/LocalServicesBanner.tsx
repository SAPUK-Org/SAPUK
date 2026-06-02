import Link from "next/link";

export default function LocalServicesBanner() {
  return (
    <div className="mb-8 rounded-lg border border-[#7cbddd]/40 bg-[#7cbddd]/10 px-4 py-3 text-sm text-zinc-800">
      Looking for local programmes? See{" "}
      <Link
        href="/how-we-can-help-you/local"
        className="font-medium text-link hover:underline"
      >
        Local Services
      </Link>
      {" → "}
      <Link
        href="/how-we-can-help-you/local/dewsbury"
        className="font-medium text-link hover:underline"
      >
        Dewsbury (Kirklees)
      </Link>
      {" · "}
      <Link
        href="/how-we-can-help-you/local/lancashire"
        className="font-medium text-link hover:underline"
      >
        Lancashire
      </Link>
    </div>
  );
}
