"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { NewsletterFormData, SubmissionResponse } from "@/types";
import { Button } from "@/components/ui/button";

export default function NewsletterForm() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: "",
    firstName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: SubmissionResponse = await res.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({ email: "", firstName: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white px-4 py-6 sm:px-6 sm:py-8 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100">
      <h2 className="text-xl sm:text-2xl text-center font-bold mb-4 sm:mb-6 text-gray-800 relative">
        Stay Updated
        <hr className="w-full max-w-xs sm:max-w-sm md:max-w-md border-button-blue border-1 mt-2 mx-auto" />
      </h2>
      <p className="mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
        Subscribe to our newsletter to receive the latest updates, resources,
        and community news.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div className="transform transition duration-200 hover:translate-x-0 sm:hover:translate-x-1">
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
            placeholder="Enter your first name"
          />
        </div>

        <div className="transform transition duration-200 hover:translate-x-0 sm:hover:translate-x-1">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
            required
            placeholder="Enter your email address"
          />
        </div>

        <div className="flex items-center justify-between md:justify-center gap-4">
          <Button
            variant="outline"
            type="submit"
            disabled={isSubmitting}
            className="w-fit bg-button-blue text-white font-semibold hover:bg-button-blue/80 hover:text-white"
          >
            Subscribe
          </Button>
          <div className="flex items-center justify-center md:justify-end">
            <Image
              src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwOOxoOoD8NQwMH653xlI4dYPbUV9vmJRzgcES"
              alt="Mailchimp Logo"
              width={100}
              height={100}
              className="w-16 h-10 sm:w-20 sm:h-12"
              priority
            />
          </div>
        </div>
      </form>
    </div>
  );
}
