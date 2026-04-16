import { SocialIcon } from "react-social-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col bg-footer text-secondary-foreground relative">
      <div
        className="absolute inset-0 bg-contain bg-center"
        style={{
          backgroundImage:
            'url("https://dju754gknh.ufs.sh/f/Uv1WD6etinpwjxdmaFU2sga69fPjWHmSeMVYkrxd0nlhZt3p")',
        }}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-3 items-start md:justify-items-center gap-8 py-20 px-4 md:px-10 border-b">
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Resources</h3>
          <div className="flex flex-col space-y-2">
            <Link
              href="/sapukhub/students"
              className="hover:text-zinc-300 hover:underline"
            >
              Students
            </Link>
            <Link
              href="/sapukhub/supporting-suicidal-thoughts"
              className="hover:text-zinc-300 hover:underline"
            >
              Mental Health Support
            </Link>
            <Link
              href="/sapservices/downloadable-media"
              className="hover:text-zinc-300 hover:underline"
            >
              Downloadable Media
            </Link>
            <Link
              href="/volunteer"
              className="hover:text-zinc-300 hover:underline"
            >
              Volunteer
            </Link>
            <Link
              href="/sapservices/community"
              className="hover:text-zinc-300 hover:underline"
            >
              Community Support
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <div className="flex flex-col space-y-2">
            <Link href="/" className="hover:text-zinc-300 hover:underline">
              Home
            </Link>
            <Link
              href="/sapevolution"
              className="hover:text-zinc-300 hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/sapukhub/students"
              className="hover:text-zinc-300 hover:underline"
            >
              Students
            </Link>
            <Link
              href="/sapservices/contact-us"
              className="hover:text-zinc-300 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <div className="space-y-2">
            <p>Email: admin@suicideapuk.co.uk</p>
            <p>
              Address: 1 Evolution Park <br /> Haslingden Road, Blackburn, BB1
              2FD
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between py-5 px-4 md:px-10 space-y-4 md:space-y-0">
        <p className="text-center md:text-left text-sm md:text-base">
          &copy; {new Date().getFullYear()} SAP;UK - Est 2016 - 12438544 /{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy{" "}
          </Link>
          /{" "}
          <Link
            href="https://terryward.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lovingly designed & built by Terry Ward
          </Link>
        </p>
        <ul className="flex flex-row items-center justify-center gap-3">
          <li>
            <SocialIcon
              network="x"
              url="https://x.com/suicideapuk"
              target="_blank"
              style={{ height: 22, width: 22 }}
            />
          </li>
          <li>
            <SocialIcon
              network="facebook"
              url="https://facebook.com/suicideapuk"
              target="_blank"
              style={{ height: 22, width: 22 }}
            />
          </li>
          <li>
            <SocialIcon
              network="pinterest"
              url="https://pinterest.com/danisacee"
              target="_blank"
              style={{ height: 22, width: 22 }}
            />
          </li>
          <li>
            <SocialIcon
              network="linkedin"
              url="https://linkedin.com/in/dan-shaw-36543119b"
              target="_blank"
              style={{ height: 22, width: 22 }}
            />
          </li>
          <li>
            <SocialIcon
              network="instagram"
              url="https://instagram.com/suicideapuk"
              target="_blank"
              style={{ height: 22, width: 22 }}
            />
          </li>
        </ul>
      </div>
    </footer>
  );
}
