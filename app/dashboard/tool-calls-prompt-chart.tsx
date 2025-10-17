"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  prompt1: {
    label: "Customer Support",
    color: "hsl(262, 83%, 58%)", // Datadog purple
  },
  prompt2: {
    label: "Code Generation",
    color: "hsl(199, 89%, 48%)", // Datadog blue
  },
  prompt3: {
    label: "Content Writing",
    color: "hsl(142, 76%, 36%)", // Datadog green
  },
  prompt4: {
    label: "Data Analysis",
    color: "hsl(25, 95%, 53%)", // Datadog orange
  },
} satisfies ChartConfig

interface ToolCallsPromptChartProps {
  timeRange: TimeRange
}

export function ToolCallsPromptChart({ timeRange }: ToolCallsPromptChartProps) {
  const [chartData, setChartData] = useState<Array<Record<string, string | number>>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dynamicChartConfig, setDynamicChartConfig] = useState(chartConfig)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/tool-calls-by-prompt?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Transform Tinybird data to chart format
        const dataMap = new Map<string, Record<string, string | number>>()
        
        for (const item of result.data || []) {
          // Parse UTC timestamp and convert to user's local timezone
          const utcDate = new Date(`${item.minute}Z`) // Ensure it's treated as UTC
          const timeKey = utcDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
            // Defaults to browser's local timezone
          })
          
          if (!dataMap.has(timeKey)) {
            dataMap.set(timeKey, { time: timeKey })
          }
          
          const timeData = dataMap.get(timeKey)
          // Use prompt name as key, sanitized for object property
          const promptKey = item.prompt_name.toLowerCase().replace(/[^a-z0-9]/g, '_')
          timeData[promptKey] = item.tool_call_count
        }
        
        const transformedData = Array.from(dataMap.values())
        setChartData(transformedData)
        
        // Update chart config with dynamic prompts
        const prompts = [...new Set(result.data?.map((item: { prompt_name: string }) => item.prompt_name) || [])]
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
  }, [timeRange])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tool Calls by Prompt</CardTitle>
          <CardDescription>Time-series tool calls executed per prompt</CardDescription>
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
          <CardTitle>Tool Calls by Prompt</CardTitle>
          <CardDescription>Time-series tool calls executed per prompt</CardDescription>
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
        <CardTitle>Tool Calls by Prompt</CardTitle>
        <CardDescription>
          Time-series tool calls executed per prompt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={dynamicChartConfig} className="min-h-[300px] w-full">
          <AreaChart accessibilityLayer data={chartData}>
            <defs>
              {Object.entries(dynamicChartConfig).map(([key, config]) => (
                <linearGradient key={`gradient-${key}`} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={config.color} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={config.color} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
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
            {Object.entries(dynamicChartConfig).map(([key, config]) => (
              <Area 
                key={key}
                type="monotone" 
                dataKey={key} 
                stackId="a" 
                stroke={config.color} 
                fill={`url(#gradient-${key})`} 
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
