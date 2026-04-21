"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IMPORTANT_CONTACTS = [
  {
    name: "Dan (Directors/Senior Management)",
    email: "danielle@suicideapuk.co.uk",
  },
  {
    name: "Jordeey (Directors/Senior Management)",
    email: "jordeey@suicideapuk.co.uk",
  },
  {
    name: "Beck (Directors/Senior Management)",
    email: "beck@suicideapuk.co.uk",
  },
  {
    name: "Heidi (Directors/Senior Management)",
    email: "heidi@suicideapuk.co.uk",
  },
  { name: "Andie (Managers)", email: "andie@suicideapuk.co.uk" },
  { name: "Becca (Managers)", email: "becca@suicideapuk.co.uk" },
  {
    name: "Nathaniel (Chat Supervisors)",
    email: "sapsupervisor@suicideapuk.co.uk",
  },
  {
    name: "Abbey (Chat Supervisors)",
    email: "sapsupervisor@suicideapuk.co.uk",
  },
  {
    name: "Nomvula (Chat Supervisors)",
    email: "sapsupervisor@suicideapuk.co.uk",
  },
  {
    name: "Dewsbury Office (Events Team)",
    email: "dewsburyoffice@suicideapuk.co.uk",
  },
  { name: "Mark (Events Team)", email: "mark@suicideapuk.co.uk" },
  { name: "Jamie (Events Team)", email: "jamie@suicideapuk.co.uk" },
  {
    name: "Lancashire Office (Events Team)",
    email: "lancashireoffice@suicideapuk.co.uk",
  },
  { name: "SAP Admin", email: "sapadmin@suicideapuk.co.uk" },
  { name: "Fundraising", email: "fundraising@suicideapuk.co.uk" },
  { name: "Newsletter", email: "newsletter@suicideapuk.co.uk" },
  { name: "HR", email: "hr@suicideapuk.co.uk" },
] as const;

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  contact: z.string().min(1, "Please select who to contact"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      form.reset();

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="w-full h-fit max-w-3xl mx-auto lg:max-w-none lg:mx-0 py-8 mb-12 lg:mb-0 bg-blue-50/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-blue-100 lg:min-w-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Who would you like to contact?{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a contact" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      position="popper"
                      sideOffset={4}
                      className="max-h-[min(16rem,70vh)]"
                    >
                      {IMPORTANT_CONTACTS.map((contact) => (
                        <SelectItem
                          key={`${contact.email}-${contact.name}`}
                          value={`${contact.email}|${contact.name}`}
                        >
                          {contact.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Comment or Message <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center">
            <Button
              variant="outline"
              type="submit"
              disabled={isSubmitting}
              className="w-fit bg-button-blue text-white font-semibold hover:bg-button-blue/80 hover:text-white"
            >
              Submit
            </Button>
          </div>

          {submitStatus === "success" && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
              Thank you for your message. We'll get back to you soon!
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
              There was an error submitting your message. Please try again.
            </div>
          )}
        </form>
      </Form>
    </section>
  );
}
