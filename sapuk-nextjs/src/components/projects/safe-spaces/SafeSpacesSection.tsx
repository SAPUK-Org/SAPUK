import TikTokVideoCarousel from "./TikTokVideoCarousel";
import ImageCarousel from "./ImageCarousel";

export default function SafeSpacesSection() {
  return (
    <>
      <div className="w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] mx-auto p-4 sm:p-6 lg:p-8 bg-zinc-100 rounded-xl shadow-lg border border-zinc-200 mb-8 md:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 px-2">
          Suicide / Awareness Prevention UK safe space information;
        </h3>
        <p className="text-center max-w-4xl mx-auto text-base sm:text-lg px-2 leading-relaxed">
          When SAPUK first began its journey, we never intended on our support
          being needed as much as it has been, so over the years of
          understanding, engaging and having a community focus, SAPUK has opened
          Safe Spaces to accommodate for some local communities needs;
          <br />
          <br />
          These spaces are safe zones for suicidal ideations / thoughts /
          actions and we welcome anyone who may be struggling to navigate these.
          Each space is different and it will depend on facilitator and group
          size on how each group is engaged with;
        </p>
      </div>

      <div className="w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-6xl mx-auto mb-8 sm:mb-12 md:mb-16 mt-8 sm:mt-10 md:mt-12 px-2 sm:px-4 lg:px-8">
        <div className="grid gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          <div className="bg-zinc-100 rounded-xl shadow-lg border border-zinc-200 p-4 sm:p-6 lg:p-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-zinc-800 px-2">
              TikTok Videos
            </h3>
            <div className="w-full max-w-2xl mx-auto">
              <TikTokVideoCarousel
                tiktokUrls={[
                  "https://www.tiktok.com/@suicideapuk/video/7448249904117452065",
                  "https://www.tiktok.com/@suicideapuk/video/7473116813736316182",
                ]}
              />
            </div>
          </div>

          <ImageCarousel />
        </div>
      </div>
    </>
  );
}
