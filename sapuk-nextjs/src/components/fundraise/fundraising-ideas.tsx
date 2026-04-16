const fundraisingIdeas = [
  {
    title: "Sponsored Events",
    description:
      "Organise a walk, run, cycle, or swim event where participants get sponsored for their efforts.",
    bgColor: "bg-[#7cbddd]",
  },
  {
    title: "Community Gatherings",
    description:
      "Host a bake sale, coffee morning, or community dinner with proceeds going to SAPUK.",
    bgColor: "bg-[#BA86D6]",
  },
  {
    title: "Challenges",
    description:
      "Take on a personal challenge like giving up something for a month or doing something every day.",
    bgColor: "bg-[#7cbddd]",
  },
  {
    title: "Workplace Fundraising",
    description:
      "Organise dress-down days, office competitions, or matched giving through your employer.",
    bgColor: "bg-[#BA86D6]",
  },
  {
    title: "Social Media Campaigns",
    description:
      "Create awareness and fundraising campaigns that can be shared across social platforms.",
    bgColor: "bg-[#7cbddd]",
  },
  {
    title: "Memorial Fundraising",
    description:
      "Raise funds in memory of a loved one to help others receive the support they need.",
    bgColor: "bg-[#BA86D6]",
  },
];

export default function FundraisingIdeas() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Fundraising Ideas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fundraisingIdeas.map((idea, index) => (
          <div key={index} className={`${idea.bgColor} p-6 rounded-lg`}>
            <h3 className="font-bold text-xl mb-2">{idea.title}</h3>
            <p>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
