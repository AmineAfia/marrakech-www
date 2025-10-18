"use client"

import { useSearchParams } from "next/navigation"
import { CostAnalysisChart } from "../cost-analysis-chart"
import { CostPerTokenChart } from "../cost-per-token-chart"
import { TotalTokenUsageChart } from "../total-token-usage-chart"
import { TokenEfficiencyChart } from "../token-efficiency-chart"
import type { TimeRange } from "../time-range-picker"

export default function CostPage() {
  const searchParams = useSearchParams()
  const timeRange = (searchParams.get("timeRange") as TimeRange) || "1h"

  return (
    <div className="space-y-6">
      {/* Cost Analysis */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Cost Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CostAnalysisChart timeRange={timeRange} />
          <CostPerTokenChart timeRange={timeRange} />
        </div>
      </div>

      {/* Token Usage & Efficiency */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Token Usage & Efficiency</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TotalTokenUsageChart timeRange={timeRange} />
          <TokenEfficiencyChart timeRange={timeRange} />
        </div>
      </div>
    </div>
  )
}
