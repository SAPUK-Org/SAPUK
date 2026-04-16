"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResourceDisplay,
  type Resource,
} from "@/components/dashboard/resources/ResourceDisplay";
import { ExternalLink, FileText, Image, Pencil, Trash2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

function ResourceTypeIcon({ resource }: { resource: Resource }) {
  switch (resource.resource_type) {
    case "image":
      return <Image className="h-4 w-4 text-muted-foreground" />;
    case "document":
      return <FileText className="h-4 w-4 text-muted-foreground" />;
    case "video":
      return <Video className="h-4 w-4 text-muted-foreground" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
}

type ResourceCardProps = {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
  isDeleting?: boolean;
};

export function ResourceCard({ resource, onEdit, onDelete, isDeleting }: ResourceCardProps) {
  return (
    <Card className="overflow-hidden border-zinc-200 bg-zinc-50/50 h-fit">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            <ResourceTypeIcon resource={resource} />
            <CardTitle className="text-sm font-medium leading-tight truncate">
              {resource.file_name}
            </CardTitle>
          </div>
          <div className="flex shrink-0 gap-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => onEdit(resource)}
              aria-label={`Edit ${resource.file_name}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(resource)}
              disabled={isDeleting}
              aria-label={`Delete ${resource.file_name}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription className="text-xs">
          {resource.resource_type} • {resource.mime_type}
        </CardDescription>
        {resource.notes && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {resource.notes}
          </p>
        )}
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div
          className={`rounded-md overflow-hidden bg-muted flex items-center justify-center min-h-[120px] ${
            resource.resource_type === "image" || resource.resource_type === "video"
              ? "aspect-square"
              : "aspect-video"
          }`}
        >
          <ResourceDisplay
            resource={resource}
            className={
              resource.resource_type === "image" || resource.resource_type === "video"
                ? "w-full h-full max-h-[200px]"
                : ""
            }
            objectFit="contain"
          />
        </div>
        {(resource.resource_type === "document" || resource.resource_type === "other") && (
          <Button
            variant="outline"
            size="sm"
            className="w-fit bg-button-blue text-white hover:bg-button-blue/80 hover:text-white"
            asChild
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              download={resource.file_name}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open document
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
