import QuestionsSectionEditButton from "./QuestionsSectionEditButton";

type QuestionsSectionHeaderProps = {
  currentOrder: number;
  totalQuestions: number;
  onEdit: () => void;
};

export default function QuestionsSectionHeader({
  currentOrder,
  totalQuestions,
  onEdit,
}: QuestionsSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-h4 font-semibold text-neutral-6">
        Soal Ke-{currentOrder} dari {totalQuestions} soal
      </p>
      <QuestionsSectionEditButton onClick={onEdit} />
    </div>
  );
}
