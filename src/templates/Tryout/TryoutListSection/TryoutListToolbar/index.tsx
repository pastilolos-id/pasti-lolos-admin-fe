import type { TryoutInstitutionFilter } from "../../types";
import TryoutCreateButton from "./TryoutCreateButton";
import TryoutInstansiFilter from "./TryoutInstansiFilter";
import TryoutSearchField from "./TryoutSearchField";

type TryoutListToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  institution: TryoutInstitutionFilter;
  onInstitutionChange: (value: TryoutInstitutionFilter) => void;
};

export default function TryoutListToolbar({
  search,
  onSearchChange,
  institution,
  onInstitutionChange,
}: TryoutListToolbarProps) {
  return (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
      <h2 className="shrink-0 text-h4 text-neutral-6">Daftar Tryout</h2>

      <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <TryoutSearchField
          value={search}
          onChange={onSearchChange}
          className="min-w-0 flex-1 lg:max-w-xl xl:max-w-2xl"
        />

        <div className="flex w-full min-w-0 flex-row items-stretch gap-2 sm:w-auto sm:items-center sm:shrink-0 lg:ml-auto">
          <div className="min-w-0 flex-1 sm:flex-initial">
            <TryoutInstansiFilter
              value={institution}
              onChange={onInstitutionChange}
            />
          </div>
          <TryoutCreateButton />
        </div>
      </div>
    </div>
  );
}
