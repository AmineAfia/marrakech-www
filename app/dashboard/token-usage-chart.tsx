"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  tokens: {
    label: "Tokens",
    color: "hsl(262, 83%, 58%)", // Datadog purple
  },
} satisfies ChartConfig

interface TokenUsageChartProps {
  timeRange: TimeRange
}

export function TokenUsageChart({ timeRange }: TokenUsageChartProps) {
  const [chartData, setChartData] = useState<Array<{ prompt: string; tokens: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dynamicChartConfig, setDynamicChartConfig] = useState(chartConfig)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/analytics/prompt-executions')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Transform Tinybird data to chart format
        // Group by prompt_name and aggregate tokens
        const promptMap = new Map<string, { prompt_name: string, total_tokens: number }>()
        
        for (const item of result.data || []) {
          const promptName = item.prompt_name
          const totalTokens = (item.request_tokens || 0) + (item.response_tokens || 0)
          
          if (promptMap.has(promptName)) {
            const existing = promptMap.get(promptName)
            if (existing) {
              existing.total_tokens += totalTokens
            }
          } else {
            promptMap.set(promptName, {
              prompt_name: promptName,
              total_tokens: totalTokens
            })
          }
        }
        
        const transformedData = Array.from(promptMap.values()).map(item => ({
          prompt: item.prompt_name,
          tokens: item.total_tokens
        }))
        
        setChartData(transformedData)
        
        // Update chart config with dynamic prompts
        const prompts = Array.from(promptMap.keys())
        const newConfig: ChartConfig = {}
        
        prompts.forEach((prompt, index) => {
          const colors = [
            "hsl(262, 83%, 58%)", // purple
            "hsl(199, 89%, 48%)", // blue
            "hsl(142, 76%, 36%)", // green
            "hsl(25, 95%, 53%)",  // orange
            "hsl(0, 84%, 60%)",   // red
            "hsl(0, 0%, 45%)"     // gray
          ]
          
          const promptKey = prompt.toLowerCase().replace(/[^a-z0-9]/g, '_')
          newConfig[promptKey] = {
            label: prompt,
            color: colors[index % colors.length]
          }
        })
        
        setDynamicChartConfig(newConfig)
        
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Token Usage by Prompt</CardTitle>
          <CardDescription>Total tokens consumed per prompt over time</CardDescription>
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
          <CardTitle>Token Usage by Prompt</CardTitle>
          <CardDescription>Total tokens consumed per prompt over time</CardDescription>
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
        <CardTitle>Token Usage by Prompt</CardTitle>
        <CardDescription>
          Total tokens consumed per prompt over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={dynamicChartConfig} className="min-h-[300px] w-full">
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="prompt"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
              formatter={(value) => [value.toLocaleString(), "Tokens"]}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {Object.entries(dynamicChartConfig).map(([key, config]) => (
              <Area 
                key={key}
                type="monotone" 
                dataKey="tokens" 
                stackId="a" 
                stroke={config.color} 
                fill={`${config.color}22`} 
                strokeWidth={1}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
