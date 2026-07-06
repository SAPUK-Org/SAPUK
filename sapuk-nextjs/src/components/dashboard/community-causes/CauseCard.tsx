"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Pencil, Trash2 } from "lucide-react";
import type { CommunityCause } from "@/types/cms";

type CauseCardProps = {
  cause: CommunityCause;
  onToggleActive: (cause: CommunityCause) => void | Promise<void>;
  isToggleLoading?: boolean;
  onEdit: (cause: CommunityCause) => void;
  onDelete: (cause: CommunityCause) => void;
};

export function CauseCard({
  cause,
  onToggleActive,
  isToggleLoading = false,
  onEdit,
  onDelete,
}: CauseCardProps) {
  const isPublic = cause.is_active !== false;

  return (
    <Card className="overflow-hidden border-zinc-200 bg-zinc-50/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-1">
            <CardTitle className="text-lg leading-tight">{cause.name}</CardTitle>
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
              onClick={() => onToggleActive(cause)}
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
              onClick={() => onEdit(cause)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-500"
              onClick={() => onDelete(cause)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {cause.image && (
          <div className="relative mt-2 h-24 w-full overflow-hidden rounded-lg border bg-white">
            <Image
              src={cause.image}
              alt={cause.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {cause.summary}
        </p>
        {cause.link_url ? (
          <p className="mt-2 text-xs text-blue-600 truncate">{cause.link_url}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
