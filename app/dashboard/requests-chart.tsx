"use client"

import { useState, useEffect } from "react"
import { ChartWrapper, StackedBarChart } from "@/components/charts"
import { type ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "./time-range-picker"

const chartConfig = {
  executions: {
    label: "Executions",
    color: "hsl(262, 83%, 58%)", // Datadog purple
  },
} satisfies ChartConfig

interface RequestsChartProps {
  timeRange: TimeRange
}

export function RequestsChart({ timeRange }: RequestsChartProps) {
  const [chartData, setChartData] = useState<Array<Record<string, string | number>>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dynamicChartConfig, setDynamicChartConfig] = useState(chartConfig)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/prompt-executions-per-minute?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Pass raw API data to chart component - let component handle time processing
        const transformedData: Array<Record<string, string | number>> = []
        
        for (const item of result.data || []) {
          // Use version as key, sanitized for object property
          const versionKey = item.prompt_version.toLowerCase().replace(/[^a-z0-9]/g, '_')
          
          transformedData.push({
            minute: item.minute, // Pass raw minute timestamp
            [versionKey]: item.execution_count
          })
        }
        
        setChartData(transformedData)
        
        // Update chart config with dynamic versions
        const allVersions = [...new Set(result.data?.map((item: { prompt_version: string }) => item.prompt_version) || [])]
        const newConfig: ChartConfig = {}
        
        allVersions.forEach((version, index) => {
          const colors = [
            "hsl(262, 83%, 58%)", // purple
            "hsl(199, 89%, 48%)", // blue
            "hsl(142, 76%, 36%)", // green
            "hsl(25, 95%, 53%)",  // orange
            "hsl(0, 84%, 60%)",   // red
            "hsl(0, 0%, 45%)"     // gray
          ]
          
          const versionKey = String(version).toLowerCase().replace(/[^a-z0-9]/g, '_')
          newConfig[versionKey] = {
            label: String(version),
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
      title="Prompt Executions Over Time by Version"
      description="Execution volume by version"
      loading={loading}
      error={error}
    >
      <StackedBarChart
        data={chartData}
        config={dynamicChartConfig}
        timeRange={timeRange}
      />
    </ChartWrapper>
  )
}
