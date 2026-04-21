import Link from "next/link";

export default function CustomMaterialsCta() {
  return (
    <div className="mt-16 bg-gradient-to-r from-[#2ac4ea] to-[#ca28e2] bg-opacity-30 rounded-lg shadow-md p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Need Custom Materials?</h2>
      <p className="mb-6">
        If you need custom materials for your organisation, school, or community
        event, please contact us. We can provide tailored resources to help
        spread awareness about suicide prevention.
      </p>
      <Link
        href="mailto:media@suicideapuk.co.uk"
        className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full inline-block transition-colors"
      >
        Request Custom Materials
      </Link>
    </div>
  );
}
