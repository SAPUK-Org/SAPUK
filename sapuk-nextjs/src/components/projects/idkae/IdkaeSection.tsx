import Image from "next/image";
import Link from "next/link";

export default function IdkaeSection() {
  return (
    <>
      {/* Banner Image */}
      <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpwq4G2Nv5N5weoZT7nX0E83VGLBvSPJhs94i6C"
          alt="Event banner"
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
          width={625}
          height={352}
          priority
        />
      </div>

      {/* Main Title & Description */}
      <div className="space-y-6 max-w-4xl mx-auto mb-12">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-800">
          &quot;I don&apos;t know anyone either&quot; 12 month UK event
        </h3>
        <p className="text-lg md:text-xl text-center mb-6 italic text-gray-600">
          Its a 12 month project that brings community events to the community.
          Each event differs. Either the last Saturday / Sunday of every month.
          The aim of this project is to get people who are struggling to get
          into the community, into the community. We can do this by getting to
          know one another here and, if necessary, local services or businesses
          at a specific event or venue. For some events we are looking for
          10-20 local businesses to join us in this unique community movement.
          At each afternoon or evening event there will be trained facilitators
          and a range of different groups and services within the area. We hope
          to see you soon &lt;3
        </p>
      </div>

      {/* Event Cover Image & Dates */}
      <div className="my-16">
        <div className="rounded-xl overflow-hidden shadow-xl mb-8">
          <Image
            src="https://dju754gknh.ufs.sh/f/Uv1WD6etinpw9HdSJ0V7rdpiNRmntIauBDbU2woZzys0X4Sk"
            alt="Event cover"
            className="w-full h-auto object-cover"
            width={1596}
            height={591}
            priority
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            2025 Event Schedule
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>23rd March</span>
                <span className="text-blue-600">Longridge</span>
              </p>
              <Link
                href="https://fb.me/e/FSXVAPPrJ"
                className="text-sm sm:text-base text-blue-600 hover:text-blue-800 hover:underline mt-2 inline-block"
              >
                View Event Details →
              </Link>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>26th April</span>
                <span className="text-blue-600">Stoke-on-trent</span>
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>25th May</span>
                <span className="text-blue-600">Dewsbury</span>
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>29th June</span>
                <span className="text-blue-600">Uxbridge</span>
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>27th July</span>
                <span className="text-blue-600">Devon area tbc</span>
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>31st August</span>
                <span className="text-blue-600">Stevenage area tbc</span>
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>27th September</span>
                <span className="text-blue-600">Preston</span>
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>25th October</span>
                <span className="text-blue-600">Loughborough</span>
              </p>
              <span className="text-sm sm:text-base text-gray-500 mt-2 inline-block">
                Details coming soon
              </span>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>30th November</span>
                <span className="text-blue-600">Stockport</span>
              </p>
              <span className="text-sm sm:text-base text-gray-500 mt-2 inline-block">
                Xmas Special
              </span>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>28th December</span>
                <span className="text-blue-600">TBC</span>
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>25th January</span>
                <span className="text-blue-600">TBC</span>
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-semibold flex items-center justify-between">
                <span>25th February</span>
                <span className="text-blue-600">TBC</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Additional Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-12">
        <p className="text-base sm:text-lg md:text-xl text-center mb-6">
          If you would like to book one of our Sundays for your community please
          do not hesitate to contact our event organiser{" "}
          <Link
            href="mailto:danielle@suicideapuk.co.uk"
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
          >
            danielle@suicideapuk.co.uk
          </Link>
        </p>
        <p className="text-base sm:text-lg md:text-xl text-center mb-8">
          We are also looking for LOCAL businesses to attend each event.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-center mb-8">
          We understand how difficult it is to get out in the community when you
          don&apos;t know anyone. Whether it&apos;s finding local support,
          hairdressers, or garages, we can bring them all to you for one day 🙂
        </p>
      </div>

      {/* CO-HOSTS Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mt-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          FOR CO-HOSTS
        </h3>
        <div className="text-center space-y-6">
          <p className="font-bold text-lg sm:text-xl md:text-2xl text-blue-600">
            HELP NEEDED 💙💜
          </p>
          <p>
            As you may have seen our recent event &quot;I don&apos;t know anyone
            either&quot;
          </p>
          <p>
            – we would like to share some context on it – if you like the idea,
            please become a CO-HOST with us. By doing this you will be engaging
            within your community with our full support, and we will be there
            also 🥰
          </p>
          <p>
            Looking for 4/5 communities to join our &quot;I don&apos;t know
            anyone either&quot; event to fill up our 12 month mission
          </p>
          <p>
            The idea of these events is to get people out into the community who
            are struggling to get out, as many individuals are isolated now –
            and I surely cannot be the only one.
          </p>
          <p>
            At each event there will be 10-20 local businesses, ranging from
            beauty to law and support. There is no category on who can attend;
            this is a full community event.
          </p>
          <p>
            Many attendees may have no connection with others—there will be
            individuals struggling to meet new people, people with few friends or
            family nearby, single parents, and sole individuals of all ages and
            backgrounds 🙂
          </p>
          <p className="font-bold text-base sm:text-lg">
            *** NEURODIVERSE FRIENDLY *** FAMILIES WELCOME *** OPEN TO ANYONE ***
          </p>
          <p className="text-base sm:text-lg">
            Remember we don&apos;t know anyone either 💜
          </p>
          <div className="bg-gray-50 rounded-lg p-6 my-8">
            <p className="font-bold mb-4">As a CO-HOST you will –</p>
            <ul className="list-none space-y-3 text-left max-w-xl mx-auto">
              <li className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>Gain experience planning/organising events</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>
                  Engage positively with local businesses and communities
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>Help reduce suicide rates</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>Join one of the most selfless teams</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>Access free training/resources</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>Learn networking and gain confidence</span>
              </li>
            </ul>
          </div>
          <p className="text-base sm:text-lg md:text-xl">
            If you could drop an email to{" "}
            <Link
              href="mailto:danielle@suicideapuk.co.uk"
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              danielle@suicideapuk.co.uk
            </Link>{" "}
            with your local area, we will see what we can do.
          </p>
          <p className="font-bold text-lg sm:text-xl md:text-2xl text-blue-600 mt-6">
            ALL COMMUNITIES WILL BENEFIT FROM THIS PROJECT;
          </p>
          <p className="italic text-base sm:text-lg">
            Thank you for reading, hope to hear from you soon;
          </p>
        </div>
      </div>
    </>
  );
}
