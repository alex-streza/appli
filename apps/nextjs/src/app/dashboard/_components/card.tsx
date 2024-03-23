import type { Status } from "node_modules/@appli/db/src/schema/application";
import { Calendar, Code, Coin, Link } from "@phosphor-icons/react/dist/ssr";
import { statusEnum } from "node_modules/@appli/db/src/schema/application";
import spacetime from "spacetime";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@appli/ui";

import { api } from "~/trpc/react";

const statuses = statusEnum.enumValues;

export interface ApplicationCardProps {
  id: number;
  company: string;
  companyURL: string;
  title: string;
  technologies: string[] | null;
  savedAt: Date;
  location: string | null;
  salary: string | null;
  appliedAt: Date | null;
  url: string;
  status: Status;
}

export const ApplicationCard = ({
  id,
  company,
  companyURL,
  title,
  appliedAt,
  technologies,
  status,
  savedAt,
  location,
  salary,
  url,
}: ApplicationCardProps) => {
  const updateApplicationStatus =
    api.application.updateApplicationStatus.useMutation({
      onSuccess: async () => {
        await refetch();
      },
    });

  const { refetch } = api.application.getApplications.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <img
            src={`https://www.google.com/s2/favicons?domain=${companyURL}&sz=256`}
            alt="Morrow"
            className="h-12 w-12 rounded-full border border-border"
          />
          <div className="flex flex-col gap-0">
            <span className="font-bold">{title}</span>
            <span className="font-medium text-muted-foreground/80">
              {company}
            </span>
          </div>
        </CardTitle>
        <Button variant="ghost" className="absolute right-3 top-3" size="icon">
          <Link size={20} />
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="text-mutmuted-foregrounded flex flex-col gap-2 text-sm font-semibold">
          <li className="flex items-center gap-2">
            <Code size={20} />
            {technologies.join(", ")}
          </li>
          <li className="flex items-center gap-2">
            <Calendar size={20} />
            saved {spacetime().since(savedAt).rounded} from Otta
          </li>
          <li className="flex items-center gap-2">
            <Coin size={20} />
            {salary ?? "Not specified"}
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <div className="mr-5 flex gap-3">
          <Button size="sm">Apply</Button>
          <Button variant="secondary" size="sm">
            View
          </Button>
        </div>
        <Select
          defaultValue={status}
          onValueChange={(value) => {
            updateApplicationStatus.mutate({
              id,
              status: value as Status,
            });
          }}
        >
          <SelectTrigger className="w-[120px] lowercase">
            <SelectValue placeholder="status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status} className="lowercase">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  );
};
