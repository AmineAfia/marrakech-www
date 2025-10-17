"use client"

import { useState, useEffect } from "react"
import { ChartWrapper, FilledAreaChart } from "@/components/charts"
import { type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  input_tokens: {
    label: "Input Tokens",
    color: "hsl(199, 89%, 48%)", // blue
  },
  output_tokens: {
    label: "Output Tokens",
    color: "hsl(142, 76%, 36%)", // green
  },
} satisfies ChartConfig

interface TotalTokenUsageChartProps {
  timeRange: TimeRange
}

export function TotalTokenUsageChart({ timeRange }: TotalTokenUsageChartProps) {
  const [chartData, setChartData] = useState<Array<{ time: string; input_tokens: number; output_tokens: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/total-token-usage?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Pass raw API data to chart component - let component handle time processing
        const transformedData = result.data?.map((item: { 
          minute: string; 
          input_tokens: number; 
          output_tokens: number 
        }) => {
          return {
            minute: item.minute, // Pass raw minute timestamp
            input_tokens: item.input_tokens,
            output_tokens: item.output_tokens
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
      title="Total Token Usage Over Time"
      description="Input and output tokens over time"
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
