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
import type { StaffMember } from "./types";

type DeleteStaffDialogProps = {
  staff: StaffMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  actionLoading: boolean;
};

export function DeleteStaffDialog({
  staff,
  open,
  onOpenChange,
  onConfirm,
  actionLoading,
}: DeleteStaffDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete staff member</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            {staff ? <strong>{staff.username}</strong> : "this staff member"}? This
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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
