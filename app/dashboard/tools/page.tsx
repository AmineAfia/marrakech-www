"use client"

import { useSearchParams } from "next/navigation"
import { ToolCallsByNameChart } from "../tool-calls-by-name-chart"
import { ToolCallsStatusChart } from "../tool-calls-status-chart"
import { ToolCallsPromptChart } from "../tool-calls-prompt-chart"
import { ToolCallSuccessRateChart } from "../tool-call-success-rate-chart"
import { AvgToolsPerExecutionChart } from "../avg-tools-per-execution-chart"
import { ErrorDistributionChart } from "../error-distribution-chart"
import type { TimeRange } from "../time-range-picker"

export default function ToolsPage() {
  const searchParams = useSearchParams()
  const timeRange = (searchParams.get("timeRange") as TimeRange) || "1h"

  return (
    <div className="space-y-6">
      {/* Tool Usage Analytics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tool Usage Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <ToolCallsByNameChart timeRange={timeRange} />
          <ToolCallsStatusChart timeRange={timeRange} />
          <ToolCallsPromptChart timeRange={timeRange} />
        </div>
      </div>

      {/* Tool Performance */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tool Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ToolCallSuccessRateChart timeRange={timeRange} />
          <AvgToolsPerExecutionChart timeRange={timeRange} />
        </div>
      </div>

      {/* Error Analysis */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Error Analysis</h2>
        <div className="grid grid-cols-1 gap-6">
          <ErrorDistributionChart timeRange={timeRange} />
        </div>
      </div>
    </div>
  )
}
