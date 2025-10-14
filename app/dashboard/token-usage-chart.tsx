"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"
import { generateTimeSeriesData } from "./chart-utils"

const chartConfig = {
  tokens1: {
    label: "Customer Support",
    color: "var(--chart-1)",
  },
  tokens2: {
    label: "Code Generation",
    color: "var(--chart-2)",
  },
  tokens3: {
    label: "Content Writing",
    color: "var(--chart-3)",
  },
  tokens4: {
    label: "Data Analysis",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

interface TokenUsageChartProps {
  timeRange: TimeRange
}

export function TokenUsageChart({ timeRange }: TokenUsageChartProps) {
  const chartData = generateTimeSeriesData(timeRange)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Usage by Prompt</CardTitle>
        <CardDescription>
          Time-series token consumption per prompt
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
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value) => [value.toLocaleString(), "Tokens"]}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="tokens1" stackId="a" fill="var(--color-tokens1)" radius={0} />
            <Bar dataKey="tokens2" stackId="a" fill="var(--color-tokens2)" radius={0} />
            <Bar dataKey="tokens3" stackId="a" fill="var(--color-tokens3)" radius={0} />
            <Bar dataKey="tokens4" stackId="a" fill="var(--color-tokens4)" radius={0} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
