"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"
import { generateTimeSeriesData } from "./chart-utils"

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
  const chartData = generateTimeSeriesData(timeRange)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Calls by Status</CardTitle>
        <CardDescription>
          Time-series distribution of tool call execution statuses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <AreaChart accessibilityLayer data={chartData}>
            <defs>
              <linearGradient id="gradient-status-success" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="gradient-status-failed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="gradient-status-timeout" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="gradient-status-rateLimited" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="gradient-status-error" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 0%, 45%)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="hsl(0, 0%, 45%)" stopOpacity={0.1}/>
              </linearGradient>
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
            <Area 
              type="monotone" 
              dataKey="success" 
              stackId="a" 
              stroke="hsl(142, 76%, 36%)" 
              fill="url(#gradient-status-success)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="failed" 
              stackId="a" 
              stroke="hsl(0, 84%, 60%)" 
              fill="url(#gradient-status-failed)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="timeout" 
              stackId="a" 
              stroke="hsl(25, 95%, 53%)" 
              fill="url(#gradient-status-timeout)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="rateLimited" 
              stackId="a" 
              stroke="hsl(262, 83%, 58%)" 
              fill="url(#gradient-status-rateLimited)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="error" 
              stackId="a" 
              stroke="hsl(0, 0%, 45%)" 
              fill="url(#gradient-status-error)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
