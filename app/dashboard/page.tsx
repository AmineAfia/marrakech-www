"use client"

import { useState } from "react"
import { RequestsChart } from "./requests-chart"
import { ToolCallsPromptChart } from "./tool-calls-prompt-chart"
import { ToolCallsStatusChart } from "./tool-calls-status-chart"
import { TokenUsageChart } from "./token-usage-chart"
import { PromptSuccessRateChart } from "./prompt-success-rate-chart"
import { AvgExecutionTimeChart } from "./avg-execution-time-chart"
import { CostAnalysisChart } from "./cost-analysis-chart"
import { TokenEfficiencyChart } from "./token-efficiency-chart"
import { TotalTokenUsageChart } from "./total-token-usage-chart"
import { CostPerTokenChart } from "./cost-per-token-chart"
import { MostUsedToolsChart } from "./most-used-tools-chart"
import { ToolCallSuccessRateChart } from "./tool-call-success-rate-chart"
import { AvgToolsPerExecutionChart } from "./avg-tools-per-execution-chart"
import { VersionComparisonChart } from "./version-comparison-chart"
import { VersionTimelineChart } from "./version-timeline-chart"
import { ActiveSessionsChart } from "./active-sessions-chart"
import { TopUsersChart } from "./top-users-chart"
import { ErrorRateTrendChart } from "./error-rate-trend-chart"
import { ErrorDistributionChart } from "./error-distribution-chart"
import { ExecutionsByRegionChart } from "./executions-by-region-chart"
import { ExecutiveKPICards } from "./executive-kpi-cards"
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
      
      {/* Executive Summary KPIs */}
      <ExecutiveKPICards timeRange={timeRange} />
      
      {/* Performance & Quality Metrics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Performance & Quality</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <PromptSuccessRateChart timeRange={timeRange} />
          <AvgExecutionTimeChart timeRange={timeRange} />
          <CostAnalysisChart timeRange={timeRange} />
        </div>
      </div>

      {/* Token Economics & Efficiency */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Token Economics & Efficiency</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <TokenEfficiencyChart timeRange={timeRange} />
          <TotalTokenUsageChart timeRange={timeRange} />
          <CostPerTokenChart timeRange={timeRange} />
        </div>
      </div>

      {/* Tool Usage Intelligence */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tool Usage Intelligence</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MostUsedToolsChart timeRange={timeRange} />
          <ToolCallSuccessRateChart timeRange={timeRange} />
          <AvgToolsPerExecutionChart timeRange={timeRange} />
        </div>
      </div>

      {/* Prompt Version Comparison */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Prompt Version Comparison</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VersionComparisonChart timeRange={timeRange} />
          <VersionTimelineChart timeRange={timeRange} />
        </div>
      </div>

      {/* User & Session Analytics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">User & Session Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveSessionsChart timeRange={timeRange} />
          <TopUsersChart timeRange={timeRange} />
        </div>
      </div>

      {/* Error Analysis */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Error Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorRateTrendChart timeRange={timeRange} />
          <ErrorDistributionChart timeRange={timeRange} />
        </div>
      </div>

      {/* Regional & Infrastructure */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Regional & Infrastructure</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExecutionsByRegionChart timeRange={timeRange} />
        </div>
      </div>

      {/* Original Charts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Execution Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RequestsChart timeRange={timeRange} />
          <ToolCallsPromptChart timeRange={timeRange} />
          <ToolCallsStatusChart timeRange={timeRange} />
          <TokenUsageChart timeRange={timeRange} />
        </div>
      </div>
    </div>
  )
}
