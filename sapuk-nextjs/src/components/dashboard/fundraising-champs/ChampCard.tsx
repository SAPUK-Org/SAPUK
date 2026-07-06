"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Pencil, Trash2 } from "lucide-react";
import type { FundraisingChamp } from "@/types/cms";
import { getChampPublicPath } from "./types";

type ChampCardProps = {
  champ: FundraisingChamp;
  onToggleActive: (champ: FundraisingChamp) => void | Promise<void>;
  isToggleLoading?: boolean;
  onEdit: (champ: FundraisingChamp) => void;
  onDelete: (champ: FundraisingChamp) => void;
};

export function ChampCard({
  champ,
  onToggleActive,
  isToggleLoading = false,
  onEdit,
  onDelete,
}: ChampCardProps) {
  const isPublic = champ.is_active !== false;

  return (
    <Card className="overflow-hidden border-zinc-200 bg-zinc-50/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-1">
            <CardTitle className="text-lg leading-tight">{champ.name}</CardTitle>
            {isPublic ? (
              <Link
                href={getChampPublicPath(champ.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline truncate"
              >
                {getChampPublicPath(champ.slug)}
              </Link>
            ) : (
              <p className="text-xs text-muted-foreground truncate">
                {getChampPublicPath(champ.slug)} (hidden)
              </p>
            )}
            {!isPublic ? (
              <span className="w-fit rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                Hidden from public site
              </span>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={isToggleLoading}
              onClick={() => onToggleActive(champ)}
              aria-label={isPublic ? "Hide from public site" : "Show on public site"}
            >
              {isToggleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isPublic ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(champ)}
              aria-label="Edit champ"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-500"
              onClick={() => onDelete(champ)}
              aria-label="Delete champ"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {(champ.logo || champ.image) && (
          <div className="relative mt-2 h-20 w-20 overflow-hidden rounded-lg border bg-white">
            <Image
              src={(champ.logo || champ.image)!}
              alt={champ.name}
              fill
              className="object-contain p-1"
              unoptimized
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {champ.summary}
        </p>
        <p className="mt-2 text-xs text-muted-foreground capitalize">
          {champ.champ_type}
        </p>
      </CardContent>
    </Card>
  );
}
