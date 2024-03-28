import { sql } from "drizzle-orm";
import { json, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./user";

export const resumes = pgTable("resume", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 128 }),
  url: varchar("url", { length: 128 }),
  linkedin: varchar("linkedin", { length: 128 }),
  github: varchar("github", { length: 128 }),
  website: varchar("personal_website", { length: 128 }),
  fields: json("fields"),

  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});
