"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
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
        
        // Transform Tinybird data to chart format
        const transformedData = result.data?.map((item: { 
          minute: string; 
          error_rate: number 
        }) => {
          // Parse UTC timestamp and convert to user's local timezone
          const utcDate = new Date(`${item.minute}Z`) // Ensure it's treated as UTC
          const localTime = utcDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
            // Defaults to browser's local timezone
          })
          
          return {
            time: localTime,
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Rate Trend</CardTitle>
          <CardDescription>Error percentage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Rate Trend</CardTitle>
          <CardDescription>Error percentage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-destructive">Error: {error}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Rate Trend</CardTitle>
        <CardDescription>
          Error percentage over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full" ref={null} id="error-rate-trend-chart">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line 
              type="monotone" 
              dataKey="error_rate" 
              stroke="hsl(0, 84%, 60%)" 
              strokeWidth={2}
              dot={{ fill: "hsl(0, 84%, 60%)", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
