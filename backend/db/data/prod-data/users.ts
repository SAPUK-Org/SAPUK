import { User } from "../../../types";

export const users: User[] = [
  {
    username: "Tibbs",
    email: "tibbs@suicideapuk.co.uk",
    password_hash: "mySAPUKp4ssw0rd!",
    role: "admin",
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    username: "Dan",
    email: "danielle@suicideapuk.co.uk",
    password_hash: "t3mpp455w0rd!",
    role: "admin",
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
