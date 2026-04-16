"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Event } from "./types";

type DeleteEventDialogProps = {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  actionError: string | null;
  actionLoading: boolean;
};

export function DeleteEventDialog({
  event,
  open,
  onOpenChange,
  onConfirm,
  actionError,
  actionLoading,
}: DeleteEventDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete event</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{event?.title ?? "this event"}
            &quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {actionError && (
          <p className="text-sm text-destructive font-medium">{actionError}</p>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={actionLoading}
          >
            {actionLoading ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
