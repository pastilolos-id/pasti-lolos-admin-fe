type TryoutQuestionFieldGroupTitleProps = {
  questionNumber: number;
};

export default function TryoutQuestionFieldGroupTitle({
  questionNumber,
}: TryoutQuestionFieldGroupTitleProps) {
  return (
    <h3 className="text-h4 font-semibold text-neutral-6">
      Pertanyaan ke-{questionNumber}
    </h3>
  );
}
