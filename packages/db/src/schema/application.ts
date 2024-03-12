import { sql } from "drizzle-orm";
import {
  pgEnum,
  serial,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./user";


export const statusEnum = pgEnum("status", [
  "SAVED",
  "STARTED",
  "SUBMITTED",
  "APPLIED",
  "INTERVIEWING",
  "OFFERED",
]);

export const applications = pgTable("application", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }),
  raw_description: varchar("raw_description"),
  status: statusEnum("status"),
  url: varchar("url", { length: 128 }),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});
