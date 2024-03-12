import { sql } from "drizzle-orm";
import { boolean, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const waitlists = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 64 }).unique(),
  invited: boolean("invited").default(false),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});
