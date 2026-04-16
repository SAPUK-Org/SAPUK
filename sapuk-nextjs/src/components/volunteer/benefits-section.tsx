export default function BenefitsSection() {
  return (
    <div className="w-full">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Student Placements at SAPUK
      </h2>
      <p className="text-zinc-800 text-base sm:text-lg max-w-3xl mx-auto mb-8 text-center">
        At SAPUK, we believe the next generation of professionals should have
        the chance to learn, grow, and make a meaningful impact. Our Student
        Placement Programme offers university and college students the
        opportunity to gain hands-on experience within a dynamic, values-driven
        team.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="text-zinc-800 text-xl font-bold mb-3">
              Our placements are:
            </h3>
            <ul className="list-disc list-inside text-zinc-800 space-y-1.5">
              <li>Neurodiversity-affirming</li>
              <li>Flexible, to fit around your studies and remote work</li>
              <li>Temp contract that can lead to permanent work with us</li>
            </ul>
          </div>
          <div>
            <p className="text-zinc-800 text-base sm:text-lg">
              You’ll have a dedicated supervisor and regular check-ins to
              support your development.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-zinc-800 text-xl font-bold mb-3">
              What You’ll Gain
            </h3>
            <ul className="list-disc list-inside text-zinc-800 space-y-1.5">
              <li>Practical, real-world experience</li>
              <li>Stronger communication and organisational skills</li>
              <li>Exposure to safeguarding, GDPR, and governance</li>
              <li>A portfolio of work and a reference</li>
              <li>Greater confidence in your career direction</li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-800 text-xl font-bold mb-3">
              Who Can Apply
            </h3>
            <ul className="list-disc list-inside text-zinc-800 space-y-1.5">
              <li>University and college students</li>
              <li>UK-based applicants aged 18+</li>
              <li>Neurodivergent students are especially encouraged</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-zinc-800 text-xl font-bold mb-3">
          Start Your Journey With SAPUK
        </h3>
        <p className="text-zinc-800 text-base sm:text-lg">
          A placement with SAPUK is more than work experience — it’s a chance to
          grow, contribute, and join a team built on compassion and integrity.
          If you’re ready to take the next step, we’d love to hear from you.
        </p>
      </div>
    </div>
  );
}
