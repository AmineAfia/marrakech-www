"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"
import { generateTimeSeriesData } from "./chart-utils"

const chartConfig = {
  prompt1: {
    label: "Customer Support",
    color: "var(--chart-1)",
  },
  prompt2: {
    label: "Code Generation",
    color: "var(--chart-2)",
  },
  prompt3: {
    label: "Content Writing",
    color: "var(--chart-3)",
  },
  prompt4: {
    label: "Data Analysis",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

interface RequestsChartProps {
  timeRange: TimeRange
}

export function RequestsChart({ timeRange }: RequestsChartProps) {
  const chartData = generateTimeSeriesData(timeRange)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requests Per Second</CardTitle>
        <CardDescription>
          Stacked requests per second by prompt over time
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
              tickFormatter={(value) => `${value}/s`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="prompt1" stackId="a" fill="var(--color-prompt1)" radius={4} />
            <Bar dataKey="prompt2" stackId="a" fill="var(--color-prompt2)" radius={4} />
            <Bar dataKey="prompt3" stackId="a" fill="var(--color-prompt3)" radius={4} />
            <Bar dataKey="prompt4" stackId="a" fill="var(--color-prompt4)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
