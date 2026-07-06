"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StaffMember } from "./types";

type StaffTableProps = {
  staff: StaffMember[];
  onChangeRole: (id: number, role: string) => void;
  onToggleActive: (member: StaffMember) => void;
  onEdit: (member: StaffMember) => void;
  onDelete: (member: StaffMember) => void;
};

export function StaffTable({
  staff,
  onChangeRole,
  onToggleActive,
  onEdit,
  onDelete,
}: StaffTableProps) {
  return (
    <div className="rounded-md border border-border bg-white">
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.username}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell>
                <Select value={m.role} onValueChange={(v) => onChangeRole(m.id, v)}>
                  <SelectTrigger className="w-32 h-8">
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
              </TableCell>
              <TableCell>
                <span
                  className={
                    m.is_active
                      ? "text-green-600 font-bold dark:text-green-500"
                      : "text-red-600 font-bold dark:text-red-500"
                  }
                >
                  {m.is_active ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
