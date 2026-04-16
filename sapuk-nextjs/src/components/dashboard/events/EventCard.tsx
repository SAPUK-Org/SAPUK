"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash2 } from "lucide-react";
import type { Event } from "./types";
import { formatEventDateTime } from "./events-utils";
import Image from "next/image";
import { Label } from "@/components/ui/label";

type EventCardProps = {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
};

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  return (
    <Card className="overflow-hidden border-zinc-200 bg-zinc-50/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(event)}
              aria-label="Edit event"
            >
              <Pencil className="h-4 w-4 text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-500"
              onClick={() => onDelete(event)}
              aria-label="Delete event"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {event.cover_image && (
          <div className="relative w-full h-32 sm:h-40 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={event.cover_image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 pt-2">
          <Label>{formatEventDateTime(event)}</Label>
          <p className="text-sm text-muted-foreground">
            {event.location} • {event.type}
            {event.max_volunteers != null
              ? ` • Max ${event.max_volunteers} volunteers`
              : " • Volunteers: TBC"}
          </p>
        </div>
      </CardHeader>
      <Separator className="mx-6 w-auto" />
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {event.description}
        </p>
      </CardContent>
    </Card>
  );
}
