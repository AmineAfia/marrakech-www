"use client"

import { useState, useEffect } from "react"
import { ChartWrapper, LineChart } from "@/components/charts"
import { type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  efficiency_ratio: {
    label: "Efficiency Ratio",
    color: "hsl(199, 89%, 48%)", // blue
  },
} satisfies ChartConfig

interface TokenEfficiencyChartProps {
  timeRange: TimeRange
}

export function TokenEfficiencyChart({ timeRange }: TokenEfficiencyChartProps) {
  const [chartData, setChartData] = useState<Array<{ time: string; efficiency_ratio: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/token-efficiency-ratio?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Pass raw API data to chart component - let component handle time processing
        const transformedData = result.data?.map((item: { 
          minute: string; 
          efficiency_ratio: number 
        }) => {
          return {
            minute: item.minute, // Pass raw minute timestamp
            efficiency_ratio: item.efficiency_ratio
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
      title="Token Efficiency Ratio"
      description="Output tokens / Input tokens ratio over time"
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
