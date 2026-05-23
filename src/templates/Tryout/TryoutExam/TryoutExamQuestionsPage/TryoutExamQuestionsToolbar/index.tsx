import TryoutExamQuestionsBackButton from "./TryoutExamQuestionsBackButton";
import TryoutExamQuestionsBulkLinkButton from "./TryoutExamQuestionsBulkLinkButton";

type TryoutExamQuestionsToolbarProps = {
  backHref: string;
  addQuestionsHref: string;
};

export default function TryoutExamQuestionsToolbar({
  backHref,
  addQuestionsHref,
}: TryoutExamQuestionsToolbarProps) {
  return (
    <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
      <TryoutExamQuestionsBackButton href={backHref} />
      <TryoutExamQuestionsBulkLinkButton href={addQuestionsHref} />
    </div>
  );
}
