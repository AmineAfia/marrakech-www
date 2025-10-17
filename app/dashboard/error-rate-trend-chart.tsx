"use client"

import { useState, useEffect } from "react"
import { ChartWrapper, LineChart } from "@/components/charts"
import { type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  error_rate: {
    label: "Error Rate (%)",
    color: "hsl(0, 84%, 60%)", // red
  },
} satisfies ChartConfig

interface ErrorRateTrendChartProps {
  timeRange: TimeRange
}

export function ErrorRateTrendChart({ timeRange }: ErrorRateTrendChartProps) {
  const [chartData, setChartData] = useState<Array<{ time: string; error_rate: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/error-rate-trend?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Pass raw API data to chart component - let component handle time processing
        const transformedData = result.data?.map((item: { 
          minute: string; 
          error_rate: number 
        }) => {
          return {
            minute: item.minute, // Pass raw minute timestamp
            error_rate: item.error_rate
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
      title="Error Rate Trend"
      description="Error percentage over time"
      loading={loading}
      error={error}
    >
      <LineChart
        data={chartData}
        config={chartConfig}
        timeRange={timeRange}
        yAxisFormatter={(value) => `${value}%`}
      />
    </ChartWrapper>
  )
}
