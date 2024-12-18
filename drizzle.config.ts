import { type Config } from "drizzle-kit";
import { DATABASE_URL } from "@/config";

export default {
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  out: "./server/db/migrations",
  dbCredentials: { url: DATABASE_URL as string },
  verbose: true,
  strict: true,
  tablesFilter: ["evaluate-ai_*"],
} satisfies Config;
  