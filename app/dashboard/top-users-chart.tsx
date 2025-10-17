"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  execution_count: {
    label: "Execution Count",
    color: "hsl(25, 95%, 53%)", // orange
  },
} satisfies ChartConfig

interface TopUsersChartProps {
  timeRange: TimeRange
}

export function TopUsersChart({ timeRange }: TopUsersChartProps) {
  const [chartData, setChartData] = useState<Array<{ user_id: string; execution_count: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/top-users-by-execution?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Transform Tinybird data to chart format
        const transformedData = result.data?.map((item: { 
          user_id: string; 
          execution_count: number 
        }) => ({
          user_id: item.user_id,
          execution_count: item.execution_count
        })) || []
        
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
          <CardTitle>Top Users by Execution Count</CardTitle>
          <CardDescription>Users with highest execution counts</CardDescription>
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
          <CardTitle>Top Users by Execution Count</CardTitle>
          <CardDescription>Users with highest execution counts</CardDescription>
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
        <CardTitle>Top Users by Execution Count</CardTitle>
        <CardDescription>
          Users with highest execution counts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full" ref={null} id="top-users-chart">
          <BarChart accessibilityLayer data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              type="number"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              type="category"
              dataKey="user_id"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ fill: "hsl(var(--border))", opacity: 0.3 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar 
              dataKey="execution_count" 
              fill="hsl(25, 95%, 53%)" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
