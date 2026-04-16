export interface Testimonial {
  quote: string;
  name: string;
  yearsOfService: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I volunteer with SAPUK because I believe in the power of connection and support during challenging times. Being part of this organisation allows me to contribute to a cause that not only saves lives but also fosters hope and understanding. Knowing that my efforts, however small, can make a difference in someone's life is deeply rewarding and motivates me to continue helping others. Volunteering here has also given me the opportunity to grow, meet incredible people, and be part of a community dedicated to positive change.",
    name: "Tola",
    yearsOfService: "1 year",
  },
  {
    quote:
      "I volunteer for SAP because I want everyone to know they are valued and that support is there for them when they need it, so that they people feel encouraged to fight for their life and to keep trying.",
    name: "Ayesha",
    yearsOfService: "1 year",
  },
  {
    quote:
      "I want to volunteer here to help provide support, compassion, and hope to individuals struggling with mental health challenges, ensuring they know they are not alone.",
    name: "Blessing",
    yearsOfService: "1 year",
  },
  {
    quote:
      "I enjoy volunteering because it allows me to make a tangible difference in the lives of others, creating a sense of fulfillment and purpose. It also provides an opportunity to connect with diverse individuals, fostering empathy and understanding while building a stronger community.",
    name: "Dom",
    yearsOfService: "2 years",
  },
  {
    quote:
      "I've volunteered at SAP for nearly 2 years! I love volunteering because I love making a difference in people's life's, I have been through mental health struggles and I want to give back the support I received because I believe everyone deserves support!",
    name: "Chloe",
    yearsOfService: "2 years",
  },
];

export interface EventCard {
  title: string;
  description?: string;
  content: string;
}

export const eventCards: EventCard[] = [
  {
    title: "A Day in the Life - Events Lead",
    description: "Heidi, Dewsbury",
    content: `As the Dewsbury Events Lead, no two days are ever quite the same — but every day is dedicated to supporting the community and making a difference. Our work starts well before the event begins. I spend time planning, organising, and coordinating with our incredible events team — all local to Dewsbury — to make sure everything runs smoothly. On event days, we're up early, setting up spaces for one of our many community events. These can include:
• Food Pantries during school holidays, offering essential supplies to families in need
• Walk & Talk sessions held once a month to promote mental wellbeing and connection
• I Don't Know Anyone Either – a gentle, welcoming space for people who feel isolated
• Community Coffee Mornings, where conversations flow as easily as the coffee
• The Semi Colon Tattoo Project, raising awareness around mental health and suicide prevention.

Throughout the day, we hand out free resources, chat with attendees, and offer support to anyone who needs a safe space. Every conversation matters. We also aim to raise donations during events. As a non-profit CIC, we rely on these contributions to keep our work going. Every pound helps us run the next pantry, host the next walk, or simply keep the kettle on for the next coffee morning. It's hard work — but incredibly rewarding. Seeing the impact these events have on people's lives makes every moment worthwhile. If you're in Dewsbury or Blackburn and want to be part of something meaningful, we're always looking for passionate volunteers to join our events team. You don't need experience — just heart, reliability, and a love for community.`,
  },
  {
    title: "Rachael",
    content:
      "I volunteer because I want to help make a difference in people's life's and helping out at the events is just one of the many ways in which I can contribute",
  },
];
