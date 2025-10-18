"use client"

import { useSearchParams } from "next/navigation"
import { PromptSuccessRateChart } from "../prompt-success-rate-chart"
import { VersionComparisonChart } from "../version-comparison-chart"
import { VersionTimelineChart } from "../version-timeline-chart"
import { AvgExecutionTimeChart } from "../avg-execution-time-chart"
import { TokenEfficiencyChart } from "../token-efficiency-chart"
import { MostUsedToolsChart } from "../most-used-tools-chart"
import type { TimeRange } from "../time-range-picker"

export default function PromptsPage() {
  const searchParams = useSearchParams()
  const timeRange = (searchParams.get("timeRange") as TimeRange) || "1h"

  return (
    <div className="space-y-6">
      {/* Prompt Performance */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Prompt Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <PromptSuccessRateChart timeRange={timeRange} />
          <AvgExecutionTimeChart timeRange={timeRange} />
          <TokenEfficiencyChart timeRange={timeRange} />
        </div>
      </div>

      {/* Version Management */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Version Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VersionComparisonChart timeRange={timeRange} />
          <VersionTimelineChart timeRange={timeRange} />
        </div>
      </div>

      {/* Tool Usage by Prompt */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tool Usage by Prompt</h2>
        <div className="grid grid-cols-1 gap-6">
          <MostUsedToolsChart timeRange={timeRange} />
        </div>
      </div>
    </div>
  )
}
