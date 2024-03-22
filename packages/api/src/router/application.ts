import { eq, schema } from "@appli/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const applications = schema.applications;
type Application = typeof applications.$inferSelect;

export const applicationRouter = createTRPCRouter({
  getApplications: protectedProcedure.mutation(async ({ ctx }) => {
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
});
