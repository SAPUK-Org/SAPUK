"use client";

import Image from "next/image";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { NewsletterFormData, SubmissionResponse } from "@/types";

export default function NewsletterSignupForm() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: "",
    firstName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as SubmissionResponse;

      if (data.success) {
        toast.success(data.message);
        setFormData({ email: "", firstName: "" });
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="newsletter-first-name"
          className="mb-2 block text-xs font-black text-slate-700"
        >
          First name
        </label>
        <input
          id="newsletter-first-name"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
          className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      <div>
        <label
          htmlFor="newsletter-email"
          className="mb-2 block text-xs font-black text-slate-700"
        >
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-lg bg-amber-400 px-5 text-xs font-black text-slate-950 shadow-none hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Powered by</span>
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwOOxoOoD8NQwMH653xlI4dYPbUV9vmJRzgcES"
            alt="Mailchimp"
            width={100}
            height={100}
            className="h-8 w-14 object-contain"
          />
        </div>
      </div>
    </form>
  );
}
