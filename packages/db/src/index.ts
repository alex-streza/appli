import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as application from "./schema/application";
import * as resumes from "./schema/resume";
import * as users from "./schema/user";
import * as waitlists from "./schema/waitlist";

export const schema = {
  ...application,
  ...waitlists,
  ...resumes,
  ...users,
};

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, {
  schema,
});
