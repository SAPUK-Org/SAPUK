"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardLog } from "@/components/dashboard/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function LogsTable() {
  const { token, user } = useAuth();
  const [logs, setLogs] = useState<DashboardLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    user_id: "",
    action: "",
    resource_type: "",
    resource_id: "",
    method: "",
    route: "",
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 400);
    return () => clearTimeout(handle);
  }, [filters]);

  const fetchLogs = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const searchParams: Record<string, string> = {};
    if (debouncedFilters.user_id.trim()) {
      searchParams.user_id = debouncedFilters.user_id.trim();
    }
    if (debouncedFilters.action.trim()) {
      searchParams.action = debouncedFilters.action.trim();
    }
    if (debouncedFilters.resource_type.trim()) {
      searchParams.resource_type = debouncedFilters.resource_type.trim();
    }
    if (debouncedFilters.resource_id.trim()) {
      searchParams.resource_id = debouncedFilters.resource_id.trim();
    }
    if (debouncedFilters.method.trim()) {
      searchParams.method = debouncedFilters.method.trim();
    }
    if (debouncedFilters.route.trim()) {
      searchParams.route = debouncedFilters.route.trim();
    }

    const { data, ok } = await api<{ logs?: DashboardLog[]; msg?: string }>(
      "/api/db/logs",
      "GET",
      { token, searchParams },
    );
    setLoading(false);
    if (ok && data?.logs) {
      setLogs(data.logs);
    } else {
      setError((data as { msg?: string })?.msg ?? "Failed to load logs");
      setLogs([]);
    }
  }, [token, debouncedFilters]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (!token || user?.role !== "admin") {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Audit logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col space-y-1 w-[120px]">
              <Label htmlFor="logs-user-id">User ID</Label>
              <Input
                id="logs-user-id"
                type="number"
                inputMode="numeric"
                placeholder="e.g. 1"
                value={filters.user_id}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    user_id: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1 w-[140px]">
              <Label htmlFor="logs-action">Action</Label>
              <Input
                id="logs-action"
                placeholder="e.g. create event"
                value={filters.action}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    action: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1 w-[140px]">
              <Label htmlFor="logs-resource-type">Resource type</Label>
              <Input
                id="logs-resource-type"
                placeholder="user, event…"
                value={filters.resource_type}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    resource_type: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1 w-[120px]">
              <Label htmlFor="logs-resource-id">Resource ID</Label>
              <Input
                id="logs-resource-id"
                type="number"
                inputMode="numeric"
                placeholder="e.g. 2"
                value={filters.resource_id}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    resource_id: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1 w-[120px]">
              <Label htmlFor="logs-method">Method</Label>
              <Select
                value={filters.method || "any"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    method: value === "any" ? "" : value,
                  }))
                }
              >
                <SelectTrigger id="logs-method">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1 min-w-[200px]">
              <Label htmlFor="logs-route">Route contains</Label>
              <Input
                id="logs-route"
                placeholder="/api/dashboard/…"
                value={filters.route}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    route: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-1"
              disabled={loading}
              onClick={() =>
                setFilters({
                  user_id: "",
                  action: "",
                  resource_type: "",
                  resource_id: "",
                  method: "",
                  route: "",
                })
              }
            >
              Clear filters
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No logs have been recorded yet.
          </p>
        ) : (
          <div className="rounded-md border -mx-1">
            <Table className="min-w-[900px] text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Resource ID</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{log.user_id ?? "—"}</TableCell>
                    <TableCell className="max-w-[180px] truncate">
                      {log.action}
                    </TableCell>
                    <TableCell>{log.resource_type}</TableCell>
                    <TableCell>{log.resource_id ?? "—"}</TableCell>
                    <TableCell>{log.method ?? "—"}</TableCell>
                    <TableCell className="max-w-[260px] truncate">
                      {log.route ?? "—"}
                    </TableCell>
                    <TableCell>{log.status_code ?? "—"}</TableCell>
                    <TableCell>
                      {log.created_at
                        ? new Date(log.created_at).toLocaleString()
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
