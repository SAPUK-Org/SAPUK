export default function NewsletterHero() {
  return (
    <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-xl px-4 py-6 sm:px-6 sm:py-8 md:p-8 mb-8 md:mb-12">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-bold mb-4 sm:mb-6 text-gray-800 relative">
        Join Our Newsletter Community
        <hr className="w-full max-w-xs sm:max-w-sm md:max-w-md border-button-blue border-1 mt-2 mx-auto" />
      </h1>
      <p className="text-center text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed px-1 sm:px-4">
        SAPUK&apos;s newsletter is produced and led by the team, bringing you
        valuable insights and updates. Have something to share? Email us at{" "}
        <a
          href="mailto:sapnewsletter@suicideapuk.co.uk"
          className="text-button-blue hover:text-button-blue/80 underline decoration-2 decoration-button-blue/50 break-all"
        >
          sapnewsletter@suicideapuk.co.uk
        </a>
      </p>
    </div>
  );
}
