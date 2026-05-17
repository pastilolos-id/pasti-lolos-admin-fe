import { notFound } from "next/navigation";

import TryoutForm from "@/templates/Tryout/TryoutForm";

type TryoutAddChildRouteProps = {
  params: Promise<{ packageId: string }>;
};

function parseNumericPackageId(rawPackageId: string): string | null {
  const trimmed = decodeURIComponent(rawPackageId).trim();
  if (!/^\d+$/.test(trimmed)) return null;
  return trimmed;
}

export default async function TryoutAddChildRoute({
  params,
}: TryoutAddChildRouteProps) {
  const { packageId: rawPackageId } = await params;
  const packageId = parseNumericPackageId(rawPackageId);

  if (!packageId) {
    notFound();
  }

  return <TryoutForm mode="create-child" packageId={packageId} />;
}
