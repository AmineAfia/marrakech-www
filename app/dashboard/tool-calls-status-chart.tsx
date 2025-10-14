"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"
import { generateTimeSeriesData } from "./chart-utils"

const chartConfig = {
  success: {
    label: "Success",
    color: "var(--chart-1)",
  },
  failed: {
    label: "Failed",
    color: "var(--chart-2)",
  },
  timeout: {
    label: "Timeout",
    color: "var(--chart-3)",
  },
  rateLimited: {
    label: "Rate Limited",
    color: "var(--chart-4)",
  },
  error: {
    label: "Error",
    color: "var(--chart-5)",
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
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="success" stackId="a" fill="var(--color-success)" radius={4} />
            <Bar dataKey="failed" stackId="a" fill="var(--color-failed)" radius={4} />
            <Bar dataKey="timeout" stackId="a" fill="var(--color-timeout)" radius={4} />
            <Bar dataKey="rateLimited" stackId="a" fill="var(--color-rateLimited)" radius={4} />
            <Bar dataKey="error" stackId="a" fill="var(--color-error)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
