import { TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TryoutStatsTrendBadgeProps = {
  label: string;
  className?: string;
};

export default function TryoutStatsTrendBadge({
  label,
  className,
}: TryoutStatsTrendBadgeProps) {
  return (
    <Badge
      variant="success"
      className={cn(
        "h-8 gap-1.5 rounded-full border-0 px-2.5 py-1 text-c1 font-semibold shadow-none",
        className,
      )}
    >
      <TrendingUp className="size-3.5 shrink-0" aria-hidden />
      <span>{label}</span>
    </Badge>
  );
}
