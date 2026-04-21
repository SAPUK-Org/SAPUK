import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-gradient-to-r from-[#2ac4ea] to-[#ca28e2] bg-opacity-30 rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Want to join our community?
        </h2>
        <p className="mb-6 text-gray-800">
          Share your story, blog, or community initiative with us and become
          part of the SAPUK network.
        </p>
        <Link
          href="mailto:community@suicideapuk.co.uk"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full inline-block sm:inline-flex justify-center transition-colors w-full sm:w-auto"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
