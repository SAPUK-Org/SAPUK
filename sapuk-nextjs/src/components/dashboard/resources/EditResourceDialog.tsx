"use client";

import type { Resource } from "@/components/dashboard/resources/ResourceDisplay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type EditResourceDialogProps = {
  resource: Resource | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editFileName: string;
  onEditFileNameChange: (value: string) => void;
  editNotes: string;
  onEditNotesChange: (value: string) => void;
  onSave: () => void;
  isSaving?: boolean;
};

export function EditResourceDialog({
  resource,
  open,
  onOpenChange,
  editFileName,
  onEditFileNameChange,
  editNotes,
  onEditNotesChange,
  onSave,
  isSaving = false,
}: EditResourceDialogProps) {
  if (!resource) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-200">
        <DialogHeader>
          <DialogTitle>Edit resource</DialogTitle>
          <DialogDescription>
            Update the file name and notes for this resource.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-file-name">File name</Label>
            <Input
              id="edit-file-name"
              value={editFileName}
              onChange={(e) => onEditFileNameChange(e.target.value)}
              placeholder="Enter file name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-notes">
              Notes for team (what this resource is for)
            </Label>
            <Textarea
              id="edit-notes"
              value={editNotes}
              onChange={(e) => onEditNotesChange(e.target.value)}
              placeholder="Add context for other team members…"
              rows={3}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
