// tsx seed.ts
import {
  randCompanyName,
  randCountry,
  randCurrencySymbol,
  randJobDescriptor,
  randJobTitle,
  randProgrammingLanguage,
  randUrl,
} from "@ngneat/falso";

import { db } from ".";
import { applications } from "./schema/application";
import { users } from "./schema/user";

type ApplicationToBeInserted = typeof applications.$inferInsert;

const generateApplicationRows = (
  count: number,
  userId: string,
): ApplicationToBeInserted[] => {
  const rows: ApplicationToBeInserted[] = [];

  for (let i = 0; i < count; i++) {
    rows.push({
      id: i + 1,
      title: randJobTitle(),
      rawDescription: randJobDescriptor(),
      salary: `${randCurrencySymbol()}${Math.floor(Math.random() * 200000)}`,
      location: randCountry(),
      company: randCompanyName(),
      companyURL: randUrl(),
      url: randUrl(),
      technologies: randProgrammingLanguage({
        length: 3,
      }),
      status: "SAVED",
      savedAt: new Date(),
      userId,
    });
  }

  return rows;
};

async function seed() {
  console.log("Seeding...");
  console.time("DB has been seeded!");

  // database teardown
  await db.delete(applications);

  const userId = "kp_fe4175a0357f45ba907057ec9eaa2406";
  await db.insert(users).values({
    id: userId,
    firstName: "Alex",
    email: "alex.streza@snowfox.art",
  });

  const newApplicationRows = generateApplicationRows(5, userId); // Generating 5 applications
  await db.insert(applications).values(newApplicationRows).returning();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seeding done!");
    process.exit(0);
  });
