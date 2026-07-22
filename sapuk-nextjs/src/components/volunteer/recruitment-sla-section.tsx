import EnlargeableImage from "@/components/EnlargeableImage";

const RECRUITMENT_SLA_POSTER_SRC =
  "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNYmkEzborWUh5ZuXr2yx8FazDCjcLqM3ONlvn";

const RECRUITMENT_SLA_ALT =
  "SAPUK volunteer recruitment SLA — response times and commitments to prospective volunteers";

export default function RecruitmentSlaSection() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Recruitment SLA</h2>
        <p className="text-zinc-800 text-base sm:text-lg">
          When you apply to volunteer with SAPUK, we want you to know exactly
          what to expect. Our Recruitment Service Level Agreement sets out the
          response times for each stage of the process — from acknowledging
          your application to scheduling interviews and onboarding.
        </p>
        <p className="text-zinc-800 text-base sm:text-lg">
          We are committed to keeping you informed at every step. If you have
          not heard from us within the timeframe shown, please contact{" "}
          <a
            href="mailto:volunteer@suicideapuk.co.uk"
            className="text-link hover:underline"
          >
            volunteer@suicideapuk.co.uk
          </a>
          .
        </p>
      </div>

      <div className="flex justify-center">
        <EnlargeableImage
          src={RECRUITMENT_SLA_POSTER_SRC}
          alt={RECRUITMENT_SLA_ALT}
          width={400}
          height={560}
          className="w-full max-w-[400px]"
          enlargeLabel="Enlarge recruitment SLA poster"
          dialogTitle="Recruitment SLA poster"
          dialogDescription="Enlarged view of the volunteer recruitment service level agreement. Scroll if the image is taller than the screen."
        />
      </div>
    </div>
  );
}
