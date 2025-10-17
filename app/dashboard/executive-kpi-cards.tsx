"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { TimeRange } from "./time-range-picker"

interface ExecutiveKPICardsProps {
  timeRange: TimeRange
}

interface KPIData {
  current_total_executions: number
  previous_total_executions: number
  executions_change_percent: number
  current_avg_cost: number
  previous_avg_cost: number
  avg_cost_change_percent: number
  current_success_rate: number
  previous_success_rate: number
  success_rate_change_points: number
  current_total_tool_calls: number
  previous_total_tool_calls: number
  tool_calls_change_percent: number
}

export function ExecutiveKPICards({ timeRange }: ExecutiveKPICardsProps) {
  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/executive-summary-kpis?timeframe=${timeRange}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.data && result.data.length > 0) {
          setKpiData(result.data[0])
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  const getTrendIcon = (change: number | null) => {
    if (change === null || change === undefined) return <Minus className="h-4 w-4 text-gray-600" />
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  const getTrendColor = (change: number | null) => {
    if (change === null || change === undefined) return "text-gray-600"
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  const formatChange = (change: number | null) => {
    if (change === null || change === undefined) return "No previous data"
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}% from previous period`
  }

  const formatPointsChange = (change: number | null) => {
    if (change === null || change === undefined) return "No previous data"
    return `${change > 0 ? '+' : ''}${change.toFixed(1)} points from previous period`
  }

  const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) return "No data"
    return `$${value.toFixed(4)}`
  }

  const formatPercentage = (value: number | null) => {
    if (value === null || value === undefined) return "No data"
    return `${value.toFixed(1)}%`
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">Loading...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !kpiData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">Error</div>
            <p className="text-xs text-muted-foreground">{error || 'No data available'}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
          {getTrendIcon(kpiData.executions_change_percent)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.current_total_executions.toLocaleString()}</div>
          <p className={`text-xs ${getTrendColor(kpiData.executions_change_percent)}`}>
            {formatChange(kpiData.executions_change_percent)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Cost</CardTitle>
          {getTrendIcon(kpiData.avg_cost_change_percent ? -kpiData.avg_cost_change_percent : null)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(kpiData.current_avg_cost)}</div>
          <p className={`text-xs ${getTrendColor(kpiData.avg_cost_change_percent ? -kpiData.avg_cost_change_percent : null)}`}>
            {formatChange(kpiData.avg_cost_change_percent)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          {getTrendIcon(kpiData.success_rate_change_points)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPercentage(kpiData.current_success_rate)}</div>
          <p className={`text-xs ${getTrendColor(kpiData.success_rate_change_points)}`}>
            {formatPointsChange(kpiData.success_rate_change_points)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tool Calls</CardTitle>
          {getTrendIcon(kpiData.tool_calls_change_percent)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.current_total_tool_calls.toLocaleString()}</div>
          <p className={`text-xs ${getTrendColor(kpiData.tool_calls_change_percent)}`}>
            {formatChange(kpiData.tool_calls_change_percent)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
