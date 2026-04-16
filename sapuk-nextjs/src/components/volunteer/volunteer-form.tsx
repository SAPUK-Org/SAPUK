"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Form validation schema
const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  primaryPhone: z.string().optional(),
  secondaryPhone: z.string().optional(),

  // Eligibility
  entitledToWork: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  over18: z.enum(["Yes", "No"], { message: "Please select an option" }),
  ageIfNo: z.number().optional(),
  hasUnspentConvictions: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  hasSpentConvictions: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  convictionsDetails: z.string().optional(),
  hasDBS: z.enum(["Yes", "No"], { message: "Please select an option" }),
  consentDBS: z.enum(["Yes", "No"]).optional(),

  // Position Details
  positionApplyingFor: z.string().min(1, "Please select a position"),
  howDidYouHear: z.string().min(1, "This field is required"),
  weeklyHours: z.number().min(0).optional(),
  dateAvailable: z.string().optional(),
  availableDays: z.array(z.string()).optional(),

  // About You
  whyVolunteer: z.string().min(1, "Please tell us why you want to volunteer"),
  skillsTrainingExperience: z.string().optional(),
  mentalHealthTraining: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  trainingDetails: z.string().optional(),
  hobbiesInterests: z.string().optional(),

  // References
  ref1Name: z.string().min(1, "Reference name is required"),
  ref1Email: z.string().email("Invalid email address"),
  ref1Company: z.string().min(1, "Company name is required"),
  ref1JobTitle: z.string().min(1, "Job title is required"),
  ref2Name: z.string().min(1, "Reference name is required"),
  ref2Email: z.string().email("Invalid email address"),
  ref2Org: z.string().min(1, "Organization name is required"),
  ref2Title: z.string().min(1, "Job/Course title is required"),

  // Declaration
  signature: z.string().optional(),
  date: z.string().optional(),
});

export default function VolunteerApplicationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availableDays: [],
    },
  });

  const handleSaveDocument = () => {
    const formData = form.getValues();

    // Generate the HTML content
    const outputHtml = generateDocumentHtml(formData);

    // Create and download the HTML file
    const blob = new Blob([outputHtml], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Sanitize role name for filename
    const sanitizeRoleForFilename = (role: string) => {
      return role
        .replace(/[^a-zA-Z0-9]/g, "_")
        .replace(/__/g, "_")
        .replace(/_$/, "");
    };

    const sanitizedRole = sanitizeRoleForFilename(
      formData.positionApplyingFor || "Volunteer_Application"
    );
    const downloadFilename = `${sanitizedRole}_${formData.firstName}_${formData.lastName}.html`;

    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleCreateEmail = () => {
    const formData = form.getValues();

    // Get the required data for the email
    const firstName = formData.firstName || "Applicant";
    const lastName = formData.lastName || "";
    const appliedRole = formData.positionApplyingFor || "Volunteer Application";

    // Sanitize role name for subject line
    const sanitizeRoleForFilename = (role: string) => {
      return role
        .replace(/[^a-zA-Z0-9]/g, "_")
        .replace(/__/g, "_")
        .replace(/_$/, "");
    };

    const sanitizedRole = sanitizeRoleForFilename(appliedRole);
    const recipientEmail = "volunteer@suicideapuk.co.uk";
    const fullName = `${firstName} ${lastName}`.trim();
    const subject = encodeURIComponent(`${appliedRole} - ${fullName}`);

    const emailBody = encodeURIComponent(
      `Dear SAPUK Team,\n\n` +
        `I have completed and downloaded my volunteer application form.\n\n` +
        `Position Applied For: ${appliedRole}\n` +
        `Full Name: ${fullName}\n\n` +
        `**_IMPORTANT: Please remember to attach the application document (downloaded to your device) to ensure your submission is complete._**\n\n` +
        `To further support your application, please feel free to attach your CV or a cover letter if you wish.\n\n` +
        `Sincerely,\n` +
        `${fullName}`
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${emailBody}`;
    window.location.href = mailtoLink;

    // Show success message
    toast.success(
      "Email template has been prepared. Please send the email to complete your submission."
    );
  };

  const generateDocumentHtml = (data: z.infer<typeof formSchema>) => {
    // Helper function to get value or 'N/A'
    const getValue = (key: keyof typeof data) => {
      const value = data[key];
      if (value === undefined || value === null || value === "") return "N/A";
      if (Array.isArray(value)) {
        return value.length > 0 ? value.join(", ") : "N/A";
      }
      return String(value).trim();
    };

    // Helper to add a simple field row
    const addField = (label: string, value: string) => {
      return `<div class="field"><span class="field-label">${label}:</span> <span class="field-value">${value}</span></div>`;
    };

    const outputHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Volunteer Application - ${getValue("firstName")} ${getValue(
      "lastName"
    )}</title>
<style>
body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 20px; }
.container { max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fff; }
h1, h2, h3 { color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px; }
h1 { text-align: center; }
.section-title { font-weight: bold; margin-top: 15px; margin-bottom: 5px; }
.field { margin-bottom: 10px; }
.field-label { font-weight: bold; display: inline-block; width: 200px; vertical-align: top; }
.field-value { display: inline-block; vertical-align: top; max-width: calc(100% - 210px); }
.textarea-value { white-space: pre-wrap; word-wrap: break-word; }
.disclaimer { font-size: 0.8em; color: #555; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
</style>
</head>
<body>
<div class="container">
<h1>Volunteer Application Form</h1>
<p style="text-align: center; font-size: 0.9em;">
<strong>Suicide Awareness Prevention UK (SAPUK)</strong><br>
</p>
<hr>

<h2>1. Personal Information</h2>
${addField("Last Name", getValue("lastName"))}
${addField("First Name", getValue("firstName"))}
${addField("Email Address", getValue("email"))}
${addField("Street Address", getValue("streetAddress"))}
${addField("City", getValue("city"))}
${addField("Postal Code", getValue("postalCode"))}
${addField("Primary Phone Number", getValue("primaryPhone"))}
${addField("Secondary Phone Number", getValue("secondaryPhone"))}

<h2>2. Eligibility & Disclosures</h2>
${addField("Legally entitled to work in UK", getValue("entitledToWork"))}
${addField("Over 18", getValue("over18"))}
${
  getValue("over18") === "No"
    ? addField("Current Age (if under 18)", getValue("ageIfNo"))
    : ""
}
${addField(
  "Unspent Convictions (Rehabilitation of Offenders Act 1974)",
  getValue("hasUnspentConvictions")
)}
${addField(
  "Spent Convictions (that are not filtered)",
  getValue("hasSpentConvictions")
)}
${
  getValue("convictionsDetails") !== "N/A"
    ? `<div class="field"><span class="field-label">Details of Convictions:</span><br><span class="field-value textarea-value">${getValue(
        "convictionsDetails"
      )}</span></div>`
    : ""
}
${addField("Holds Valid DBS certificate", getValue("hasDBS"))}
${
  getValue("hasDBS") === "No"
    ? addField("Consent to basic DBS check", getValue("consentDBS"))
    : ""
}

<h2>3. Position Details & Availability</h2>
${addField("Volunteer Position Applying For", getValue("positionApplyingFor"))}
${addField(
  "How did you hear about this opportunity",
  getValue("howDidYouHear")
)}
${addField("Weekly Hours", getValue("weeklyHours"))}
${addField("Date Available to Start", getValue("dateAvailable"))}
${addField("Days/Hours Available", getValue("availableDays"))}

<h2>4. About You</h2>
<div class="field"><span class="field-label">Why volunteer for SAPUK:</span><br><span class="field-value textarea-value">${getValue(
      "whyVolunteer"
    )}</span></div>
<div class="field"><span class="field-label">Relevant Skills/Training/Experiences:</span><br><span class="field-value textarea-value">${getValue(
      "skillsTrainingExperience"
    )}</span></div>
${addField("Mental Health Training/Courses", getValue("mentalHealthTraining"))}
${
  getValue("mentalHealthTraining") === "Yes"
    ? `<div class="field"><span class="field-label">Training Details:</span><br><span class="field-value textarea-value">${getValue(
        "trainingDetails"
      )}</span></div>`
    : ""
}
<div class="field"><span class="field-label">Hobbies/Interests:</span><br><span class="field-value textarea-value">${getValue(
      "hobbiesInterests"
    )}</span></div>

<h2>5. References</h2>
<div class="section-title">Reference 1 (MUST BE WORK):</div>
${addField("Name", getValue("ref1Name"))}
${addField("Email", getValue("ref1Email"))}
${addField("Company Name", getValue("ref1Company"))}
${addField("Your Job Title", getValue("ref1JobTitle"))}

<div class="section-title">Reference 2 (Work or Education):</div>
${addField("Name", getValue("ref2Name"))}
${addField("Email", getValue("ref2Email"))}
${addField("Company or Institution Name", getValue("ref2Org"))}
${addField("Your Job or Course Title", getValue("ref2Title"))}

<h2>6. Declaration</h2>
${addField("Signature of Applicant", getValue("signature"))}
${addField("Date", getValue("date"))}

<div class="disclaimer">
<p><strong>Disclaimer:</strong> By signing, I hereby certify that the above information, to the best of my knowledge, is correct. I understand that falsification of this information may prevent me from being hired or lead to my dismissal if accepted.</p>
<p>By signing, you are also acknowledging that you understand that this role requires a high level of confidentiality and that you are agreeing to not screenshot, share or discuss in any way anything or anyone that uses this service or its contents.</p>
<p>Suicide Awareness Prevention UK (SAPUK) will not discriminate against race, colour, religion, sex, national origin, age, disability, or genetics in accordance with the Equality Act 2010 to all employees and applicants. This policy applies to all terms and conditions of employment, including recruiting, hiring, placement, promotion, termination, layoff, recall, transfer, leaves of absence, compensation, and training. – For more information, please see: <a href="https://www.gov.uk/guidance/equality-act-2010-guidance" target="_blank">https://www.gov.uk/guidance/equality-act-2010-guidance</a></p>
<p>In accordance with the Data Protection Act 2018 - If you choose not to go forward with your volunteering at Suicide Awareness Prevention UK or wish to take a break, your details will be kept in our confidential files for 12 months. If you wish to volunteer with us after this time, you must re-apply.</p>
<p>Suicide Awareness Prevention UK will retain your personal information for a maximum of 12 months, after this time your data will be destroyed. If you wish for us to destroy your data before this, please let us know by contacting: volunteer@suicideapuk.co.uk. For more information on the Data Protection Act 2018, please see: <a href="https://www.gov.uk/data-protection" target="_blank">https://www.gov.uk/data-protection</a></p>
</div>
</div>
</body>
</html>
`;

    return outputHtml;
  };

  const dayOptions = [
    { id: "monday", label: "Monday", value: "Monday" },
    { id: "tuesday", label: "Tuesday", value: "Tuesday" },
    { id: "wednesday", label: "Wednesday", value: "Wednesday" },
    { id: "thursday", label: "Thursday", value: "Thursday" },
    { id: "friday", label: "Friday", value: "Friday" },
    { id: "weekends", label: "Weekends", value: "Weekends" },
    { id: "noPreference", label: "No Preference", value: "No Preference" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Volunteer Application Form
        </h1>
        <div className="text-gray-600 mb-8">
          <p className="font-semibold">
            Suicide Awareness Prevention UK (SAPUK)
          </p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                1. Personal Information
              </CardTitle>
              <CardDescription>
                Please provide your personal details accurately.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="primaryPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondaryPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Eligibility & Disclosures */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                2. Eligibility & Disclosures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="entitledToWork"
                render={({ field }) => (
                  <FormItem className="bg-gray-50 p-4 rounded-lg">
                    <FormLabel className="text-base font-medium">
                      Are you legally entitled to work in the United Kingdom?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" id="entitled-yes" />
                          <Label htmlFor="entitled-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id="entitled-no" />
                          <Label htmlFor="entitled-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="over18"
                render={({ field }) => (
                  <FormItem className="bg-gray-50 p-4 rounded-lg">
                    <FormLabel className="text-base font-medium">
                      Are you over the age of 18?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" id="over18-yes" />
                          <Label htmlFor="over18-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id="over18-no" />
                          <Label htmlFor="over18-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ageIfNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      If No (to being over 18), please state your current age:
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Criminal Convictions Section */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasUnspentConvictions"
                  render={({ field }) => (
                    <FormItem className="bg-red-50 p-4 rounded-lg">
                      <FormLabel className="text-base font-medium">
                        Do you have any <strong>unspent</strong> convictions
                        under the Rehabilitation of Offenders Act 1974?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="unspent-yes" />
                            <Label htmlFor="unspent-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="unspent-no" />
                            <Label htmlFor="unspent-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Alert>
                  <AlertDescription>
                    Because this role involves working with vulnerable adults,
                    you are also required to declare{" "}
                    <strong>any spent convictions</strong> as this position is
                    exempt from the Rehabilitation of Offenders Act 1974.
                  </AlertDescription>
                </Alert>

                <FormField
                  control={form.control}
                  name="hasSpentConvictions"
                  render={({ field }) => (
                    <FormItem className="bg-red-50 p-4 rounded-lg">
                      <FormLabel className="text-base font-medium">
                        Do you have any <strong>spent</strong> convictions that
                        are not filtered?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="spent-yes" />
                            <Label htmlFor="spent-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="spent-no" />
                            <Label htmlFor="spent-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="convictionsDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        If you have answered 'Yes' to either of the above,
                        please provide full details below (offence, date of
                        conviction, sentence):
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="hasDBS"
                render={({ field }) => (
                  <FormItem className="bg-gray-50 p-4 rounded-lg">
                    <FormLabel className="text-base font-medium">
                      Do you currently hold a current / valid Disclosure and
                      Barring Service (DBS) certificate?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" id="dbs-yes" />
                          <Label htmlFor="dbs-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id="dbs-no" />
                          <Label htmlFor="dbs-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consentDBS"
                render={({ field }) => (
                  <FormItem className="bg-gray-50 p-4 rounded-lg">
                    <FormLabel className="text-base font-medium">
                      If No (to holding DBS), do you consent to a basic DBS
                      check for volunteering with SAPUK?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" id="consent-yes" />
                          <Label htmlFor="consent-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id="consent-no" />
                          <Label htmlFor="consent-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Position Details & Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                3. Position Details & Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="positionApplyingFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volunteer Position Applying For</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Please select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NEW Admin Positions">
                            NEW Admin Positions
                          </SelectItem>
                          <SelectItem value="NEW Events Positions (Dewsbury)">
                            NEW Events Positions (Dewsbury)
                          </SelectItem>
                          <SelectItem value="NEW Events Positions (Blackburn)">
                            NEW Events Positions (Blackburn)
                          </SelectItem>
                          <SelectItem value="NEW Fundraiser Positions">
                            NEW Fundraiser Positions
                          </SelectItem>
                          <SelectItem value="Chat Volunteers">
                            Chat Volunteers
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="howDidYouHear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How did you hear about this volunteering opportunity?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weeklyHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How many hours can you work weekly?</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateAvailable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Date Available to Start Volunteering:
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="availableDays"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base font-medium">
                        Days/Hours Available to Volunteer (Please tick all that
                        apply):
                      </FormLabel>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {dayOptions.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="availableDays"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            item.value,
                                          ])
                                        : field.onChange(
                                            (field.value || []).filter(
                                              (value) => value !== item.value
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* About You */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">4. About You</CardTitle>
              <CardDescription>
                This section provides an opportunity to tell us more about
                yourself and your motivations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="whyVolunteer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      1. Why do you want to volunteer for Suicide Awareness
                      Prevention UK?
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skillsTrainingExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      2. Tell us about any skills, training, or experiences that
                      you have which may be relevant to your role as a
                      volunteer? (e.g., first aid, public speaking, languages,
                      work with young people, etc.)
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="mentalHealthTraining"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        3. Have you taken part in any Suicide Prevention
                        training or any other Mental Health courses?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="training-yes" />
                            <Label htmlFor="training-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="training-no" />
                            <Label htmlFor="training-no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainingDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        If Yes, please provide details below:
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="hobbiesInterests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      4. Tell us about any particular hobbies or interests you
                      may have?
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">5. References</CardTitle>
              <div className="space-y-2">
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-600 font-semibold">
                    <strong>PLEASE READ CAREFULLY:</strong> Any incomplete or
                    incorrect details may delay your application.
                  </AlertDescription>
                </Alert>
                <CardDescription>
                  We require <strong>two professional references</strong>. At
                  least{" "}
                  <strong>
                    one must be from previous or current employment
                  </strong>
                  . The second reference can be from employment or education.{" "}
                  <strong>We cannot accept character references.</strong>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Reference 1 (MUST BE WORK)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ref1Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ref1Email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ref1Company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ref1JobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Job Title (at this company)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Reference 2 (Work or Education)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ref2Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ref2Email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ref2Org"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company or Institution Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ref2Title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Your Job or Course Title (at this company/institution)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Declaration & Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                6. Declaration & Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertDescription>
                  <strong>Disclaimer:</strong> By signing below, I hereby
                  certify that the information provided in this application is,
                  to the best of my knowledge, correct and complete. I
                  understand that falsification of this information may prevent
                  me from being accepted as a volunteer or lead to my dismissal
                  if accepted.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  I also acknowledge that I understand this volunteering role
                  requires a high level of confidentiality and that you are
                  agreeing to not screenshot, share or discuss in any way
                  anything or anyone that uses this service or its contents.
                </AlertDescription>
              </Alert>

              <Separator className="my-6" />

              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  <strong>Suicide Awareness Prevention UK (SAPUK)</strong> will
                  not discriminate against race, color, religion, sex, national
                  origin, age, disability, or genetics in accordance with the
                  Equality Act 2010. This policy applies to all terms and
                  conditions of volunteering, including recruitment, placement,
                  and training. For more information, please see:{" "}
                  <a
                    href="https://www.gov.uk/guidance/equality-act-2010-guidance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://www.gov.uk/guidance/equality-act-2010-guidance
                  </a>
                </p>

                <div>
                  <p className="font-semibold">Data Protection Act 2018:</p>
                  <p className="mt-2">
                    In accordance with the Data Protection Act 2018, if you
                    choose not to proceed with your volunteering at Suicide
                    Awareness Prevention UK or wish to take a break, your
                    details will be kept in our confidential files for 12
                    months. If you wish to volunteer with us after this time,
                    you must re-apply.
                  </p>
                  <p className="mt-2">
                    Suicide Awareness Prevention UK will retain your personal
                    information for a maximum of 12 months, after which time
                    your data will be securely destroyed. If you wish for us to
                    destroy your data before this period, please let us know by
                    contacting:{" "}
                    <a
                      href="mailto:volunteer@suicideapuk.co.uk"
                      className="text-blue-600 hover:underline"
                    >
                      volunteer@suicideapuk.co.uk
                    </a>
                    . For more information on the Data Protection Act 2018,
                    please see:{" "}
                    <a
                      href="https://www.gov.uk/data-protection"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.gov.uk/data-protection
                    </a>
                  </p>
                </div>

                <p className="font-semibold text-gray-700">
                  Please return the completed form to:{" "}
                  <a
                    href="mailto:volunteer@suicideapuk.co.uk"
                    className="text-blue-600 hover:underline"
                  >
                    volunteer@suicideapuk.co.uk
                  </a>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <FormField
                  control={form.control}
                  name="signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Signature of Applicant:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Type your full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date:</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              onClick={handleSaveDocument}
              className="w-fit bg-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-300 hover:text-zinc-900"
            >
              Save Application Document
            </Button>
            <Button
              variant="outline"
              onClick={handleCreateEmail}
              className="w-fit bg-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-300 hover:text-zinc-900"
            >
              Create Email Template
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
