import type { ChartConfig } from "@/components/ui/chart"
import type { TimeRange } from "@/app/dashboard/time-range-picker"

export interface BaseChartProps {
  data: Array<Record<string, string | number | null>>
  config: ChartConfig
  xAxisKey?: string
  className?: string
  height?: number
  yAxisFormatter?: (value: number) => string
  // New props for complete time range support
  timeRange?: TimeRange
  fillMissingDataWith?: number | null
}

export interface ChartWrapperProps {
  title: string
  description: string
  loading: boolean
  error: string | null
  children: React.ReactNode
  className?: string
}
