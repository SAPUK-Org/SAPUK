import ContactForm from "@/components/how-we-can-help-you/contact-us/ContactForm";
import ContactInfo from "@/components/how-we-can-help-you/contact-us/ContactInfo";

export default function ContactUsPage() {
  return (
    <section className="bg-saphub-bg pt-5 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-8 my-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
