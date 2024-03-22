"use client";

import type { Status } from "node_modules/@appli/db/src/schema/application";
import { SortDescending } from "@phosphor-icons/react/dist/ssr";
import { useAtom } from "jotai";

import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Toggle,
} from "@appli/ui";

import type { ApplicationCardProps } from "./card";
import { filtersAtom } from "~/app/atoms";
import { ApplicationCard } from "./card";

interface ApplicationsSectionProps {
  applications: ApplicationCardProps[];
  status: Status;
}

export const ApplicationsSection = ({
  applications,
  status,
}: ApplicationsSectionProps) => {
  const [filters, setFilters] = useAtom(filtersAtom);

  return (
    <>
      <div className="mt-72 w-full pb-5 md:w-fit">
        <div className="rounded-lg border border-border bg-white p-4">
          <h2 className="font-semibold capitalize">
            {status.toLowerCase()} ({applications.length})
          </h2>
          {/* <div className="flex items-center gap-3">
            <Label>Sort by</Label>
            <Select
              value={filters.sortBy[status]}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: { ...prev.sortBy, [status]: value },
                }))
              }
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">saved date</SelectItem>
                <SelectItem value="salary">salary</SelectItem>
                <SelectItem value="experience">experience</SelectItem>
              </SelectContent>
            </Select>
            <Toggle
              value="saved"
              checked={filters.descending[status]}
              onChange={(checked) =>
                setFilters((prev) => ({
                  ...prev,
                  descending: {
                    ...prev.descending,
                    [status]: checked,
                  },
                }))
              }
            >
              descending
              <SortDescending size={20} />
            </Toggle>
          </div> */}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 pb-10">
        {applications.map((application) => (
          <ApplicationCard key={application.id} {...application} />
        ))}
      </div>
    </>
  );
};
