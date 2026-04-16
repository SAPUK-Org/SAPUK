import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { resourceLinks } from "./students-data";

export default function ResourcesSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Helpful Resources
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Curated resources to support your mental health journey
        </p>
      </div>

      <div className="space-y-8">
        {resourceLinks.map((resource, index) => (
          <div
            key={index}
            className={`bg-card rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } flex flex-col lg:flex-row items-center gap-8 lg:gap-12`}
          >
            <div className="lg:w-1/2 p-6 lg:p-8">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {resource.description}
                </p>
                <Button
                  asChild
                  className="w-fit bg-button-blue text-white font-semibold hover:bg-button-blue/80 hover:text-white"
                >
                  <Link
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-200 ease-in-out"
                  >
                    Visit Resource
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2 p-6 lg:p-8 flex justify-center">
              <Image
                src={resource.imageSrc}
                alt={resource.imageAlt}
                width={350}
                height={250}
                className="w-full h-auto object-contain rounded-2xl pointer-events-none select-none"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
