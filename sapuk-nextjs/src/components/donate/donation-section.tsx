import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CopyField from "@/components/ui/copy-field";

const UK_BANK_DETAILS = {
  accountName: "SAPUK",
  accountNumber: "67324431",
  sortCode: "08-92-99",
} as const;

export default function DonationSection() {
  return (
    <div className="mb-12 space-y-10">
      <Card className="mx-auto max-w-3xl overflow-hidden border-blue-200/80 bg-card shadow-md">
        <CardHeader className="space-y-2 border-b pb-4 text-center sm:text-left">
          <CardTitle className="text-2xl">Make a donation</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            Choose bank transfer (no platform fees) or PayPal - every gift helps
            us train volunteers and run our services.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="space-y-4 p-6 sm:p-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Bank transfer (UK)
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Copy each detail into your banking app. More of your donation
                  reaches us this way.
                </p>
              </div>
              <div className="space-y-3">
                <CopyField
                  label="Account name"
                  value={UK_BANK_DETAILS.accountName}
                />
                <CopyField
                  label="Account number"
                  value={UK_BANK_DETAILS.accountNumber}
                />
                <CopyField label="Sort code" value={UK_BANK_DETAILS.sortCode} />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 border-t border-border p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="w-full max-w-xs text-center lg:text-left">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  PayPal
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Donate with a card or your PayPal balance.
                </p>
              </div>
              <form
                action="https://www.paypal.com/donate"
                method="post"
                target="_top"
                className="flex justify-center lg:justify-start"
              >
                <Input
                  name="hosted_button_id"
                  type="hidden"
                  value="2JVFYQFN9R8E2"
                />
                <button
                  type="submit"
                  className="inline-block rounded-md ring-offset-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Image
                    src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif"
                    alt="Donate with PayPal"
                    width={150}
                    height={47}
                    priority
                  />
                </button>
              </form>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t px-6 py-4 sm:px-8">
          <p className="text-center text-xs text-muted-foreground leading-relaxed sm:text-left">
            Please use your name as the payment reference where possible. We
            will never email you asking you to change these bank details.
          </p>
        </CardFooter>
      </Card>

      <blockquote className="mx-auto max-w-3xl border-l-4 border-blue-500 py-2 pl-4 text-center italic text-gray-700 sm:text-left">
        <p className="mb-4">
          We appreciate every £1 that is donated to us as it allows us to fund
          our missions of preventing suicide;
        </p>
        <p className="text-center">
          <em>
            &quot;It has never been a priority at SAPUK to gain funds, that is
            why you have never seen us asking for them...&quot;
          </em>
        </p>
      </blockquote>
    </div>
  );
}
