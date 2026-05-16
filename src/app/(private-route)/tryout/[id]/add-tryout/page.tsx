import { notFound } from "next/navigation";

import TryoutForm from "@/templates/Tryout/TryoutForm";

type TryoutAddChildRouteProps = {
  params: Promise<{ id: string }>;
};

function parseNumericPackageId(rawId: string): string | null {
  const trimmed = decodeURIComponent(rawId).trim();
  if (!/^\d+$/.test(trimmed)) return null;
  return trimmed;
}

export default async function TryoutAddChildRoute({
  params,
}: TryoutAddChildRouteProps) {
  const { id } = await params;
  const packageId = parseNumericPackageId(id);

  if (!packageId) {
    notFound();
  }

  return <TryoutForm mode="create-child" packageId={packageId} />;
}
