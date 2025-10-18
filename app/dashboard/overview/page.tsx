"use client"

import { useSearchParams } from "next/navigation"
import { ExecutiveKPICards } from "../executive-kpi-cards"
import { RequestsChart } from "../requests-chart"
import { ActiveSessionsChart } from "../active-sessions-chart"
import { ErrorRateTrendChart } from "../error-rate-trend-chart"
import { CostAnalysisChart } from "../cost-analysis-chart"
import type { TimeRange } from "../time-range-picker"

export default function OverviewPage() {
  const searchParams = useSearchParams()
  const timeRange = (searchParams.get("timeRange") as TimeRange) || "1h"

  return (
    <div className="space-y-6">
      {/* Executive Summary KPIs */}
      <ExecutiveKPICards timeRange={timeRange} />
      
      {/* Key Performance Metrics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Key Performance Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RequestsChart timeRange={timeRange} />
          <ActiveSessionsChart timeRange={timeRange} />
        </div>
      </div>

      {/* System Health */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">System Health</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorRateTrendChart timeRange={timeRange} />
          <CostAnalysisChart timeRange={timeRange} />
        </div>
      </div>
    </div>
  )
}
