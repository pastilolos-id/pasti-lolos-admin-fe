import { formatIdr } from "@/lib/utils";

import type { TryoutListItem } from "../../../../types";

type TryoutCardPricingProps = {
  item: TryoutListItem;
};

export default function TryoutCardPricing({ item }: TryoutCardPricingProps) {
  const hasSpecial =
    typeof item.specialPrice === "number" &&
    typeof item.originalPrice === "number";

  return (
    <div className="space-y-1">
      <p className="text-b2 font-medium text-neutral-5">
        {hasSpecial ? "Harga Spesial" : "Harga"}
      </p>
      <p
        className={
          hasSpecial
            ? "text-h4 font-bold text-red"
            : "text-h4 font-bold text-neutral-6"
        }
      >
        {formatIdr(hasSpecial ? (item.specialPrice ?? 0) : item.price)}
      </p>
      {hasSpecial ? (
        <p className="text-b2 font-medium text-neutral-5 line-through">
          {formatIdr(item.originalPrice ?? 0)}
        </p>
      ) : null}
    </div>
  );
}
