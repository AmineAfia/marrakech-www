"use client"

import { useState, useEffect } from "react"
import { StackedBarChart, ChartWrapper } from "@/components/charts"
import { type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  success: {
    label: "Success",
    color: "hsl(142, 76%, 36%)", // Datadog green
  },
  failed: {
    label: "Failed",
    color: "hsl(0, 84%, 60%)", // Datadog red
  },
  timeout: {
    label: "Timeout",
    color: "hsl(25, 95%, 53%)", // Datadog orange
  },
  rateLimited: {
    label: "Rate Limited",
    color: "hsl(262, 83%, 58%)", // Datadog purple
  },
  error: {
    label: "Error",
    color: "hsl(0, 0%, 45%)", // Datadog gray
  },
} satisfies ChartConfig

interface ToolCallsStatusChartProps {
  timeRange: TimeRange
}

export function ToolCallsStatusChart({ timeRange }: ToolCallsStatusChartProps) {
  const [chartData, setChartData] = useState<Array<Record<string, string | number>>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dynamicChartConfig, setDynamicChartConfig] = useState(chartConfig)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/tool-calls-by-status?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Pass raw API data to chart component - let component handle time processing
        const transformedData: Array<Record<string, string | number>> = []
        
        for (const item of result.data || []) {
          transformedData.push({
            minute: item.minute, // Pass raw minute timestamp
            [item.status.toLowerCase()]: item.tool_call_count
          })
        }
        
        setChartData(transformedData)
        
        // Update chart config with dynamic statuses
        const statuses = [...new Set(result.data?.map((item: { status: string }) => item.status.toLowerCase()) || [])]
        const newConfig: ChartConfig = {}
        
        statuses.forEach((status, index) => {
          const colors = [
            "hsl(142, 76%, 36%)", // green
            "hsl(0, 84%, 60%)",   // red
            "hsl(25, 95%, 53%)",  // orange
            "hsl(262, 83%, 58%)", // purple
            "hsl(0, 0%, 45%)"     // gray
          ]
          
          newConfig[status] = {
            label: status.charAt(0).toUpperCase() + status.slice(1),
            color: colors[index % colors.length]
          }
        })
        
        setDynamicChartConfig(newConfig)
        
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
      title="Tool Calls by Status"
      description="Time-series distribution of tool call execution statuses"
      loading={loading}
      error={error}
    >
      <StackedBarChart
        data={chartData}
        config={dynamicChartConfig}
        timeRange={timeRange}
        yAxisFormatter={(value) => value.toLocaleString()}
      />
    </ChartWrapper>
  )
}
