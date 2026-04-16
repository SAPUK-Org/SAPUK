import Link from "next/link";
import { facilitators } from "./bookings-data";

export default function BookingsInfo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Facilitators Section */}
      <div className="bg-card rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-6 border-b border-border pb-4">
          Your Facilitators
        </h2>

        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="font-semibold text-xl text-card-foreground mb-3">
              Danielle Shaw – The founder of SAPUK and your speaker
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Danielle has been within suicidology for over 20 years, learning
              and understanding to the highest capacity from many avenues such
              as experience, educational settings, gaining a psychology research
              degree with honours and numerous accredited courses.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm">
              <Link
                href="/sapfamily"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                See full bio
              </Link>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <a
                href="http://www.danisace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                View more work
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-xl text-card-foreground mb-4">
              Other Facilitators:
            </p>
            <ul className="space-y-3">
              {facilitators.map((facilitator) => (
                <li
                  key={facilitator.name}
                  className="flex items-start gap-3 p-3"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-medium text-card-foreground">
                      {facilitator.name}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      – {facilitator.title}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* What You Will Be Booking Section */}
      <div className="bg-card rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-6 border-b border-border pb-4">
          What You Will Be Booking
        </h2>

        <div className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            You will be booking a 2-hour long Suicide Prevention and Awareness
            seminar. With extra time prior and afterwards and breaks in between.
          </p>

          <div>
            <p className="text-muted-foreground mb-4 font-medium">
              Included will be expert information on:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-card-foreground">
                  Local and national statistics
                </span>
              </li>
              <li className="flex items-start gap-3 p-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-card-foreground">
                  Signs and stigmas behind suicidal thoughts and actions
                </span>
              </li>
              <li className="flex items-start gap-3 p-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-card-foreground">
                  Childhood and adulthood experiences with suicidal thoughts
                </span>
              </li>
              <li className="flex items-start gap-3 p-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-card-foreground">
                  How to safeguard yourself and others
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl text-center">
            <p className="text-card-foreground font-medium">
              Refreshments and suicide prevention packs will be provided to each
              individual attending.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
