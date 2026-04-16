import type { SanitizedUser } from "./index";

declare module "express-serve-static-core" {
  interface Request {
    user?: SanitizedUser;
  }
}

export {};
