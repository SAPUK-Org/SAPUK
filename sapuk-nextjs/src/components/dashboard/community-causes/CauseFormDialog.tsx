"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UseFormReturn } from "react-hook-form";
import type { CauseFormValues } from "./types";
import { CauseForm } from "./CauseForm";

type CauseFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  form: UseFormReturn<CauseFormValues>;
  onSubmit: (values: CauseFormValues) => Promise<void>;
  actionError: string | null;
  actionLoading: boolean;
  onCancel: () => void;
};

export function CauseFormDialog({
  open,
  onOpenChange,
  title,
  description,
  form,
  onSubmit,
  actionError,
  actionLoading,
  onCancel,
}: CauseFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <CauseForm
          form={form}
          onSubmit={onSubmit}
          actionError={actionError}
          actionLoading={actionLoading}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
