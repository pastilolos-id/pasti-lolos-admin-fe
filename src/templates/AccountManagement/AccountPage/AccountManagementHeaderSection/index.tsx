type AccountManagementHeaderSectionProps = {
  title: string;
};

export default function AccountManagementHeaderSection({
  title,
}: AccountManagementHeaderSectionProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-h4 text-neutral-6">{title}</h1>
    </header>
  );
}
