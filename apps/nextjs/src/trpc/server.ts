import { cache } from "react";
import { headers } from "next/headers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { createCaller, createTRPCContext } from "@appli/api";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return createTRPCContext({
    session: user ? { user } : null,
    headers: heads,
  });
});

export const api = createCaller(createContext);
