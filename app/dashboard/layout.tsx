"use client"

import { useState, useEffect } from "react"
import { useSearchParams, usePathname } from "next/navigation"
import { TimeRangePicker, type TimeRange } from "./time-range-picker"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [timeRange, setTimeRange] = useState<TimeRange>("1h")

  // Sync time range with URL params
  useEffect(() => {
    const urlTimeRange = searchParams.get("timeRange") as TimeRange
    if (urlTimeRange && ["1h", "24h", "7d", "30d"].includes(urlTimeRange)) {
      setTimeRange(urlTimeRange)
    }
  }, [searchParams])

  const handleTimeRangeChange = (newTimeRange: TimeRange) => {
    setTimeRange(newTimeRange)
    // Update URL without page reload
    const url = new URL(window.location.href)
    url.searchParams.set("timeRange", newTimeRange)
    window.history.replaceState({}, "", url.toString())
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Analytics and insights for your AI prompts</p>
        </div>
        <TimeRangePicker value={timeRange} onValueChange={handleTimeRangeChange} />
      </div>
      {children}
    </div>
  )
}
