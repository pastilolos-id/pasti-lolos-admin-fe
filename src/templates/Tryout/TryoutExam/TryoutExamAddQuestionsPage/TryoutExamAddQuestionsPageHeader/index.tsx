import TryoutExamAddQuestionsBackButton from "./TryoutExamAddQuestionsBackButton";

type TryoutExamAddQuestionsPageHeaderProps = {
  backHref: string;
  examName: string;
};

export default function TryoutExamAddQuestionsPageHeader({
  backHref,
  examName,
}: TryoutExamAddQuestionsPageHeaderProps) {
  return (
    <div className="space-y-4">
      <TryoutExamAddQuestionsBackButton href={backHref} />
      <div>
        <h1 className="text-h3 font-semibold text-neutral-6">
          Tambah Banyak Soal
        </h1>
        <p className="mt-1 text-b2 text-neutral-5">{examName}</p>
      </div>
    </div>
  );
}
