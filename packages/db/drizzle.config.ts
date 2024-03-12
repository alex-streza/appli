import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  tablesFilter: ["appli_*"],
} satisfies Config;
