import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { count, eq, schema } from "@appli/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const waitlistRouter = createTRPCRouter({
  joinWaitlist: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx }) => {
      const waitlistEntries = await ctx.db
        .select()
        .from(schema.waitlists)
        .where(eq(schema.waitlists.email, input.email));

      if (waitlistEntries.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You are already on the waitlist. A bit eager, aren't we?",
        });
      }

      await ctx.db.insert(schema.waitlists).values({
        email: input.email,
      });

      const waitlistsCount = await ctx.db
        .select({ value: count() })
        .from(schema.waitlists);

      return {
        count: waitlistsCount?.[0]?.value ?? 0,
      };
    }),
});
