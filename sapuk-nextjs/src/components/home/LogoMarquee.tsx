import type { Logo } from "@/types";
import Image from "next/image";

const logos: Logo[] = [
  {
    src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwyzDKttgRuawkUngMC7pY038GsBDPEeTvIf2F",
    alt: "Hub of Hope logo",
  },
  {
    src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpw9rPKh5vV7rdpiNRmntIauBDbU2woZzys0X4S",
    alt: "Zero Suicide Alliance logo",
  },
  {
    src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpw0hZ8gjFQtd48CNoKsIETL2hUnYrMvkBgqDAc",
    alt: "American Association of Suicidology logo",
  },
  {
    src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwvm5bZ2T2qxyKSlDUL7mMZhIpYboQG59NEz81",
    alt: "Umbrella Wellness logo",
  },
  {
    src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwAnPbzd3fuMIi6S4t3F9R2VjODnQvNwYB8mkx",
    alt: "The Semi Colon Shop logo",
  },
  {
    src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwMaVwkGmblbWek0TfEwKpGUh2BmdRvnyaj6rt",
    alt: "Project Semi Colon logo",
  },
  {
    src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwE8N0mU43QmOTC9eAt5UV4J1gyh6ujKqZw2Dk",
    alt: "The Mental Health Experts logo",
  },
  {
    src: "https://dju754gknh.ufs.sh/f/Uv1WD6etinpwDbcRlNobMfP3nJvjxdBZTHLXNcoqwtVz57ey",
    alt: "Futsal Camp logo",
  },
];

export default function LogoMarquee() {
  return (
    <div className="relative flex overflow-hidden shadow-lg rounded-lg group w-full max-w-7xl mx-auto">
      {/* First set of logos */}
      <div className="flex animate-marquee p-5 whitespace-nowrap">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="mx-4 flex items-center justify-center w-[100px] sm:w-[150px]"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={100}
              className="w-full h-auto hover:scale-110 transition-all duration-300 select-none pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Duplicate set of logos for seamless loop */}
      <div className="flex absolute top-0 animate-marquee2 p-5 whitespace-nowrap">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="mx-4 flex items-center justify-center w-[100px] sm:w-[150px]"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={100}
              className="w-full h-auto hover:scale-110 transition-all duration-300 select-none pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
