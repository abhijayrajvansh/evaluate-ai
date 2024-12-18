import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import "dotenv/config";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

const DATABASE_URL = process.env.DATABASE_URL as string;
const NODE_ENV = process.env.NODE_ENV as string;

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(DATABASE_URL);
if (NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });