import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-card-medium border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-4 text-neutral-1 hover:bg-primary-5",
        secondary:
          "border-transparent bg-neutral-3 text-neutral-6 hover:bg-neutral-3/80",
        destructive:
          "border-transparent bg-destructive text-white hover:bg-destructive/90",
        outline: "text-neutral-6 border-card-border bg-white",
        success: "border-transparent bg-green text-white",
        warning: "border-transparent bg-yellow text-neutral-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
