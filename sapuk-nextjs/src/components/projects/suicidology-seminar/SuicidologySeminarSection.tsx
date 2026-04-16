import Image from "next/image";
import Link from "next/link";

export default function SuicidologySeminarSection() {
  return (
    <>
      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="flex justify-center">
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwgQYJlA0dbDFNzJK5pSw7XZsCkn2Bah8OlqQx"
            alt="Suicidology Seminar"
            width={1080}
            height={1080}
            className="rounded-xl shadow-lg w-full h-auto max-w-md pointer-events-none select-none"
            priority
          />
        </div>
        <div className="flex justify-center items-center">
          <Link
            href="http://www.danisace.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <Image
              src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwEAJJ9H43QmOTC9eAt5UV4J1gyh6ujKqZw2Dk"
              alt="Dan's Blog Link"
              width={772}
              height={295}
              className="rounded-xl shadow-lg w-full h-auto max-w-md pointer-events-none select-none"
            />
          </Link>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Seminars with Dan – Walk through
        </h3>

        <div className="space-y-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-gray-700">
          <p>
            Podcast will become available; please sign up to our newsletter for
            information on how to join our public webinar.
          </p>

          <p>
            Please note Dan is a Suicidologist, all information is relayed via a
            BSc Psychology Research degree with honours with undergoing
            intensive Suicidology courses and certifications. Safeguard level 2,
            Enhanced DBS.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 pt-4">
            Suicide Prevention and Awareness with Suicidologist Dan from SAPUK
          </p>

          <p>
            2 hours awareness workshop. Available to book via{" "}
            <Link
              href="mailto:booking@suicideapuk.co.uk"
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              booking@suicideapuk.co.uk
            </Link>{" "}
            or you can use the form below;
          </p>

          <p>
            These workshops are created to bring awareness within the community
            around Suicidology, help individuals to understand themselves with
            potential of creating life changing coping skills.{" "}
            <strong className="text-gray-900">A SAFE SPACE.</strong>
          </p>

          <p>
            Grimsargh Hall in Longridge will be a regular appearance, as we have
            a promise on Preston to reduce the figures;
          </p>

          <p>
            Accommodate 50-100, each individual will have a drink and a snack
            provided if capacity is available, a pack with information, and will
            have interaction via the Facilitator. Risk assessments will be
            carried out
          </p>

          <p>Certificate off attendance, donations link.</p>

          <p>
            Extra 30 mins for before and afterwards for set-up and safe space;
          </p>

          <div className="pt-4 space-y-2">
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Welcome and introduction
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Trigger warning. Include interaction.
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Suicidology, as a whole
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Suicidology – Historically
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Suicidology – up to date facts
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Suicidology – individual differences
            </p>
            <p className="font-bold text-base sm:text-lg text-blue-600 pt-2">
              Questions & Break
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Suicidology – Psychologically
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Suicidology – Biologically
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Suicidology – Neurodivergency
            </p>
            <p className="font-semibold text-base sm:text-lg text-gray-900">
              Suicidology – Environmentally
            </p>
            <p className="font-bold text-base sm:text-lg text-blue-600 pt-2">
              Questions
            </p>
          </div>
        </div>
      </div>

      {/* Blog Link Section */}
      <div className="text-center mt-8">
        <p className="text-base md:text-lg text-gray-600">
          Click{" "}
          <Link
            href="http://www.danisace.com"
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline inline-flex items-center gap-1"
          >
            Say Hey above
            <span className="text-xl">✌️</span>
          </Link>{" "}
          for a diversion to Dan&apos;s Blog
        </p>
      </div>
    </>
  );
}
