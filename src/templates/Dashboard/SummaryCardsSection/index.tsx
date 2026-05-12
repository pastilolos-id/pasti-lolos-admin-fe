import { summaryCardsData } from "./data";
import SummaryCard from "./SummaryCard";

export default function SummaryCardsSection() {
  return (
    <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {summaryCardsData.map((card) => (
        <SummaryCard key={card.label} {...card} />
      ))}
    </section>
  );
}
