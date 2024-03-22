import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { api } from "~/trpc/server";
import { List } from "./_components/list";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const { applications } = await api.application.getApplications();

  return (
    <main className="container">
      <List
        name={user?.given_name ?? "job seeker"}
        applications={applications}
      />
    </main>
  );
}
