"use client";

import type {
  Event,
  EventExternalLink,
  EventStudioPartner,
} from "@/components/dashboard/events/types";
import { Button } from "@/components/ui/button";
import { TikTokVideoCarousel } from "./TikTokVideoCarousel";
import Image from "next/image";

function WebLinksList({ links }: { links: EventExternalLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className="space-y-2">
      <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-primary sm:text-left">
        Links
      </h3>
      <ul className="flex flex-wrap justify-center gap-2 sm:justify-start">
        {links.map((link, i) => (
          <li key={`web-${i}-${link.url}`}>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-zinc-600"
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventStudioPartnersGrid({
  studios,
}: {
  studios: EventStudioPartner[];
}) {
  if (studios.length === 0) return null;
  return (
    <div className="space-y-4 border-t border-zinc-700/60 pt-6">
      <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-primary sm:text-left">
        Partner studios
      </h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {studios.map((studio, i) => (
          <article
            key={`studio-${i}-${studio.name}`}
            className="flex flex-col overflow-hidden rounded-lg border border-zinc-700/80 bg-zinc-900/40 shadow-md"
          >
            {studio.imageSrc?.trim() ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-zinc-700/80 bg-zinc-950">
                <Image
                  width={1000}
                  height={1000}
                  src={studio.imageSrc}
                  alt={studio.name}
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h4 className="text-lg font-semibold text-primary">
                {studio.name}
              </h4>
              {studio.location?.trim() ? (
                <p className="text-sm text-zinc-400">{studio.location}</p>
              ) : null}
              {studio.description?.trim() ? (
                <p className="text-sm leading-relaxed text-primary/90">
                  {studio.description}
                </p>
              ) : null}
              {Array.isArray(studio.socialLinks) &&
              studio.socialLinks.length > 0 ? (
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {studio.socialLinks.map((s) => (
                    <li key={`${s.network}-${s.url}`}>
                      <Button variant="secondary" size="sm" asChild>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.network}
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

type EventProjectMediaProps = {
  event: Event;
};

/**
 * Renders `external_links` (web / TikTok) and `studio_partners` for the public
 * projects page. Image-type links are merged into the gallery carousel in
 * `ProjectDetailsDialog` (`unifiedEventGalleryImages`).
 */
export function EventProjectMedia({ event }: EventProjectMediaProps) {
  const links = event.external_links ?? [];
  const web = links.filter((l) => l.kind === "web");
  const tiktok = links.filter((l) => l.kind === "tiktok");
  const studios = event.studio_partners ?? [];

  const hasMedia = web.length > 0 || tiktok.length > 0 || studios.length > 0;

  if (!hasMedia) return null;

  return (
    <div className="space-y-8 border-t border-zinc-700/60 pt-6">
      <WebLinksList links={web} />
      {tiktok.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-primary sm:text-left">
            TikTok
          </h3>
          <TikTokVideoCarousel items={tiktok} />
        </div>
      ) : null}
      <EventStudioPartnersGrid studios={studios} />
    </div>
  );
}
