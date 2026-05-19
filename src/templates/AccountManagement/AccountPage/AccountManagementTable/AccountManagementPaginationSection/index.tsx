import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type AccountManagementPaginationSectionProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PageToken =
  | { kind: "page"; value: number }
  | { kind: "ellipsis"; id: string };

function buildPages(current: number, total: number): PageToken[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => ({
      kind: "page" as const,
      value: i + 1,
    }));
  }
  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) {
      pages.add(p);
    }
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out: PageToken[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    const prev = sorted[i - 1];
    if (i > 0 && prev !== undefined && p - prev > 1) {
      out.push({ kind: "ellipsis", id: `between-${prev}-${p}` });
    }
    out.push({ kind: "page", value: p });
  }
  return out;
}

const circlePage =
  "size-11 min-h-11 min-w-11 max-w-11 gap-0 rounded-full border-0 p-0 text-sm font-bold shadow-none";

const textNav =
  "h-9 min-w-0 rounded-full border-0 bg-transparent px-2 text-sm font-semibold text-neutral-6 shadow-none hover:bg-[#F6F6F6] disabled:pointer-events-none disabled:opacity-40";

export default function AccountManagementPaginationSection({
  page,
  totalPages,
  onPageChange,
}: AccountManagementPaginationSectionProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(1, page), safeTotalPages);
  const pages = buildPages(safePage, safeTotalPages);

  return (
    <Pagination className="mx-auto w-auto justify-center">
      <PaginationContent className="flex-wrap items-center justify-center gap-2">
        <PaginationItem>
          <PaginationLink
            type="button"
            aria-label="Previous page"
            className={textNav}
            disabled={safePage <= 1}
            onClick={() => onPageChange(safePage - 1)}
          >
            Previous
          </PaginationLink>
        </PaginationItem>
        {pages.map((token) =>
          token.kind === "ellipsis" ? (
            <PaginationItem key={token.id}>
              <PaginationEllipsis className="size-11 text-neutral-5" />
            </PaginationItem>
          ) : (
            <PaginationItem key={token.value}>
              <PaginationLink
                type="button"
                isActive={token.value === safePage}
                className={cn(
                  circlePage,
                  token.value === safePage
                    ? "bg-linear-to-br from-primary-5 to-primary-4 text-white hover:from-primary-5 hover:to-primary-4"
                    : "bg-[#F6F6F6] text-neutral-6 hover:bg-[#EEEEEE]",
                )}
                onClick={() => onPageChange(token.value)}
              >
                {token.value}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationLink
            type="button"
            aria-label="Next page"
            className={textNav}
            disabled={safePage >= safeTotalPages}
            onClick={() => onPageChange(safePage + 1)}
          >
            Next
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
