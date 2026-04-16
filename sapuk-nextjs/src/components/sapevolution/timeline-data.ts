export interface TimelineItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "The facts first",
    content:
      'SAPUK is a non profit suicide prevention CIC, founded in 2016 by Danielle Shaw after the devastating loss of Bryan Baron on 4 September 2016. For the full background on what happened that day, please refer to the blog "Seeing Suicide". Please note that this includes a trigger warning and may bring up distressing images. If you require support, please reach out.',
    imageUrl:
      "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwFwS4ZyMwmHblSjp50Dqc2EKQRFM8tirXvNLZ",
    imageAlt: "est-2016",
  },
  {
    id: 2,
    title: "Volunteering with SAPUK",
    content:
      '"SAPUK was never intended to become what it has. It started as a healing platform for my own trauma and, due to the correspondence, grew into a support network. It was needed for those people," as described in "Volunteering with SAPUK". SAPUK became what it is because of the support that we offer and, for the years that SAPUK has been afloat, we have guided countless people who have been, or are, struggling with suicidal ideation via our SAPChat service. This is a messaging line on Facebook and a phone line that operates weekly. At SAPUK we also have a recovery plan that people can enrol on with adequately trained members. This consists of a weekly phone call as well as access to our messaging line. "I became obsessed with preventing suicide. This became my life quite quickly after enduring the loss of suicide because I realised I was good at it. I was just 24 when I had to undergo the trauma, and 26 when we opened the SAPChat service. It all escalated more quickly than I developed my admin footing. After years of growth, confusion, approval, knock backs and realisation, we now have a stable and secure team running SAPUK, and it is amazing. We are so lucky. With me just running it and my ADHD traits, it had no chance. I will be here preventing suicide for as long as I breathe. It went from just me to now over 50 volunteers, and it is not because of me. It is because of what we can offer here: support, strength, care and compassion."',
    imageUrl:
      "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwmZhUMbxIA7eTQKzhPrZg86yfbNqMO1Fw9WUx",
    imageAlt: "We are here - SAPUK",
  },
  {
    id: 3,
    title: "Suicide Rates",
    content:
      "Suicide rates are the highest they have ever been and suicide has been the leading cause of death in men under the age of 45 for the last decade. We want to help reduce that number. SAPUK has a dedicated, selfless, voluntary team, running every day from 6 am to 11 pm. All volunteers have basic training, with many members building on this in different ways, and we have enough knowledge among us to be able to offer meaningful guidance. Thank you for taking the time to read this. The SAPUK team, supported by The Semicolon Shop.",
    imageUrl:
      "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwjg0cXkU2sga69fPjWHmSeMVYkrxd0nlhZt3p",
    imageAlt: "Suicide Rates - SAPUK",
  },
];
