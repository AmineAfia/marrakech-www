"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
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
        
        // Transform Tinybird data to chart format
        const transformedData = result.data?.map((item: { 
          minute: string; 
          input_tokens: number; 
          output_tokens: number 
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Token Usage Over Time</CardTitle>
          <CardDescription>Input and output tokens over time</CardDescription>
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
          <CardTitle>Total Token Usage Over Time</CardTitle>
          <CardDescription>Input and output tokens over time</CardDescription>
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
        <CardTitle>Total Token Usage Over Time</CardTitle>
        <CardDescription>
          Input and output tokens over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full" ref={null} id="total-token-usage-chart">
          <AreaChart accessibilityLayer data={chartData}>
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
              tickFormatter={(value) => value.toLocaleString()}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area 
              type="monotone" 
              dataKey="input_tokens" 
              stackId="a"
              stroke="hsl(199, 89%, 48%)" 
              fill="hsl(199, 89%, 48%, 0.225)" 
              strokeWidth={1}
            />
            <Area 
              type="monotone" 
              dataKey="output_tokens" 
              stackId="a"
              stroke="hsl(142, 76%, 36%)" 
              fill="hsl(142, 76%, 36%, 0.225)" 
              strokeWidth={1}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
