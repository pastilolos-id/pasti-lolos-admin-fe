import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { type ButtonProps, buttonVariants } from "./button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    aria-label="pagination"
    data-slot="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-slot="pagination-content"
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-slot="pagination-item"
    className={cn("", className)}
    {...props}
  />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">;

const PaginationLink = ({
  className,
  isActive,
  size = "sm",
  ...props
}: PaginationLinkProps) => (
  <button
    type="button"
    aria-current={isActive ? "page" : undefined}
    data-slot="pagination-link"
    data-active={isActive}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "secondary",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Halaman sebelumnya"
    size="sm"
    className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="size-4" />
    <span className="hidden sm:inline">Sebelumnya</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Halaman berikutnya"
    size="sm"
    className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
    {...props}
  >
    <span className="hidden sm:inline">Berikutnya</span>
    <ChevronRight className="size-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    data-slot="pagination-ellipsis"
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">Halaman lainnya</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
