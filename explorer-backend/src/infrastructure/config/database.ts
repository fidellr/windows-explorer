import { Client } from "pg";

// DB connection
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/win_explorer_db";

export const pg = new Client({ connectionString: DATABASE_URL });
await pg.connect();
