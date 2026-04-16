"use client";

import { useCallback, useEffect, useState } from "react";
import { Phone, Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { CrisisResource } from "@/components/dashboard/types";

export function CrisisContactsCard() {
  const { token } = useAuth();
  const [contacts, setContacts] = useState<CrisisResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    name?: string;
    phone_or_url?: string;
    hours?: string;
    type?: "crisis" | "support";
  }>({});
  const [adding, setAdding] = useState(false);
  const [newContact, setNewContact] = useState<{
    name: string;
    phone_or_url: string;
    hours: string;
    type: "crisis" | "support";
  }>({ name: "", phone_or_url: "", hours: "", type: "crisis" });
  const [saving, setSaving] = useState(false);

  const fetchContacts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const { data, ok } = await api<{
      crisis_resources?: CrisisResource[];
      msg?: string;
    }>("/api/db/crisis-resources", "GET", { token });
    setLoading(false);
    if (ok && data?.crisis_resources) {
      setContacts(
        data.crisis_resources.filter((c) => c.is_active !== false) ?? [],
      );
    } else {
      setError((data as { msg?: string })?.msg ?? "Failed to load contacts");
      setContacts([]);
    }
  }, [token]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const startEdit = (contact: CrisisResource) => {
    if (contact.id == null) return;
    setEditingContactId(contact.id);
    setEditValues({
      name: contact.name,
      phone_or_url: contact.phone_or_url,
      hours: contact.hours ?? "",
      type: contact.type,
    });
  };

  const cancelEdit = () => {
    setEditingContactId(null);
    setEditValues({});
  };

  const saveEdit = useCallback(
    async (id: number) => {
      if (!token || !editValues.name || !editValues.phone_or_url) {
        toast.error("Name and phone/URL are required");
        return;
      }
      setSaving(true);
      const { data, ok } = await api<{
        crisis_resource?: CrisisResource;
        msg?: string;
      }>(`/api/db/crisis-resources/${id}`, "PUT", {
        token,
        body: {
          name: editValues.name,
          phone_or_url: editValues.phone_or_url,
          type: editValues.type ?? "crisis",
          hours: editValues.hours || null,
          description: null,
          sort_order: 0,
          is_active: true,
        },
      });
      setSaving(false);
      if (ok && data?.crisis_resource) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? data.crisis_resource! : c)),
        );
        setEditingContactId(null);
        setEditValues({});
        toast.success("Contact updated");
      } else {
        toast.error((data as { msg?: string })?.msg ?? "Failed to update");
      }
    },
    [token, editValues],
  );

  const addContact = useCallback(async () => {
    if (!token || !newContact.name || !newContact.phone_or_url) {
      toast.error("Name and phone/URL are required");
      return;
    }
    setSaving(true);
    const { data, ok } = await api<{
      crisis_resource?: CrisisResource;
      msg?: string;
    }>("/api/db/crisis-resources", "POST", {
      token,
      body: {
        name: newContact.name,
        phone_or_url: newContact.phone_or_url,
        type: newContact.type,
        hours: newContact.hours || null,
        description: null,
        sort_order: 0,
        is_active: true,
      },
    });
    setSaving(false);
    if (ok && data?.crisis_resource) {
      setContacts((prev) => [data.crisis_resource!, ...prev]);
      setNewContact({ name: "", phone_or_url: "", hours: "", type: "crisis" });
      setAdding(false);
      toast.success("Contact added");
    } else {
      toast.error((data as { msg?: string })?.msg ?? "Failed to add contact");
    }
  }, [token, newContact]);

  const removeContact = useCallback(
    async (id: number) => {
      if (!token) return;
      setSaving(true);
      const { ok } = await api(`/api/db/crisis-resources/${id}`, "DELETE", {
        token,
      });
      setSaving(false);
      if (ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        setEditingContactId(null);
        toast.success("Contact removed");
      } else {
        toast.error("Failed to remove contact");
      }
    },
    [token],
  );

  return (
    <Card className="h-full min-h-0 flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <Phone className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-foreground">Crisis Contacts</CardTitle>
        </div>
        <CardAction className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAdding(true)}
            disabled={saving}
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Create
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (editing) cancelEdit();
              setEditing(!editing);
            }}
          >
            {editing ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" /> Done
              </>
            ) : (
              <>
                <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
              </>
            )}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 overflow-hidden p-6 pt-0">
        <ScrollArea className="h-full pr-3">
          <div className="flex flex-col gap-3">
            {adding && (
              <div className="flex flex-col gap-2 p-2 rounded-lg bg-secondary/50 border border-dashed border-border">
                <Input
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  placeholder="Contact name"
                  className="text-sm"
                  disabled={saving}
                />
                <Input
                  value={newContact.phone_or_url}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      phone_or_url: e.target.value,
                    })
                  }
                  placeholder="Phone number or URL"
                  className="text-sm"
                  disabled={saving}
                />
                <div className="flex gap-2">
                  <Input
                    value={newContact.hours}
                    onChange={(e) =>
                      setNewContact({ ...newContact, hours: e.target.value })
                    }
                    placeholder="Availability"
                    className="text-sm flex-1"
                    disabled={saving}
                  />
                  <Button
                    size="sm"
                    onClick={addContact}
                    className="bg-primary text-primary-foreground"
                    disabled={saving}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setAdding(false)}
                    disabled={saving}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}
            {loading ? (
              <p className="text-sm text-muted-foreground py-4">Loading...</p>
            ) : error ? (
              <p className="text-sm text-destructive py-4">{error}</p>
            ) : contacts.length === 0 && !adding ? (
              <p className="text-sm text-muted-foreground py-4">
                No crisis contacts yet.
              </p>
            ) : (
              contacts.map((contact, i) => (
                <div key={contact.id ?? i}>
                  {contact.id != null && editingContactId === contact.id ? (
                    <div className="flex flex-col gap-2 p-2 rounded-lg bg-secondary/50">
                      <Input
                        value={editValues.name ?? ""}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                        placeholder="Contact name"
                        className="text-sm"
                        disabled={saving}
                      />
                      <Input
                        value={editValues.phone_or_url ?? ""}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            phone_or_url: e.target.value,
                          })
                        }
                        placeholder="Phone number or URL"
                        className="text-sm"
                        disabled={saving}
                      />
                      <div className="flex gap-2">
                        <Input
                          value={editValues.hours ?? ""}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              hours: e.target.value,
                            })
                          }
                          placeholder="Availability (e.g. 24/7)"
                          className="text-sm flex-1"
                          disabled={saving}
                        />
                        <Button
                          size="sm"
                          onClick={() => saveEdit(contact.id!)}
                          className="bg-primary text-primary-foreground"
                          disabled={saving}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={cancelEdit}
                          disabled={saving}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground truncate">
                            {contact.name}
                          </p>
                          {contact.type === "crisis" && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0"
                            >
                              Priority
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-mono text-primary font-semibold mt-0.5">
                          {contact.phone_or_url}
                        </p>
                        {contact.hours && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {contact.hours}
                          </p>
                        )}
                      </div>
                      {editing && contact.id != null && (
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground hover:text-primary"
                            onClick={() => startEdit(contact)}
                            disabled={saving}
                          >
                            <Pencil className="h-3 w-3 text-primary" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground hover:text-primary"
                            onClick={() => removeContact(contact.id!)}
                            disabled={saving}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  {i < contacts.length - 1 && <Separator className="mt-3" />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
