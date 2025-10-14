"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"
import { generateTimeSeriesData } from "./chart-utils"

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
  const chartData = generateTimeSeriesData(timeRange)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Calls by Prompt</CardTitle>
        <CardDescription>
          Time-series tool calls executed per prompt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <AreaChart accessibilityLayer data={chartData}>
            <defs>
              <linearGradient id="gradient-tool-prompt1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="gradient-tool-prompt2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="gradient-tool-prompt3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="gradient-tool-prompt4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.1}/>
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
              dataKey="prompt1" 
              stackId="a" 
              stroke="hsl(262, 83%, 58%)" 
              fill="url(#gradient-tool-prompt1)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="prompt2" 
              stackId="a" 
              stroke="hsl(199, 89%, 48%)" 
              fill="url(#gradient-tool-prompt2)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="prompt3" 
              stackId="a" 
              stroke="hsl(142, 76%, 36%)" 
              fill="url(#gradient-tool-prompt3)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="prompt4" 
              stackId="a" 
              stroke="hsl(25, 95%, 53%)" 
              fill="url(#gradient-tool-prompt4)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
