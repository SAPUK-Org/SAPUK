"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UseFormReturn } from "react-hook-form";
import type { ChampFormValues } from "./types";
import { ChampForm } from "./ChampForm";

type ChampFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  form: UseFormReturn<ChampFormValues>;
  onSubmit: (values: ChampFormValues) => Promise<void>;
  actionError: string | null;
  actionLoading: boolean;
  onCancel: () => void;
  slugAuto?: boolean;
};

export function ChampFormDialog({
  open,
  onOpenChange,
  title,
  description,
  form,
  onSubmit,
  actionError,
  actionLoading,
  onCancel,
  slugAuto,
}: ChampFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ChampForm
          form={form}
          onSubmit={onSubmit}
          actionError={actionError}
          actionLoading={actionLoading}
          onCancel={onCancel}
          slugAuto={slugAuto}
        />
      </DialogContent>
    </Dialog>
  );
}
