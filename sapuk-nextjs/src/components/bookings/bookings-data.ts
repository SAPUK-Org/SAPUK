import { PricingTier, Facilitator } from "@/types/common";

export const pricingTiers: PricingTier[] = [
  { range: "5-10 people", price: "£150 - £200" },
  { range: "50-100 people", price: "£300" },
  { range: "Over 100 people", price: "£500 - £600" },
  { range: "Over 500 people", price: "Please enquire" },
];

export const facilitators: Facilitator[] = [
  { name: "Rebecca Sherwin", title: "Director of SAPUK, Safeguarding Officer" },
  { name: "Heidi Barber", title: "Director of SAPUK, Dewsbury Safe Space" },
];
