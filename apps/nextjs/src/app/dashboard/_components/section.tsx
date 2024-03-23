"use client";

import type { Status } from "node_modules/@appli/db/src/schema/application";
import { CaretDown } from "@phosphor-icons/react";
import { useAtom } from "jotai";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@appli/ui";
import { cn } from "@appli/ui/lib/utils";

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

  const isOpen = filters.statuses.includes(status);

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={(isOpen) =>
          setFilters((prev) => ({
            ...prev,
            statuses: isOpen
              ? [...prev.statuses, status]
              : prev.statuses.filter((s) => s !== status),
          }))
        }
      >
        <CollapsibleTrigger>
          <div className="w-full pb-5 md:w-fit">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-4">
              <h2 className="font-semibold capitalize">
                {status.toLowerCase()} ({applications.length})
              </h2>
              <CaretDown
                weight="bold"
                className={cn(
                  "transition-transform",
                  isOpen ? "rotate-180" : "",
                )}
              />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-4 pb-10">
            {applications.map((application) => (
              <ApplicationCard key={application.id} {...application} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
