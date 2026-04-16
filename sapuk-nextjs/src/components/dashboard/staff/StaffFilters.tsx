"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StaffFiltersProps = {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearch: () => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  activeFilter: string;
  onActiveFilterChange: (value: string) => void;
};

export function StaffFilters({
  searchInput,
  onSearchInputChange,
  onSearch,
  roleFilter,
  onRoleFilterChange,
  activeFilter,
  onActiveFilterChange,
}: StaffFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Search staff..."
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="w-full sm:w-64"
        />
        <Button
          variant="secondary"
          size="sm"
          className="bg-button-blue hover:bg-button-blue/80 font-bold"
          onClick={onSearch}
        >
          Search
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={roleFilter} onValueChange={onRoleFilterChange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
        <Select value={activeFilter} onValueChange={onActiveFilterChange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
