"use client";

import { Button } from "@/components/ui/button";

type StaffPaginationProps = {
  page: number;
  total: number;
  limit: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function StaffPagination({
  page,
  total,
  limit,
  onPrevious,
  onNext,
}: StaffPaginationProps) {
  const totalPages = Math.ceil(total / limit);
  if (total <= limit) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={onPrevious}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
}
