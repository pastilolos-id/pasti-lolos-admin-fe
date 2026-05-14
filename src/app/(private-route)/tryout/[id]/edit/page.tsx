import { notFound } from "next/navigation";

import TryoutForm from "@/templates/Tryout/TryoutForm";
import { getTryoutFormDetailById } from "@/templates/Tryout/TryoutForm/tryoutFormMock";

type TryoutEditRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function TryoutEditRoute({
  params,
}: TryoutEditRouteProps) {
  const { id } = await params;
  const initialData = getTryoutFormDetailById(decodeURIComponent(id));

  if (!initialData) {
    notFound();
  }

  return <TryoutForm key={id} mode="edit" initialData={initialData} />;
}
