"use client"

import Link from "next/link";
import KPIHeader from "@/app/components/KPIHeader";
import KPIResultsTable from "@/app/components/KPIResultsTable";
import KPIProfitabilityChart from "@/app/components/KPIProfitabilityChart";
import KPIExplanation from "@/app/components/KPIExplanation";
import KPIRevenueBenchmark from "@/app/components/KPIRevenueBenchmark";
import KPIGrowthBenchmarkChart from "@/app/components/KPIGrowthBenchmarkChart";
import KPIBreakEvenChart from "../components/KPIBreakEvenChart";
import ClientsPageTabs from "../components/ClientsPageTabs";
import { Suspense } from "react";
import { useSearchParams } from 'next/navigation'

const TabContent = ({ tab }: { tab: string }) => {
  const name = tab.replace("-", " ");

  if (tab === "analytics") {
    return (
      <>
        <KPIHeader />
        <KPIResultsTable />
        <KPIProfitabilityChart />
        <KPIBreakEvenChart />
        <KPIRevenueBenchmark />
        <KPIGrowthBenchmarkChart />
        <KPIExplanation />
      </>
    );
  }

  return (
    <div className="text-xl text-gray-700 mt-4 font-medium capitalize">
      {name} Page
    </div>
  );
};

export default function ClientsPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';


  return (
    <div className="min-h-[2000px] rounded-lg px-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[40px] font-medium text-[#3C2C63]">Clients</h1>
        <Link
          href={"/dashboard"}
          className="flex items-center gap-2 cursor-pointer text-gray-600 border border-gray-500 font-medium rounded px-3 py-1 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <ClientsPageTabs />

      <Suspense fallback={<div>Loading...</div>}>
        <TabContent tab={currentTab} />
      </Suspense>
    </div>
  );
}
