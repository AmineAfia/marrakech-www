import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import type { BaseChartProps } from "./types"
import { fillDataGaps } from "./time-utils"

export function StackedBarChart({
  data,
  config,
  xAxisKey = "time",
  className = "min-h-[300px] w-full",
  height = 300,
  yAxisFormatter = (value) => value.toLocaleString(),
  timeRange,
  fillMissingDataWith = 0
}: BaseChartProps) {
  // Apply complete time range if timeRange is provided
  let chartData = data
  
  if (timeRange) {
    const dataKeys = Object.keys(config)
    chartData = fillDataGaps(data, timeRange, dataKeys, fillMissingDataWith, xAxisKey)
  }
  
  return (
    <ChartContainer config={config} className={className}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--border))" 
          opacity={0.3} 
        />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={8}
          axisLine={false}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          tickFormatter={(value) => {
            // Format based on timeRange prop
            const date = new Date(value)
            if (timeRange === '7d') {
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit' })
            }
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={yAxisFormatter}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
        />
        <ChartTooltip 
          content={<ChartTooltipContent />}
          cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
        />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.entries(config).map(([key, configItem]) => (
          <Bar 
            key={key}
            dataKey={key} 
            stackId="a" 
            stroke="none"
            fill={configItem.color}
            radius={[0, 0, 0, 0]}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
