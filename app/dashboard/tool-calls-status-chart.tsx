"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  success: {
    label: "Success",
    color: "hsl(142, 76%, 36%)", // Datadog green
  },
  failed: {
    label: "Failed",
    color: "hsl(0, 84%, 60%)", // Datadog red
  },
  timeout: {
    label: "Timeout",
    color: "hsl(25, 95%, 53%)", // Datadog orange
  },
  rateLimited: {
    label: "Rate Limited",
    color: "hsl(262, 83%, 58%)", // Datadog purple
  },
  error: {
    label: "Error",
    color: "hsl(0, 0%, 45%)", // Datadog gray
  },
} satisfies ChartConfig

interface ToolCallsStatusChartProps {
  timeRange: TimeRange
}

export function ToolCallsStatusChart({ timeRange }: ToolCallsStatusChartProps) {
  const [chartData, setChartData] = useState<Array<Record<string, string | number>>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dynamicChartConfig, setDynamicChartConfig] = useState(chartConfig)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/tool-calls-by-status?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Transform Tinybird data to chart format
        const dataMap = new Map<string, Record<string, string | number>>()
        
        for (const item of result.data || []) {
          const timeKey = new Date(item.minute).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
          
          if (!dataMap.has(timeKey)) {
            dataMap.set(timeKey, { time: timeKey })
          }
          
          const timeData = dataMap.get(timeKey)
          timeData[item.status.toLowerCase()] = item.tool_call_count
        }
        
        const transformedData = Array.from(dataMap.values())
        setChartData(transformedData)
        
        // Update chart config with dynamic statuses
        const statuses = [...new Set(result.data?.map((item: { status: string }) => item.status.toLowerCase()) || [])]
        const newConfig: ChartConfig = {}
        
        statuses.forEach((status, index) => {
          const colors = [
            "hsl(142, 76%, 36%)", // green
            "hsl(0, 84%, 60%)",   // red
            "hsl(25, 95%, 53%)",  // orange
            "hsl(262, 83%, 58%)", // purple
            "hsl(0, 0%, 45%)"     // gray
          ]
          
          newConfig[status] = {
            label: status.charAt(0).toUpperCase() + status.slice(1),
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
          <CardTitle>Tool Calls by Status</CardTitle>
          <CardDescription>Time-series distribution of tool call execution statuses</CardDescription>
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
          <CardTitle>Tool Calls by Status</CardTitle>
          <CardDescription>Time-series distribution of tool call execution statuses</CardDescription>
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
        <CardTitle>Tool Calls by Status</CardTitle>
        <CardDescription>
          Time-series distribution of tool call execution statuses
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
