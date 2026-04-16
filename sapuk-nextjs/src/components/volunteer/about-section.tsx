"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
      <div className="lg:col-span-2 prose prose-lg max-w-none">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Us</h2>
        <p className="text-zinc-800 text-base sm:text-lg">
          At SAPUK, we believe no one should suffer alone. Yet, 70% of people
          seeking support for their mental health still don&apos;t receive it.
          Every day, from 6am to 11pm, our dedicated volunteers offer guidance,
          conversation, and hope to those in distress. Whether through a chat,
          admin support, fundraising, or event organising, every role at SAPUK
          makes a difference.
        </p>
        <h3 className="text-zinc-800 text-xl font-bold mt-4 mb-1">
          Volunteer Opportunities
        </h3>
        <p className="text-zinc-800 text-base sm:text-lg">
          We offer both remote and in-person roles to suit different skills,
          interests, and availability.
        </p>
        <h3 className="text-zinc-800 text-xl font-bold mt-4 mb-1">
          Remote Chat Volunteers
        </h3>
        <p className="text-zinc-800 text-base sm:text-lg">
          Offer real-time, confidential support to individuals experiencing
          emotional distress. After three months, there&apos;s an opportunity to
          progress into a Supervisor role where you can help guide and support
          new volunteers.
        </p>
        <h3 className="text-zinc-800 text-xl font-bold mt-4 mb-1">
          Fundraising Assistants (Remote)
        </h3>
        <p className="text-zinc-800 text-base sm:text-lg">
          Support SAPUK&apos;s mission by helping to develop and deliver
          fundraising campaigns, seek sponsorships, and create new ways to raise
          essential funds online.
        </p>
      </div>

      <div className="flex flex-col gap-4 my-auto">
        <h3 className="text-zinc-800 text-xl font-bold">Volunteer With Us</h3>
        <Link href="/volunteer/form">
          <Button
            variant="outline"
            className="w-fit bg-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-300 hover:text-zinc-900"
          >
            Volunteer Form
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <p className="text-zinc-800">
          Email it to: <br /> volunteer@suicideapuk.co.uk
        </p>
        <hr className="w-4/5" />
        <h3 className="text-zinc-800">Who can apply?</h3>
        <ul className="list-disc list-inside text-zinc-800 space-y-1.5">
          <li>Empathetic and open minded people</li>
          <li>18+</li>
          <li>UK based</li>
          <li>Reliable and professional</li>
          <li>Willing to learn and grow</li>
          <li>Committed to supporting others</li>
          <li>Passionate about mental health and suicide prevention</li>
        </ul>
      </div>
    </div>
  );
}
