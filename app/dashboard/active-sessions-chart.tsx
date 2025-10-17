"use client"

import { useState, useEffect } from "react"
import { ChartWrapper, FilledAreaChart } from "@/components/charts"
import { type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  active_sessions: {
    label: "Active Sessions",
    color: "hsl(199, 89%, 48%)", // blue
  },
} satisfies ChartConfig

interface ActiveSessionsChartProps {
  timeRange: TimeRange
}

export function ActiveSessionsChart({ timeRange }: ActiveSessionsChartProps) {
  const [chartData, setChartData] = useState<Array<{ time: string; active_sessions: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/active-sessions-over-time?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Pass raw API data to chart component - let component handle time processing
        const transformedData = result.data?.map((item: { 
          minute: string; 
          active_sessions: number 
        }) => {
          return {
            minute: item.minute, // Pass raw minute timestamp
            active_sessions: item.active_sessions
          }
        }) || []
        
        setChartData(transformedData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  return (
    <ChartWrapper
      title="Active Sessions Over Time"
      description="Number of unique sessions over time"
      loading={loading}
      error={error}
    >
      <FilledAreaChart
        data={chartData}
        config={chartConfig}
        timeRange={timeRange}
        yAxisFormatter={(value) => value.toLocaleString()}
      />
    </ChartWrapper>
  )
}
