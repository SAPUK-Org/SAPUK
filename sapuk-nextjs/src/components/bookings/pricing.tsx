import Image from "next/image";
import { pricingTiers } from "./bookings-data";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-6 border-b border-border pb-4">
        Pricing
      </h2>

      <div className="space-y-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-primary/10 border p-6 rounded-xl text-center">
            <p className="text-card-foreground font-medium text-lg">
              Prior to the event, a deposit of £50.00 is required to secure your
              booking date.
            </p>
          </div>
        </div>

        {/* Donation Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 border-2 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto">
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwZyt0X5lIqLT6HA2VipMYBua9CcjlQnkN84vK"
            alt="Donations QR Code"
            width={128}
            height={128}
            title="Donations QR Code"
            className="rounded-lg"
          />
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_top"
              className="w-full sm:w-auto"
            >
              <input
                name="hosted_button_id"
                type="hidden"
                value="2JVFYQFN9R8E2"
              />
              <Button
                type="submit"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                Donate With PayPal
              </Button>
            </form>
            <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Donate With Stripe
            </Button>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.range}
                className="bg-card border-2 p-6 rounded-xl text-center"
              >
                <p className="font-medium text-card-foreground mb-2">
                  {tier.range}
                </p>
                <p className="text-primary font-bold text-lg">{tier.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
