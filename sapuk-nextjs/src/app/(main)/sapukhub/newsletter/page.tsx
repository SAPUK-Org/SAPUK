import NewsletterHero from "@/components/sapukhub/newsletter/hero";
import NewsletterImage from "@/components/sapukhub/newsletter/newsletter-image";
import NewsletterForm from "@/components/sapukhub/newsletter/newsletter-form";

export default function Newsletter() {
  return (
    <section className="pt-20 pb-10 px-4 bg-saphub-bg">
      <NewsletterHero />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <NewsletterImage />
        <NewsletterForm />
      </div>
    </section>
  );
}
