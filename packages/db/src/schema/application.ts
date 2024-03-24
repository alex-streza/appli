import { sql } from "drizzle-orm";
import { pgEnum, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./user";

export const statusEnum = pgEnum("status", [
  "SAVED",
  "APPLIED",
  "INTERVIEWING",
  "OFFERED",
  "GHOSTED",
  "REJECTED",
]);

export const applications = pgTable("application", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  rawDescription: text("raw_description"),
  salary: varchar("salary", { length: 64 }),
  location: varchar("location", { length: 128 }),
  company: varchar("company", { length: 128 }).notNull(),
  companyURL: varchar("company_url", { length: 128 }).notNull(),
  url: varchar("url", { length: 128 }).notNull(),
  technologies: varchar("technologies", { length: 64 }).array(),

  status: statusEnum("status").default("SAVED").notNull(),

  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),

  savedAt: timestamp("saved_at").notNull(),
  appliedAt: timestamp("applied_at"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export type Application = typeof applications.$inferSelect;
export type Status = Application["status"];
