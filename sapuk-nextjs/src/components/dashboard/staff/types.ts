import * as z from "zod";

export type StaffMember = {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export const createStaffSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["admin", "editor", "staff"]),
});

export const editStaffSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["admin", "editor", "staff"]),
});

export type CreateStaffValues = z.infer<typeof createStaffSchema>;
export type EditStaffValues = z.infer<typeof editStaffSchema>;
