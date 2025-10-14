"use client"

import { useState } from "react"
import { RequestsChart } from "./requests-chart"
import { ToolCallsPromptChart } from "./tool-calls-prompt-chart"
import { ToolCallsStatusChart } from "./tool-calls-status-chart"
import { TokenUsageChart } from "./token-usage-chart"
import { TimeRangePicker, type TimeRange } from "./time-range-picker"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1h")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Analytics and insights for your AI prompts</p>
        </div>
        <TimeRangePicker value={timeRange} onValueChange={setTimeRange} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RequestsChart timeRange={timeRange} />
        <ToolCallsPromptChart timeRange={timeRange} />
        <ToolCallsStatusChart timeRange={timeRange} />
        <TokenUsageChart timeRange={timeRange} />
      </div>
    </div>
  )
}
