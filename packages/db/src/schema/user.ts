import { sql } from "drizzle-orm";
import {
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { pgTable } from "./_table";

export const users = pgTable("user", {
  id: uuid("id").primaryKey(),
  firstName: varchar("first_name", { length: 64 }),
  lastName: varchar("last_name", { length: 64 }),
  email: varchar("email", { length: 64 }).unique(),
  phone: varchar("phone", { length: 16 }),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});
