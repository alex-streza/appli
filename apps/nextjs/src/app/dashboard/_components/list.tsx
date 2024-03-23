"use client";

import type {
  Application,
  Status,
} from "node_modules/@appli/db/src/schema/application";
import { ReactNode, useEffect, useMemo } from "react";
import {
  ClockClockwise,
  FilePlus,
  Files,
  Ghost,
  MagnifyingGlass,
  Money,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { useAtom } from "jotai";

import { RouterOutputs } from "@appli/api";
import { Input, Label, ToggleGroup, ToggleGroupItem } from "@appli/ui";
import { cn } from "@appli/ui/lib/utils";

import { filtersAtom } from "~/app/atoms";
import { api } from "~/trpc/react";
import { ApplicationsSection } from "./section";

type ApplicationsGroup =
  RouterOutputs["application"]["getApplications"]["applications"];

interface ListProps {
  name: string;
  applications: ApplicationsGroup;
}

const icons: Record<Status, ReactNode> = {
  SAVED: <FilePlus size={20} />,
  APPLIED: <Files size={20} />,
  INTERVIEWING: <ClockClockwise size={20} />,
  GHOSTED: <Ghost size={20} />,
  OFFERED: <Money size={20} />,
  REJECTED: <X size={20} />,
};

export const List = ({
  name,
  applications: defaultApplications,
}: ListProps) => {
  const { data } = api.application.getApplications.useQuery(undefined, {
    initialData: {
      applications: defaultApplications,
    },
  });

  const [filters, setFilters] = useAtom(filtersAtom);

  const applications = useMemo(() => {
    const applications = Object.entries(data.applications).reduce(
      (acc, [status, applications]) => {
        const filteredApplications = applications.filter(
          (application) =>
            application.title
              .toLowerCase()
              .includes(filters.search.toLowerCase()) ||
            application.company
              .toLowerCase()
              .includes(filters.search.toLowerCase()),
        );

        return {
          ...acc,
          [status]: filteredApplications,
        };
      },
      {} as ApplicationsGroup,
    );

    return applications;
  }, [data.applications, filters.search]);

  const statuses = useMemo(
    () => Object.keys(applications) as Status[],
    [applications],
  );

  return (
    <div>
      <div className="container fixed left-0 top-[72px] z-10 w-screen border-b border-border bg-card pb-5">
        <h1 className="text-2xl font-bold">Welcome back, {name}</h1>
        <Label className="mb-3 mt-5 block">Filter job applications</Label>
        <div className="relative max-w-[400px]">
          <Input
            placeholder="Search by job title, company, or location"
            className="mb-3 w-full pr-12"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            value={filters.search}
          />
          <button
            className="absolute right-4 top-3 text-accent-foreground"
            onClick={() => setFilters({ ...filters, search: "" })}
          >
            {filters.search.length > 0 ? (
              <X size={20} />
            ) : (
              <MagnifyingGlass size={20} />
            )}
          </button>
        </div>
        <ToggleGroup
          type="multiple"
          className="flex max-w-full justify-start gap-3 overflow-auto"
          value={filters.statuses}
          onValueChange={(statuses) => {
            setFilters({
              ...filters,
              statuses: statuses as Status[],
            });
          }}
        >
          {statuses.map((status) => (
            <ToggleGroupItem
              key={status}
              value={status}
              disabled={applications[status].length === 0}
              className={cn(
                status === "REJECTED" &&
                  "border-red-200 bg-red-100 text-red-500 data-[state=on]:border-red-100 data-[state=on]:bg-red-500 data-[state=on]:text-red-100 dark:bg-red-900/50 dark:data-[state=on]:bg-red-900",
              )}
            >
              {icons[status]}
              {status.toLowerCase()} {applications[status].length}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="mt-72">
        {Object.entries(applications)
          .filter(([status, applications]) => applications.length > 0)
          .map(([status, applications]) => (
            <ApplicationsSection
              key={status}
              status={status as Status}
              applications={applications}
            />
          ))}
      </div>
    </div>
  );
};
