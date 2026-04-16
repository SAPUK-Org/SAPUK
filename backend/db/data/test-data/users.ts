import { User } from "../../../types";

export const users: User[] = [
  {
    username: "alice123",
    email: "alice@example.com",
    profile_picture:
      "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNRBf21AWCDRpigEzNJP8dCk4vYZFMmsa52wS3",
    password_hash: "password",
    role: "admin",
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    username: "bob123",
    email: "bob@example.com",
    profile_picture:
      "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNRBf21AWCDRpigEzNJP8dCk4vYZFMmsa52wS3",
    password_hash: "password",
    role: "editor",
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    username: "charlie123",
    email: "charlie@example.com",
    profile_picture:
      "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNRBf21AWCDRpigEzNJP8dCk4vYZFMmsa52wS3",
    password_hash: "password",
    role: "staff",
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    username: "deleted123",
    email: "deleted@example.com",
    profile_picture:
      "https://bi4a1aeb4i.ufs.sh/f/akEZKbpzclMNRBf21AWCDRpigEzNJP8dCk4vYZFMmsa52wS3",
    password_hash: "password",
    role: "staff",
    is_active: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
