"use client";

import { FileText } from "lucide-react";

export type ResourceType = "image" | "document" | "video" | "other";

export type Resource = {
  id: number;
  url: string;
  mime_type: string;
  resource_type: ResourceType;
  file_name: string;
  file_key?: string | null;
  uploaded_by?: number | null;
  attachable_type?: string | null;
  attachable_id?: number | null;
  metadata?: Record<string, unknown> | null;
  notes?: string | null;
  created_at?: string;
};

type ResourceDisplayProps = {
  resource: Resource;
  className?: string;
  /** For images: object-fit style */
  objectFit?: "contain" | "cover" | "fill" | "none";
};

/**
 * Renders a preview for the resource inside its container.
 * For documents and "other" types, shows a placeholder only — use a separate
 * button outside the container to open the file.
 */
export function ResourceDisplay({
  resource,
  className = "",
  objectFit = "cover",
}: ResourceDisplayProps) {
  switch (resource.resource_type) {
    case "image":
      return (
        <img
          src={resource.url}
          alt={resource.file_name}
          className={className}
          style={{ objectFit }}
        />
      );
    case "document":
    case "other":
      return (
        <div
          className={`flex flex-col items-center justify-center gap-2 text-primary-foreground ${className}`}
        >
          <FileText className="h-12 w-12" aria-hidden />
          <span className="text-xs truncate max-w-full px-2 text-center">
            {resource.file_name}
          </span>
        </div>
      );
    case "video":
      return <video src={resource.url} controls className={className} />;
    default:
      return (
        <div
          className={`flex flex-col items-center justify-center gap-2 text-primary-foreground ${className}`}
        >
          <FileText className="h-12 w-12" aria-hidden />
          <span className="text-xs truncate max-w-full px-2 text-center">
            {resource.file_name}
          </span>
        </div>
      );
  }
}
