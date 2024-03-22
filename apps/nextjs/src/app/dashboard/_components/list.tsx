"use client";

import type { Status } from "node_modules/@appli/db/src/schema/application";
import { ReactNode, useEffect, useMemo, useState } from "react";
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

import { Input, Label, ToggleGroup, ToggleGroupItem } from "@appli/ui";
import { cn } from "@appli/ui/lib/utils";

import type { ApplicationCardProps } from "./card";
import { filtersAtom } from "~/app/atoms";
import { ApplicationsSection } from "./section";

interface ListProps {
  name: string;
  applications: Record<Status, ApplicationCardProps[]>;
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
  const [applications, setApplications] = useState(defaultApplications);

  const [filters, setFilters] = useAtom(filtersAtom);

  useEffect(() => {
    const filteredApplications = Object.entries(defaultApplications).reduce(
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
      {} as Record<Status, ApplicationCardProps[]>,
    );

    setApplications(filteredApplications);
  }, [defaultApplications, filters]);

  const statuses = useMemo(
    () => Object.keys(applications) as Status[],
    [applications],
  );

  return (
    <div>
      <div className="container fixed left-0 top-[72px] z-10 w-screen border-b border-border bg-white pb-5">
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
          className="flex flex-wrap justify-start gap-3"
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
              defaultValue={filters.statuses}
              className={cn(
                status === "REJECTED" &&
                  "border-red-200 bg-red-100 text-red-500 data-[state=on]:border-red-100 data-[state=on]:bg-red-500 data-[state=on]:text-red-100",
              )}
            >
              {icons[status]}
              {status.toLowerCase()} {applications[status].length}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      {Object.entries(applications)
        .filter(
          ([status, applications]) =>
            applications.length > 0 &&
            filters.statuses.includes(status as Status),
        )
        .map(([status, applications]) => (
          <ApplicationsSection
            key={status}
            status={status as Status}
            applications={applications}
          />
        ))}
    </div>
  );
};
