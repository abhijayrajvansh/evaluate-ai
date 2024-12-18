import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { DATABASE_URL, NODE_ENV } from "@/config";


/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(DATABASE_URL);
if (NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
