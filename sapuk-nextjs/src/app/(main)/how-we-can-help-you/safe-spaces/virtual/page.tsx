import { Metadata } from "next";
import VirtualSafeSpaces from "@/components/how-we-can-help-you/safe-spaces/VirtualSafeSpaces";

export const metadata: Metadata = {
  title: "Virtual Safe Spaces - SAP;UK",
  description:
    "Free, confidential online support sessions for anyone in the UK over 16. Book a Microsoft Teams or phone Virtual Safe Space with SAPUK.",
};

export default function VirtualSafeSpacesPage() {
  return (
    <section className="bg-white px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <VirtualSafeSpaces />
      </div>
    </section>
  );
}
