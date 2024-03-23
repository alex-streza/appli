import { z } from "zod";

import { and, eq, schema } from "@appli/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const applications = schema.applications;
type Application = typeof applications.$inferSelect;

export const applicationRouter = createTRPCRouter({
  getApplications: protectedProcedure.query(async ({ ctx }) => {
    const userApplications = await ctx.db
      .select()
      .from(applications)
      .where(eq(applications.userId, ctx.session.user.id));

    const applicationsGroupedByStatus = userApplications.reduce<{
      [status in Application["status"]]: Application[];
    }>(
      (acc, application) => {
        const status = application.status;
        if (!acc[status]) {
          acc[status] = [];
        }

        acc[status].push(application);

        return acc;
      },
      {
        SAVED: [],
        APPLIED: [],
        INTERVIEWING: [],
        OFFERED: [],
        GHOSTED: [],
        REJECTED: [],
      },
    );

    return {
      applications: applicationsGroupedByStatus,
    };
  }),
  updateApplicationStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(schema.statusEnum.enumValues),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(applications)
        .set({
          status: input.status as Application["status"],
        })
        .where(
          and(
            eq(applications.id, input.id),
            eq(applications.userId, ctx.session.user.id),
          ),
        );

      return {
        success: true,
      };
    }),
});
