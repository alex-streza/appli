import type { Status } from "node_modules/@appli/db/src/schema/application";
import { atom } from "jotai";

export const filtersAtom = atom<{
  search: string;
  statuses: Status[];
  sortBy: Record<Status, "date" | "salary" | "experience">;
  descending: Record<Status, boolean>;
}>({
  search: "",
  statuses: ["SAVED"],
  sortBy: {
    SAVED: "date",
    APPLIED: "date",
    INTERVIEWING: "date",
    GHOSTED: "date",
    OFFERED: "date",
    REJECTED: "date",
  },
  descending: {
    SAVED: true,
    APPLIED: true,
    INTERVIEWING: true,
    GHOSTED: true,
    OFFERED: true,
    REJECTED: true,
  },
});
