export type BulletPart = {
  before: string;
  bold?: string;
  after?: string;
};

export type SupportLink = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

// Replace illustrationSrc when final hero asset is ready
export const heroContent = {
  label: "MHFA / SFA guidance",
  title: "Supporting someone with suicidal thoughts",
  intro:
    "When someone you care about tells you they are feeling suicidal, it can be overwhelming, frightening, and emotionally exhausting. This page offers gentle, practical guidance for those first conversations so that both you and the person you're supporting can feel as safe and held as possible.",
  illustrationSrc:
    "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMN5NSaWqQQDzYblRcrHvj5xAw6JLBmyM082uTV",
  illustrationAlt:
    "Two people supporting each other — illustration placeholder",
};

export const understandingSection = {
  title: "Understanding what they may be feeling",
  body: "When someone is experiencing suicidal thoughts, it can be extremely difficult for them to safeguard themselves, meaning that they may find it hard to keep themselves safe. Sometimes, they may reach out to somebody they love, such as a friend, a relative, a partner or a carer. It is never easy hearing from someone you love that they are suicidal, and it is completely normal to experience your own distressed feelings when hearing this. Knowing what to do if someone reaches out to you is crucial to ensuring everyone is supported during this time.",
};

export const firstStepsSection = {
  title: "First steps to help keep them safe",
  intro:
    "The first priority is always safety. You can gently but clearly ask direct questions to understand how at risk the person might be right now.",
  bullets: [
    {
      before:
        "Firstly, make sure the person is safe now. You can actively ask the question, ",
      bold: "'Are you suicidal now?'",
      after: ".",
    },
    {
      before:
        "If they tell you they are not safe now or you are worried about immediate risk, please ring the ",
      bold: "Mental Health Crisis Line on 111",
      after: " (or your local crisis service).",
    },
    {
      before:
        "Once you have ensured their immediate safety, encourage them to reach out to their ",
      bold: "doctor / GP",
      after: " as soon as possible.",
    },
  ] satisfies BulletPart[],
};

export const conversationSection = {
  title: "Opening up the conversation",
  intro:
    "Once those first steps have been taken and if you are within capacity to continue supporting them, you might explore what has been happening for them.",
  bullets: [
    {
      before: "You may ask questions such as ",
      bold: "'Do you know why you are feeling this way?'",
      after: ".",
    },
    {
      before:
        "If they have been through recent trauma, gently reassure them that it is going to be okay and that they are not alone in this.",
    },
    {
      before:
        "Remember that you may also need support when holding space for someone else's pain. It is okay to seek your own support too.",
    },
  ] satisfies BulletPart[],
};

export const supportSection = {
  title: "Professional and local support options",
  body: "After speaking with a doctor, they may refer the person to Talking Therapies, or the person can complete a self-referral. There are also many organisations listed on the Hub of Hope website if more local or specialist support is needed.",
  links: [
    {
      label: "NHS Talking Therapies",
      href: "https://www.nhs.uk/tests-and-treatments/talking-therapies/",
      variant: "primary",
    },
    {
      label: "Hub of Hope directory",
      href: "https://hubofhope.co.uk/",
      variant: "secondary",
    },
  ] satisfies SupportLink[],
};

export const selfCareSection = {
  body: "Supporting someone who is suicidal can be emotionally intense and can bring up a lot for you as well. It's important to look after your own wellbeing, reach out for help when you need it, and remember that you are not alone in this. Taking these steps, alongside professional support, can help everyone involved feel safer and more supported.",
};
