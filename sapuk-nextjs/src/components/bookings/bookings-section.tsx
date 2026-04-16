import Link from "next/link";

export default function BookingsSection() {
  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-6 border-b border-border pb-4">
        How to Book
      </h2>
      <div className="space-y-4">
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          To book a SAPUK facilitator please enquire
          <Link
            href="/contact"
            className="text-primary hover:text-primary/80 transition-colors mx-1 font-medium"
          >
            here
          </Link>
          or if you are having difficulty accessing this online form, please
          contact
          <span className="font-semibold text-card-foreground">
            {" "}
            bookings@suicideapuk.co.uk
          </span>
          . Booking a SAPUK facilitator within your workspace / community centre
          / educational settings means you will gain an understanding into
          suicidology, its causes and its actions for prevention and creating
          awareness. Group bookings can be of 5 individuals to 100 individuals,
          for larger bookings please enquire prior to booking. For 1-1 support
          with a facilitator please contact
          <span className="font-semibold text-card-foreground">
            {" "}
            danielle@suicideapuk.co.uk
          </span>
        </p>
      </div>
    </div>
  );
}
