"use client"

import { useState, useEffect } from "react"
import { FilledAreaChart, ChartWrapper } from "@/components/charts"
import { type ChartConfig } from "@/components/ui/chart"
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
        
        // Pass raw API data to chart component - let component handle time processing
        const transformedData: Array<Record<string, string | number>> = []
        
        for (const item of result.data || []) {
          // Use prompt name as key, sanitized for object property
          const promptKey = item.prompt_name.toLowerCase().replace(/[^a-z0-9]/g, '_')
          
          transformedData.push({
            minute: item.minute, // Pass raw minute timestamp
            [promptKey]: item.tool_call_count
          })
        }
        
        setChartData(transformedData)
        
        // Update chart config with dynamic prompts
        const allPrompts = [...new Set(result.data?.map((item: { prompt_name: string }) => item.prompt_name) || [])]
        const newConfig: ChartConfig = {}
        
        allPrompts.forEach((prompt, index) => {
          const colors = [
            "hsl(262, 83%, 58%)", // purple
            "hsl(199, 89%, 48%)", // blue
            "hsl(142, 76%, 36%)", // green
            "hsl(25, 95%, 53%)",  // orange
            "hsl(0, 84%, 60%)",   // red
            "hsl(0, 0%, 45%)"     // gray
          ]
          
          const promptKey = String(prompt).toLowerCase().replace(/[^a-z0-9]/g, '_')
          newConfig[promptKey] = {
            label: String(prompt),
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
      title="Tool Calls by Prompt"
      description="Time-series tool calls executed per prompt"
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
