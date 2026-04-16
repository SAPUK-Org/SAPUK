import Image from "next/image";

export default function SemicolonFestSection() {
  return (
    <>
      {/* Banner and Status */}
      <div className="mb-10">
        <div className="text-center mb-4">
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwSgkNq3nszR8M3u9m7kNZCaorFDgqybHf6VvY"
            alt="The Semicolon Fest Banner"
            width={1366}
            height={768}
            className="w-full h-auto rounded-xl shadow-lg"
            priority
          />
        </div>
        <div className="text-center">
          <div className="inline-block bg-yellow-100 border-2 border-yellow-400 rounded-lg px-6 py-3">
            <h3 className="text-xl md:text-2xl font-bold text-yellow-800">
              TEMPORARILY POSTPONED
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-5">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <p className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              The Semicolon Fest makes an appearance this September –
            </p>
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700">
              <p>
                This year SAPUK are hosting their first suicide prevention
                festival that will be designed around the semicolon tattoo
                project and its messages, as this is a fundamental symbol within
                our communities;
              </p>
              <p>
                Not only does the semicolon offer a symbol of hope it also
                represents overcoming suicidal actions, conquering suicidal
                thoughts and staying alive even when a person does not want too.
                Each person who wears the semicolon as a tattoo wears it for a
                different reason, each a symbol of hope;
              </p>
              <p>
                The festival we are launching is a giant safe space so that
                anyone who may feel isolated with their suicidal thoughts or
                ideations is welcome here with open arms – come and join us in
                celebrating life together;
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center">
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwluJByGAZb5Xryae7tWf2Spogm6i8CYUDB0Pu"
            alt="Semicolon Festival Poster"
            width={1587}
            height={2245}
            className="w-full h-auto rounded-xl shadow-lg"
            priority
          />
        </div>
      </div>

      {/* Organizers and Event Link */}
      <div className="bg-gradient-to-r from-[#2ac4ea]/10 to-indigo-50 rounded-xl shadow-md p-6 md:p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-base md:text-lg text-gray-700 mb-2">
              <strong className="text-gray-900">Organizers:</strong>
            </p>
            <p className="text-lg md:text-xl font-semibold text-gray-900">
              Dan, Beck, Heidi, Kim & Georgee
            </p>
          </div>
          <a
            href="https://www.facebook.com/events/1637578590406917?ref=newsfeed"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2ac4ea] text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl hover:bg-[#2ac4ea]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            FB EVENT
          </a>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <blockquote className="border-l-4 border-[#2ac4ea] pl-6 md:pl-8 italic text-base md:text-lg leading-relaxed text-gray-700">
          <p className="mb-4">
            The idea for a festival has always been something that we have been
            looking into. Festivals are fun gatherings for people, so we wanted
            to create one that would be more so a fun, safe gathering for
            people. Many people struggle with festivals and actually getting to
            them, here we want to show individuals that it is okay, you are
            enough to be here;
          </p>
          <p>
            I think this is an excellent way to show the nation that suicide
            prevention is a thing to be preaching about on a larger scale, as
            they say its okay not to be okay;
          </p>
        </blockquote>
      </div>
    </>
  );
}
