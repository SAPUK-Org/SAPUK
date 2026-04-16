import Hero from "@/components/bookings/hero";
import BookingsSection from "@/components/bookings/bookings-section";
import BookingsInfo from "@/components/bookings/bookings-info";
import Pricing from "@/components/bookings/pricing";

export default function Bookings() {
  return (
    <section className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Hero />

        <BookingsSection />

        <BookingsInfo />

        <Pricing />
      </div>
    </section>
  );
}
