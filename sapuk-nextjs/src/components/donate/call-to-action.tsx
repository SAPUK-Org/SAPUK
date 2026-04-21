import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="text-center mt-8 mb-12">
      <Link
        href="/sapservices/thesapchat"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full inline-block transition-colors"
      >
        Get Support Now
      </Link>
    </div>
  );
}
