"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StaffMember } from "./types";

type StaffCardListProps = {
  staff: StaffMember[];
  onChangeRole: (id: number, role: string) => void;
  onToggleActive: (member: StaffMember) => void;
  onEdit: (member: StaffMember) => void;
  onDelete: (member: StaffMember) => void;
};

export function StaffCardList({
  staff,
  onChangeRole,
  onToggleActive,
  onEdit,
  onDelete,
}: StaffCardListProps) {
  return (
    <div className="space-y-4">
      {staff.map((m) => (
        <Card key={m.id}>
          <CardHeader className="pb-2">
            <p className="font-semibold">{m.username}</p>
            <p className="text-sm text-muted-foreground">{m.email}</p>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Role</p>
              <Select
                value={m.role}
                onValueChange={(v) => onChangeRole(m.id, v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin" className="font-bold">
                    Admin
                  </SelectItem>
                  <SelectItem value="editor" className="font-bold">
                    Editor
                  </SelectItem>
                  <SelectItem value="staff" className="font-bold">
                    Staff
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Status
              </p>
              <span
                className={
                  m.is_active
                    ? "text-green-600 font-bold dark:text-green-500"
                    : "text-red-600 font-bold dark:text-red-500"
                }
              >
                {m.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleActive(m)}
              className="bg-button-blue hover:bg-button-blue/80 text-white font-extrabold"
            >
              {m.is_active ? "Deactivate" : "Activate"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(m)}
              className="bg-button-blue hover:bg-button-blue/80 text-white font-extrabold"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(m)}
              className="bg-red-500 hover:bg-red-600 text-white font-extrabold"
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
