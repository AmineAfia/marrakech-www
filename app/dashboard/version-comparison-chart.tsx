"use client"

import { useState, useEffect } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  success_rate: {
    label: "Success Rate (%)",
    color: "hsl(142, 76%, 36%)", // green
  },
  avg_execution_time_ms: {
    label: "Avg Execution Time (ms)",
    color: "hsl(25, 95%, 53%)", // orange
  },
  avg_cost_usd: {
    label: "Avg Cost (USD)",
    color: "hsl(0, 84%, 60%)", // red
  },
  avg_tokens: {
    label: "Avg Tokens",
    color: "hsl(199, 89%, 48%)", // blue
  },
} satisfies ChartConfig

interface VersionComparisonChartProps {
  timeRange: TimeRange
}

export function VersionComparisonChart({ timeRange }: VersionComparisonChartProps) {
  const [chartData, setChartData] = useState<Array<{ 
    prompt_name: string; 
    prompt_version: string; 
    success_rate: number; 
    avg_execution_time_ms: number; 
    avg_cost_usd: number; 
    avg_tokens: number 
  }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/version-performance-comparison?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Transform Tinybird data to chart format
        const transformedData = result.data?.map((item: { 
          prompt_name: string; 
          prompt_version: string; 
          success_rate: number; 
          avg_execution_time_ms: number; 
          avg_cost_usd: number; 
          avg_tokens: number 
        }) => ({
          prompt_name: item.prompt_name,
          prompt_version: item.prompt_version,
          success_rate: item.success_rate,
          avg_execution_time_ms: item.avg_execution_time_ms,
          avg_cost_usd: item.avg_cost_usd,
          avg_tokens: item.avg_tokens
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
          <CardTitle>Version Performance Comparison</CardTitle>
          <CardDescription>Multi-metric comparison across versions</CardDescription>
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
          <CardTitle>Version Performance Comparison</CardTitle>
          <CardDescription>Multi-metric comparison across versions</CardDescription>
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
        <CardTitle>Version Performance Comparison</CardTitle>
        <CardDescription>
          Multi-metric comparison across versions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full" ref={null} id="version-comparison-chart">
          <RadarChart accessibilityLayer data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="prompt_version" />
            <PolarRadiusAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Radar 
              name="Success Rate"
              dataKey="success_rate" 
              stroke="hsl(142, 76%, 36%)" 
              fill="hsl(142, 76%, 36%, 0.225)" 
              strokeWidth={2}
            />
            <Radar 
              name="Avg Execution Time"
              dataKey="avg_execution_time_ms" 
              stroke="hsl(25, 95%, 53%)" 
              fill="hsl(25, 95%, 53%, 0.225)" 
              strokeWidth={2}
            />
            <Radar 
              name="Avg Cost"
              dataKey="avg_cost_usd" 
              stroke="hsl(0, 84%, 60%)" 
              fill="hsl(0, 84%, 60%, 0.225)" 
              strokeWidth={2}
            />
            <Radar 
              name="Avg Tokens"
              dataKey="avg_tokens" 
              stroke="hsl(199, 89%, 48%)" 
              fill="hsl(199, 89%, 48%, 0.225)" 
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
