"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  total_cost_usd: {
    label: "Total Cost (USD)",
    color: "hsl(0, 84%, 60%)", // red
  },
} satisfies ChartConfig

interface CostAnalysisChartProps {
  timeRange: TimeRange
}

export function CostAnalysisChart({ timeRange }: CostAnalysisChartProps) {
  const [chartData, setChartData] = useState<Array<{ prompt_name: string; model: string; total_cost_usd: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/cost-analysis-by-prompt-model?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Transform Tinybird data to chart format
        const transformedData = result.data?.map((item: { 
          prompt_name: string; 
          model: string; 
          total_cost_usd: number 
        }) => ({
          prompt_name: item.prompt_name,
          model: item.model,
          total_cost_usd: item.total_cost_usd
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
          <CardTitle>Cost Analysis by Prompt & Model</CardTitle>
          <CardDescription>Total cost breakdown by prompt and model</CardDescription>
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
          <CardTitle>Cost Analysis by Prompt & Model</CardTitle>
          <CardDescription>Total cost breakdown by prompt and model</CardDescription>
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
        <CardTitle>Cost Analysis by Prompt & Model</CardTitle>
        <CardDescription>
          Total cost breakdown by prompt and model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full" ref={null} id="cost-analysis-chart">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="prompt_name"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ fill: "hsl(var(--border))", opacity: 0.3 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar 
              dataKey="total_cost_usd" 
              fill="hsl(0, 84%, 60%)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
