import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface ChatDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function ChatDialog({ isOpen, setIsOpen }: ChatDialogProps) {
  // Temp to push to new repo
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[85vh] w-full max-w-2xl overflow-hidden flex flex-col bg-zinc-100">
        <DialogHeader>
          <DialogTitle>About Support Chat</DialogTitle>
          <DialogDescription>
            Learn how SAPUK&apos;s private message line and online support can
            help you, and all the ways you can get in touch.
          </DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4 pb-2">
          <div className="space-y-8 text-sm leading-relaxed text-primary">
            {/* Availability & what we offer */}
            <section className="space-y-3">
              <h3 className="text-base font-semibold">
                A private, confidential message line
              </h3>
              <p>
                We offer a private and confidential message line from{" "}
                <strong>6am – 11pm, 365 days a year</strong>.
              </p>
              <p className="font-medium">
                ✌️ Instant message support – Recovery Plan / Email Support /
                Phone Support
              </p>
              <p>
                Benefits include building a trusting therapeutic relationship
                between the organisation and the individual, helping you feel
                safe to disclose your thoughts and feelings, breaking any
                isolation you may feel, enhancing your self-esteem and
                self-worth, contextualising the trauma you may experience, and
                moving toward recovery with constant, selfless support.
              </p>
            </section>

            {/* How to reach us */}
            <section className="space-y-3">
              <h3 className="text-base font-semibold">How to reach us</h3>
              <p>
                The message button below the SAPUK site connects you directly to
                our <strong>Facebook messaging service</strong>. If there are
                any problems, visit{" "}
                <Link
                  href="https://www.facebook.com/suicideapuk"
                  className="underline underline-offset-2"
                >
                  facebook.com/suicideapuk
                </Link>{" "}
                and click the message button for instant support ✌
              </p>
              <p>
                We also have a messaging service available via{" "}
                <strong>Instagram</strong>, <strong>Twitter</strong> &amp;{" "}
                <strong>LinkedIn</strong>.
              </p>
              <p>
                If you would like support but wish to remain within your own
                privacy, you can contact us via{" "}
                <a
                  href="mailto:yoursupport@suicideapuk.co.uk"
                  className="underline underline-offset-2"
                >
                  yoursupport@suicideapuk.co.uk
                </a>
                , where emails and any personal data will be removed within 48
                hours.
              </p>

              <div className="pt-2 space-y-1">
                <p className="font-medium">General enquiries</p>
                <p>
                  <a
                    href="mailto:admin@suicideapuk.co.uk"
                    className="underline underline-offset-2"
                  >
                    admin@suicideapuk.co.uk
                  </a>
                </p>
                <p className="mt-2">Directors / management:</p>
                <p className="space-y-1">
                  <span className="block font-semibold">
                    jordeey@suicideapuk.co.uk
                  </span>
                  <span className="block font-semibold">
                    beck@suicideapuk.co.uk
                  </span>
                  <span className="block font-semibold">
                    lib@suicideapuk.co.uk
                  </span>
                  <span className="block font-semibold">
                    heidi@suicideapuk.co.uk
                  </span>
                </p>
                <p className="mt-2">Volunteer:</p>
                <p className="font-semibold">volunteer@suicideapuk.co.uk</p>
                <p className="mt-2">News / press:</p>
                <p className="font-semibold">newsletter@suicideapuk.co.uk</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Please allow up to 48 hours for a response via email.
                </p>
              </div>
            </section>

            {/* How talking helps */}
            <section className="space-y-3">
              <h3 className="text-base font-semibold">How talking helps</h3>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                With suicidal idealisation – SAPUK (2022)
              </p>
              <p>
                We often find it helpful to talk problems through with a friend
                or family member, but sometimes friends and family cannot help
                us and we need to talk to a professional therapist. Please also
                consult with your doctor if you are experiencing suicidal
                thoughts, as we are only an online support network.
              </p>
              <p>
                Talking therapies involve talking to someone who is trained to
                help you deal with your negative feelings. They can help anyone
                who is experiencing distress. You do not have to be told by a
                doctor that you have a mental health problem to be offered or
                benefit from a talking therapy.
              </p>
              <p>
                Talking therapies give people the chance to explore their
                thoughts and feelings and the effect they have on their
                behaviour and mood. Describing what&apos;s going on in your head
                and how that makes you feel can help you notice patterns which
                it may be helpful to change.
              </p>
              <p>
                Understanding all this can help you make positive changes by
                thinking or acting differently. Talking therapies can help you
                take greater control of your life and improve your confidence.
                They may also be referred to as talking treatments, counselling,
                psychological therapies or treatments, or psychotherapies.
              </p>
            </section>

            {/* Dealing with negative thoughts & talking */}
            <section className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-semibold">
                  Dealing with negative thoughts
                </h3>
                <p>
                  Talking therapies can help you work out how to deal with
                  negative thoughts and feelings and make positive changes.
                  Talking with another person about your current position can
                  open the door to overcoming whatever hardship you are facing,
                  as you get to hear your situation from another perspective. It
                  can also lift pressure as you share your thoughts and feelings
                  with another.
                </p>
                <p>
                  They can help people who are feeling distressed by difficult
                  events in their lives, as well as people with ongoing mental
                  health problems. Talking is good for you – it helps to clear
                  your mind and this has been proven many times through research
                  and experience.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold">
                  Talking about your thoughts
                </h3>
                <p>
                  Talking about your thoughts and feelings can help you deal
                  with times when you feel distressed about anything – a
                  relationship breakdown, troubles at work or in an educational
                  setting. If you hold distress without sharing it with another
                  person, you can turn this particular thought over and over in
                  your mind, which can make you become isolated, especially if
                  you have had suicidal thoughts prior.
                </p>
                <p>
                  Please reach out – you may only need support for a short
                  period of time, but it is there.
                </p>
              </div>
            </section>

            {/* Discussing troubles & why talking matters */}
            <section className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-semibold">
                  Discussing your troubles
                </h3>
                <p>
                  Discussing your troubles can help you work out what is
                  triggering these thoughts and explore what you could do about
                  it. This may include learning in depth about your mental
                  health problem.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold">
                  Talking is important
                </h3>
                <p>
                  Talking is an important part of our relationships; without it
                  we have no basis within the relationship. It can strengthen
                  your ties with other people and help you stay within good
                  mental health. Being listened to helps you feel that other
                  people care about you and what you have to say.
                </p>
                <p>
                  Not everyone can mentally process another person who is
                  suicidal, so please be mindful who you reach out to. You may
                  see many people walk away – please do not take this as
                  neglectful behaviour, but understand that they may not have
                  the space in their mind at that moment.
                </p>
                <p>
                  Here at SAPUK, our message line is open, and we don&apos;t
                  mind how many times you message. We have a team who are
                  trained and experienced to do this.
                </p>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
