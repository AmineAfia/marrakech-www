"use client"

import { useState, useEffect } from "react"
import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const COLORS = [
  "hsl(262, 83%, 58%)", // purple
  "hsl(199, 89%, 48%)", // blue
  "hsl(142, 76%, 36%)", // green
  "hsl(25, 95%, 53%)",  // orange
  "hsl(0, 84%, 60%)",   // red
  "hsl(0, 0%, 45%)"     // gray
]

const chartConfig = {
  execution_count: {
    label: "Execution Count",
    color: "hsl(262, 83%, 58%)", // purple
  },
} satisfies ChartConfig

interface ExecutionsByRegionChartProps {
  timeRange: TimeRange
}

export function ExecutionsByRegionChart({ timeRange }: ExecutionsByRegionChartProps) {
  const [chartData, setChartData] = useState<Array<{ region: string; execution_count: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/executions-by-region?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Transform Tinybird data to chart format
        const transformedData = result.data?.map((item: { 
          region: string; 
          execution_count: number 
        }) => ({
          region: item.region,
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
          <CardTitle>Executions by Region</CardTitle>
          <CardDescription>Execution distribution across regions</CardDescription>
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
          <CardTitle>Executions by Region</CardTitle>
          <CardDescription>Execution distribution across regions</CardDescription>
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
        <CardTitle>Executions by Region</CardTitle>
        <CardDescription>
          Execution distribution across regions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full" ref={null} id="executions-by-region-chart">
          <PieChart accessibilityLayer data={chartData}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie
              data={chartData}
              dataKey="execution_count"
              nameKey="region"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ region, execution_count }) => `${region}: ${execution_count}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
