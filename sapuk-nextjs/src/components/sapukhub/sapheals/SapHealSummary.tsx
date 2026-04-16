import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SapHealSummary() {
  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-[calc(50%-0.5rem)]">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="accept"
              className="rounded-lg border-none transition-all duration-300"
            >
              <AccordionTrigger className="text-sm md:text-base font-semibold px-4 py-4 hover:no-underline">
                Accept things as they are
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm md:text-base pl-2">
                  You have to live with what&apos;s in front of you, no matter
                  how challenging or defeating your past may be. There&apos;s no
                  going back and changing the trauma you&apos;ve faced. While
                  you may wish for things to be different, reliving the past
                  won&apos;t move you forward. What has happened has happened -
                  accepting this is crucial. Some of us end up in unthinkable
                  circumstances, and processing vivid in unthinkable
                  circumstances, and processing vivid trauma can be
                  overwhelming. But you can process it and move forward by
                  accepting its impact on your mental health. If you need
                  support, please contact our team - we&apos;re here to help ✌
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-full md:w-[calc(50%-0.5rem)]">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="prioritise"
              className="rounded-lg border-none transition-all duration-300"
            >
              <AccordionTrigger className="text-sm md:text-base font-semibold px-4 py-4 hover:no-underline">
                Prioritise your own mental health
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm md:text-base pl-2">
                  We often forget to look after ourselves, putting others first.
                  It&apos;s perfectly okay to say no to conversations or decline
                  helping others when you&apos;re not feeling well yourself. If
                  someone wants to discuss their mental health but you&apos;re
                  not in a good place, it&apos;s important to explain that
                  you&apos;re unable to properly support them at the moment.
                  Remember - prioritising yourself isn&apos;t selfish, it&apos;s
                  essential ☀
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-full md:w-[calc(50%-0.5rem)]">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="triggers"
              className="rounded-lg border-none transition-all duration-300"
            >
              <AccordionTrigger className="text-sm md:text-base font-semibold px-4 py-4 hover:no-underline">
                Understand your triggers
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm md:text-base pl-2">
                  Triggers can appear unexpectedly - a song that brings back
                  memories of heartbreak, artwork reminiscent of a lost friend,
                  or the aroma from a bakery that reminds you of someone no
                  longer here. For those struggling with self-harm, triggers
                  might be related to previous experiences. Understanding and
                  managing these triggers helps us respond rather than react,
                  allowing us to acknowledge memories without being overwhelmed
                  by pain 🌱
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-full md:w-[calc(50%-0.5rem)]">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="acknowledge"
              className="rounded-lg border-none transition-all duration-300"
            >
              <AccordionTrigger className="text-sm md:text-base font-semibold px-4 py-4 hover:no-underline">
                Acknowledge your thoughts
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm md:text-base pl-2">
                  Understanding your triggers includes recognising difficult
                  thoughts. If you&apos;re experiencing suicidal thoughts,
                  acknowledge them - you&apos;re dealing with trauma, and
                  it&apos;s okay to feel this way. You&apos;re not crazy or
                  different; you&apos;re going through a challenging time. Your
                  only responsibility during these moments is to keep yourself
                  safe 💜 #heretohelp
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-full md:w-[calc(50%-0.5rem)]">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="yourself"
              className="rounded-lg border-none transition-all duration-300"
            >
              <AccordionTrigger className="text-sm md:text-base font-semibold px-4 py-4 hover:no-underline">
                Be yourself, always
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm md:text-base pl-2">
                  Above all else, be authentic and true to yourself.
                  &apos;Fitting in&apos; isn&apos;t as important as being
                  genuine. If you&apos;re struggling with emotions, need help
                  creating a safety plan, or simply need someone to talk to –
                  please reach out through the SAPUK website ☮
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
