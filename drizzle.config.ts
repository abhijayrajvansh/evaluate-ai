import { type Config } from "drizzle-kit";
import 'dotenv/config';

export default {
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  out: "./server/db/migrations",
  dbCredentials: { url: env.DATABASE_URL as string },
  verbose: true,
  strict: true,
  tablesFilter: ["evaluate-ai_*"],
} satisfies Config;
