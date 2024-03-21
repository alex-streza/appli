import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  FilePlus,
  Files,
  MagnifyingGlass,
  Money,
  SortDescending,
} from "@phosphor-icons/react/dist/ssr";

import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@appli/ui";

import { ApplicationCard } from "../_components/application-card";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <main className="container">
      <div className="container fixed left-0 top-[72px] z-10 w-screen bg-white pb-5">
        <h1 className="text-2xl font-bold">Welcome back, {user?.given_name}</h1>
        <Label className="mb-3 mt-5 block">Filter job applications</Label>
        <div className="relative">
          <Input
            placeholder="Search by job title, company, or location"
            className="mb-3 w-full pr-12"
          />
          <MagnifyingGlass
            className="absolute right-4 top-3 text-accent-foreground"
            size={20}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <ToggleGroup type="multiple">
            <ToggleGroupItem value="saved">
              <FilePlus size={20} /> 8 saved
            </ToggleGroupItem>
            <ToggleGroupItem value="applied">
              <Files size={20} /> 3 applied
            </ToggleGroupItem>
            <ToggleGroupItem value="offers" disabled>
              <Money size={20} /> 0 offers
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="mt-72 w-full pb-5 md:w-fit">
        <div className="rounded-lg border border-border bg-white p-4">
          <h2 className="mb-3 font-semibold">Saved jobs (5)</h2>
          <div className="flex items-center gap-3">
            <Label>Sort by</Label>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">saved date</SelectItem>
                <SelectItem value="salary">salary</SelectItem>
                <SelectItem value="experience">experience</SelectItem>
              </SelectContent>
            </Select>
            <Toggle value="saved">
              descending
              <SortDescending size={20} />
            </Toggle>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <ApplicationCard />
      </div>
    </main>
  );
}
