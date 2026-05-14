import type { TryoutListItem } from "../../types";
import TryoutCard from "./TryoutCard";

type TryoutCardsGridProps = {
  items: TryoutListItem[];
};

export default function TryoutCardsGrid({ items }: TryoutCardsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <TryoutCard key={item.id} item={item} />
      ))}
    </div>
  );
}
