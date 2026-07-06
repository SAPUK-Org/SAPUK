import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { footerLinkGroups } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const FOOTER_LINK_CLASS =
  "text-sm text-secondary-foreground/90 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded-sm";

const SOCIAL_LINKS = [
  { network: "x", url: "https://x.com/suicideapuk" },
  { network: "facebook", url: "https://facebook.com/suicideapuk" },
  { network: "pinterest", url: "https://pinterest.com/danisacee" },
  { network: "linkedin", url: "https://linkedin.com/in/dan-shaw-36543119b" },
  { network: "instagram", url: "https://instagram.com/suicideapuk" },
] as const;

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  const headingId = `footer-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <nav aria-labelledby={headingId} className="min-w-0">
      <h3 id={headingId} className="text-lg font-semibold text-white">
        {title}
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={FOOTER_LINK_CLASS}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="relative flex w-full flex-col bg-footer text-secondary-foreground">
      <div className="border-b border-white/10 px-4 py-14 md:px-10 lg:py-16">
        <div className="mx-auto grid max-w-[1420px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-8">
          {footerLinkGroups.map((group) => (
            <FooterLinkColumn
              key={group.title}
              title={group.title}
              links={group.links}
            />
          ))}

          <div className="min-w-0 sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <h3
              id="footer-contact"
              className="text-lg font-semibold text-white"
            >
              Contact us
            </h3>
            <address className="mt-3 space-y-3 text-sm not-italic text-secondary-foreground/90">
              <p>
                <span className="font-medium text-white">Email</span>
                <br />
                <Link
                  href="mailto:admin@suicideapuk.co.uk"
                  className={cn(FOOTER_LINK_CLASS, "inline-block mt-1")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  admin@suicideapuk.co.uk
                </Link>
              </p>
              <p>
                <span className="font-medium text-white">Address</span>
                <br />
                1 Evolution Park
                <br />
                Haslingden Road, Blackburn, BB1 2FD
              </p>
              <p>
                <span className="font-medium text-white">
                  Dewsbury (Kirklees)
                </span>
                <br />
                <Link
                  href="/how-we-can-help-you/local/dewsbury"
                  className={cn(FOOTER_LINK_CLASS, "inline-block mt-1")}
                >
                  Local services
                </Link>
                {" · "}
                <Link
                  href="mailto:dewsburyoffice@suicideapuk.co.uk"
                  className={cn(FOOTER_LINK_CLASS, "inline-block")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dewsburyoffice@suicideapuk.co.uk
                </Link>
              </p>
              <p>
                <span className="font-medium text-white">Lancashire</span>
                <br />
                <Link
                  href="/how-we-can-help-you/local/lancashire"
                  className={cn(FOOTER_LINK_CLASS, "inline-block mt-1")}
                >
                  Local services
                </Link>
                {" · "}
                <Link
                  href="mailto:lancashireoffice@suicideapuk.co.uk"
                  className={cn(FOOTER_LINK_CLASS, "inline-block")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  lancashireoffice@suicideapuk.co.uk
                </Link>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between gap-4 px-4 py-5 md:flex-row md:items-start md:px-10">
        <p className="text-center text-sm md:text-left md:text-base">
          &copy; {new Date().getFullYear()} SAP;UK — Est 2016 — 12438544 /{" "}
          <Link
            href="/privacy-policy"
            className={FOOTER_LINK_CLASS}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy policy
          </Link>{" "}
          /{" "}
          <Link
            href="https://tibbstech.co.uk"
            className={FOOTER_LINK_CLASS}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lovingly designed & built by Tibbs Tech
          </Link>
        </p>
        <ul className="flex flex-row items-center justify-center gap-3">
          {SOCIAL_LINKS.map(({ network, url }) => (
            <li key={network}>
              <SocialIcon
                network={network}
                url={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: 22, width: 22 }}
                aria-label={`SAPUK on ${network}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
