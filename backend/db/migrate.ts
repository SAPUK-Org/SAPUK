import { spawnSync } from "child_process";
import path from "path";
import dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "development";
const repoRoot = path.resolve(__dirname, "../..");

dotenv.config({
  path: path.resolve(__dirname, `../.env.${ENV}`),
});

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  console.error(
    `DATABASE_URL is not set. Add it to backend/.env.${ENV} before running migrations.`,
  );
  process.exit(1);
}

const args = [
  "db",
  "push",
  "--db-url",
  databaseUrl,
  "--include-all",
  "--workdir",
  repoRoot,
];

console.log(`Running Supabase migrations (${ENV})…`);

const result = spawnSync("supabase", args, {
  stdio: "inherit",
  env: process.env,
});

if (result.error) {
  console.error(
    "\nFailed to run supabase CLI. Install it with: brew install supabase/tap/supabase",
  );
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
