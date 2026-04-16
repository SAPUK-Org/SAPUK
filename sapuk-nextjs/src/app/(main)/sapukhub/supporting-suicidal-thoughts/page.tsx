import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SupportingSomeone() {
  return (
    <section className="bg-saphub-bg min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 md:mb-14">
          <p className="text-xs md:text-sm font-semibold tracking-wide text-sky-800 uppercase">
            MHFA / SFA guidance
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Supporting someone with suicidal thoughts
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            When someone you care about tells you they are feeling suicidal, it
            can be overwhelming, frightening, and emotionally exhausting. This
            page offers gentle, practical guidance for those first conversations
            so that both you and the person you&apos;re supporting can feel as
            safe and held as possible.
          </p>
        </header>

        <Card className="bg-white/90 backdrop-blur-sm border-slate-100 shadow-sm space-y-6 sm:space-y-8 md:space-y-10">
          <CardHeader className="pb-2 sm:pb-4 md:pb-6">
            <CardTitle className="text-xl md:text-2xl text-gray-900">
              Understanding what they may be feeling
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
              When someone is experiencing suicidal thoughts, it can be
              extremely difficult for them to safeguard themselves, meaning that
              they may find it hard to keep themselves safe. Sometimes, they may
              reach out to somebody they love, such as a friend, a relative, a
              partner or a carer. It is never easy hearing from someone you love
              that they are suicidal, and it is completely normal to experience
              your own distressed feelings when hearing this. Knowing what to do
              if someone reaches out to you is crucial to ensuring everyone is
              supported during this time.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 sm:space-y-8 md:space-y-10">
            <section className="grid gap-6 md:gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-sky-50 border border-sky-100 p-5 sm:p-6 flex flex-col h-full">
                <h3 className="text-lg md:text-xl font-semibold text-sky-900 mb-3">
                  First steps to help keep them safe
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  The first priority is always safety. You can gently but
                  clearly ask direct questions to understand how at risk the
                  person might be right now.
                </p>
                <ul className="mt-4 space-y-2 text-sm md:text-base text-gray-800 list-disc list-inside">
                  <li>
                    Firstly, make sure the person is safe now. You can actively
                    ask the question,{" "}
                    <span className="font-semibold">
                      &apos;Are you suicidal now?&apos;
                    </span>
                    .
                  </li>
                  <li>
                    If they tell you they are not safe now or you are worried
                    about immediate risk, please ring the{" "}
                    <span className="font-semibold">
                      Mental Health Crisis Line on 111
                    </span>{" "}
                    (or your local crisis service).
                  </li>
                  <li>
                    Once you have ensured their immediate safety, encourage them
                    to reach out to their{" "}
                    <span className="font-semibold">doctor / GP</span> as soon
                    as possible.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 sm:p-6 flex flex-col h-full">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                  Opening up the conversation
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Once those first steps have been taken and if you are within
                  capacity to continue supporting them, you might explore what
                  has been happening for them.
                </p>
                <ul className="mt-4 space-y-2 text-sm md:text-base text-gray-800 list-disc list-inside">
                  <li>
                    You may ask questions such as{" "}
                    <span className="font-semibold">
                      &apos;Do you know why you are feeling this way?&apos;
                    </span>
                    .
                  </li>
                  <li>
                    If they have been through recent trauma, gently reassure
                    them that it is going to be okay and that they are not alone
                    in this.
                  </li>
                  <li>
                    Remember that you may also need support when holding space
                    for someone else&apos;s pain. It is okay to seek your own
                    support too.
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Professional and local support options
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                After speaking with a doctor, they may refer the person to{" "}
                <span className="font-semibold">Talking Therapies</span>, or the
                person can complete a self-referral. There are also many
                organisations listed on the{" "}
                <span className="font-semibold">Hub of Hope</span> website if
                more local or specialist support is needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild size="lg">
                  <Link
                    href="https://www.nhs.uk/tests-and-treatments/talking-therapies/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    NHS Talking Therapies
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link
                    href="https://hubofhope.co.uk/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Hub of Hope directory
                  </Link>
                </Button>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-6 md:pt-8">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Supporting someone who is suicidal can be emotionally intense
                and can bring up a lot for you as well. It&apos;s important to
                look after your own wellbeing, reach out for help when you need
                it, and remember that you are not alone in this. Taking these
                steps, alongside professional support, can help everyone
                involved feel safer and more supported.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
