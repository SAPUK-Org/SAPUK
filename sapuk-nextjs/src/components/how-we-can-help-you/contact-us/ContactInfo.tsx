import Image from "next/image";
import Link from "next/link";

export default function ContactInfo() {
  return (
    <section className="flex flex-col gap-8 items-center justify-center">
      <div className="bg-[#7cbddd] rounded-lg p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-3">We&apos;re here to help</h2>
        <div className="space-y-6">
          <div>
            <p className="font-semibold">By post -</p>
            <p>
              Suicide Awareness Prevention UK
              <br />
              1 Haslingden Road, Blackburn
              <br />
              BB1 2FD
            </p>
          </div>
          <div>
            <p className="font-semibold">General inquiries -</p>
            <p>admin@suicideapuk.co.uk</p>
          </div>
          <div>
            <p className="font-semibold">Dewsbury (Kirklees) -</p>
            <p>
              Events and local programmes:{" "}
              <Link
                href="/how-we-can-help-you/local/dewsbury"
                className="text-link font-medium hover:underline"
              >
                view local services
              </Link>
              {" · "}
              <a
                href="mailto:dewsburyoffice@suicideapuk.co.uk"
                className="text-link font-medium hover:underline"
              >
                dewsburyoffice@suicideapuk.co.uk
              </a>
            </p>
          </div>
          <div>
            <p className="font-semibold">Lancashire -</p>
            <p>
              Events and local programmes:{" "}
              <Link
                href="/how-we-can-help-you/local/lancashire"
                className="text-link font-medium hover:underline"
              >
                view local services
              </Link>
              {" · "}
              <a
                href="mailto:lancashireoffice@suicideapuk.co.uk"
                className="text-link font-medium hover:underline"
              >
                lancashireoffice@suicideapuk.co.uk
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center lg:justify-start">
        <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpw5b4c7L6SMqsuWKnAGv8gf9Bci645OdZhQ7xR"
            alt="Purple Semicolon"
            fill
            className="object-contain rounded-lg pointer-events-none"
            priority
          />
        </div>
      </div>
    </section>
  );
}
