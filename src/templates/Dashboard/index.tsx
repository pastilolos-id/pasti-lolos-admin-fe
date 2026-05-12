import RevenueChartSection from "./RevenueChartSection";
import SummaryCardsSection from "./SummaryCardsSection";
import TopSaleSection from "./TopSaleSection";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-h4 text-neutral-6">Dashboard</h1>

      <SummaryCardsSection />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RevenueChartSection />
        </div>
        <div className="lg:col-span-2">
          <TopSaleSection />
        </div>
      </div>
    </div>
  );
}
