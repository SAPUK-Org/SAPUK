"use client";

import { Button } from "@/components/ui/button";

export default function ContactCTA() {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Ready to Start Fundraising?</h2>
      <p className="mb-6">
        Contact us today to discuss your fundraising ideas and how we can
        support you.
      </p>
      <Button
        variant="contact"
        onClick={() => {
          window.location.href = "mailto:fundraising@suicideapuk.co.uk";
        }}
        className="cursor-pointer"
      >
        Contact Us
      </Button>
    </div>
  );
}
