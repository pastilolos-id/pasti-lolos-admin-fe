import type { TryoutInstitutionFilter, TryoutListItem } from "../types";
import TryoutCardsGrid from "./TryoutCardsGrid";
import TryoutListToolbar from "./TryoutListToolbar";

type TryoutListSectionProps = {
  search: string;
  onSearchChange: (value: string) => void;
  institution: TryoutInstitutionFilter;
  onInstitutionChange: (value: TryoutInstitutionFilter) => void;
  items: TryoutListItem[];
};

export default function TryoutListSection({
  search,
  onSearchChange,
  institution,
  onInstitutionChange,
  items,
}: TryoutListSectionProps) {
  const hasRows = items.length > 0;

  return (
    <section className="flex flex-col gap-6">
      <TryoutListToolbar
        search={search}
        onSearchChange={onSearchChange}
        institution={institution}
        onInstitutionChange={onInstitutionChange}
      />
      {hasRows ? (
        <TryoutCardsGrid items={items} />
      ) : (
        <div className="rounded-2xl border border-dashed border-[#EEEEEE] bg-[#FAFAFA] px-4 py-10 text-center">
          <p className="text-b2 font-semibold text-neutral-6">
            Tidak ada tryout yang cocok
          </p>
          <p className="text-c1 mt-2 text-neutral-5">
            Ubah kata kunci atau filter instansi.
          </p>
        </div>
      )}
    </section>
  );
}
