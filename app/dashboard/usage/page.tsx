"use client"

import { useSearchParams } from "next/navigation"
import { TopUsersChart } from "../top-users-chart"
import { ActiveSessionsChart } from "../active-sessions-chart"
import { ExecutionsByRegionChart } from "../executions-by-region-chart"
import { RequestsChart } from "../requests-chart"
import type { TimeRange } from "../time-range-picker"

export default function UsagePage() {
  const searchParams = useSearchParams()
  const timeRange = (searchParams.get("timeRange") as TimeRange) || "1h"

  return (
    <div className="space-y-6">
      {/* User Activity */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">User Activity</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopUsersChart timeRange={timeRange} />
          <ActiveSessionsChart timeRange={timeRange} />
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Geographic Distribution</h2>
        <div className="grid grid-cols-1 gap-6">
          <ExecutionsByRegionChart timeRange={timeRange} />
        </div>
      </div>

      {/* Usage Trends */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage Trends</h2>
        <div className="grid grid-cols-1 gap-6">
          <RequestsChart timeRange={timeRange} />
        </div>
      </div>
    </div>
  )
}
