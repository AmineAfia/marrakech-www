"use client"

import { useState, useEffect } from "react"
import { ChartWrapper, LineChart } from "@/components/charts"
import { type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  avg_tools_per_execution: {
    label: "Avg Tools Per Execution",
    color: "hsl(262, 83%, 58%)", // purple
  },
} satisfies ChartConfig

interface AvgToolsPerExecutionChartProps {
  timeRange: TimeRange
}

export function AvgToolsPerExecutionChart({ timeRange }: AvgToolsPerExecutionChartProps) {
  const [chartData, setChartData] = useState<Array<{ time: string; avg_tools_per_execution: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/avg-tools-per-execution?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Pass raw API data to chart component - let component handle time processing
        const transformedData = result.data?.map((item: { 
          minute: string; 
          avg_tools_per_execution: number 
        }) => {
          return {
            minute: item.minute, // Pass raw minute timestamp
            avg_tools_per_execution: item.avg_tools_per_execution
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
      title="Average Tools Per Execution"
      description="Tool density trend over time"
      loading={loading}
      error={error}
    >
      <LineChart
        data={chartData}
        config={chartConfig}
        timeRange={timeRange}
        yAxisFormatter={(value) => value.toFixed(2)}
      />
    </ChartWrapper>
  )
}
