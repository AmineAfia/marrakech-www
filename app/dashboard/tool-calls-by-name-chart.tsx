"use client"

import { useState, useEffect } from "react"
import { FilledAreaChart, ChartWrapper } from "@/components/charts"
import type { ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  tool1: {
    label: "web_search",
    color: "hsl(262, 83%, 58%)", // Datadog purple
  },
  tool2: {
    label: "codebase_search",
    color: "hsl(199, 89%, 48%)", // Datadog blue
  },
  tool3: {
    label: "file_operations",
    color: "hsl(142, 76%, 36%)", // Datadog green
  },
  tool4: {
    label: "terminal_commands",
    color: "hsl(25, 95%, 53%)", // Datadog orange
  },
} satisfies ChartConfig

interface ToolCallsByNameChartProps {
  timeRange: TimeRange
}

export function ToolCallsByNameChart({ timeRange }: ToolCallsByNameChartProps) {
  const [chartData, setChartData] = useState<Array<Record<string, string | number>>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dynamicChartConfig, setDynamicChartConfig] = useState(chartConfig)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/tool-calls-by-name?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Transform data to time-series format with tool names as keys
        const transformedData: Array<Record<string, string | number>> = []
        
        for (const item of result.data || []) {
          // Use tool name as key, sanitized for object property
          const toolKey = item.tool_name.toLowerCase().replace(/[^a-z0-9]/g, '_')
          
          transformedData.push({
            minute: item.minute, // Pass raw minute timestamp
            [toolKey]: item.tool_call_count
          })
        }
        
        setChartData(transformedData)
        
        // Update chart config with dynamic tools
        const allTools = [...new Set(result.data?.map((item: { tool_name: string }) => item.tool_name) || [])]
        const newConfig: ChartConfig = {}
        
        allTools.forEach((tool, index) => {
          const colors = [
            "hsl(262, 83%, 58%)", // purple
            "hsl(199, 89%, 48%)", // blue
            "hsl(142, 76%, 36%)", // green
            "hsl(25, 95%, 53%)",  // orange
            "hsl(0, 84%, 60%)",   // red
            "hsl(0, 0%, 45%)"     // gray
          ]
          
          const toolKey = String(tool).toLowerCase().replace(/[^a-z0-9]/g, '_')
          newConfig[toolKey] = {
            label: String(tool),
            color: colors[index % colors.length]
          }
        })
        
        setDynamicChartConfig(newConfig as typeof chartConfig)
        
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  return (
    <ChartWrapper
      title="Tool Calls by Name"
      description="Time-series tool calls executed by tool name"
      loading={loading}
      error={error}
    >
      <FilledAreaChart
        data={chartData}
        config={dynamicChartConfig}
        timeRange={timeRange}
        yAxisFormatter={(value) => value.toLocaleString()}
      />
    </ChartWrapper>
  )
}
