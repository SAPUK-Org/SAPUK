import Image from "next/image";
import Link from "next/link";

export default function StudentsHero() {
  return (
    <div className="mb-12 mt-10 lg:mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <div className="flex-1 space-y-6 mx-8 lg:mr-8">
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Dedicated resources and support for students navigating mental
            health challenges
          </p>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-card-foreground">
                Need Support?
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="text-base leading-relaxed">
                  If you require support, please use the chat icon on the left
                  or email{" "}
                  <Link
                    href="mailto:becky@sucideapuk.co.uk"
                    className="text-primary hover:text-primary/80 transition-colors duration-200 ease-in-out font-medium"
                  >
                    becky@sucideapuk.co.uk
                  </Link>
                </p>
                <p className="text-base leading-relaxed">
                  Living with suicidal thoughts can be challenging, which is why
                  we are here to help. Please also reach out for support from
                  your tutors, teachers and pastoral team.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative">
            <Image
              src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpw1HiiEoKR0g23FTfWvJU47naCq9ltMSxu8hos"
              alt="Students support illustration"
              width={400}
              height={400}
              className="rounded-2xl shadow-lg object-cover w-full lg:w-2/3 max-w-md pointer-events-none select-none"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
