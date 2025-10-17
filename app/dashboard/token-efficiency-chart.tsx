"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
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
        
        // Transform Tinybird data to chart format
        const transformedData = result.data?.map((item: { 
          minute: string; 
          efficiency_ratio: number 
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Token Efficiency Ratio</CardTitle>
          <CardDescription>Output tokens / Input tokens ratio over time</CardDescription>
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
          <CardTitle>Token Efficiency Ratio</CardTitle>
          <CardDescription>Output tokens / Input tokens ratio over time</CardDescription>
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
        <CardTitle>Token Efficiency Ratio</CardTitle>
        <CardDescription>
          Output tokens / Input tokens ratio over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full" ref={null} id="token-efficiency-chart">
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
              tickFormatter={(value) => value.toFixed(2)}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line 
              type="monotone" 
              dataKey="efficiency_ratio" 
              stroke="hsl(199, 89%, 48%)" 
              strokeWidth={2}
              dot={{ fill: "hsl(199, 89%, 48%)", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
