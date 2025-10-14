"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type TimeRange = "5m" | "15m" | "1h" | "6h" | "12h"

interface TimeRangePickerProps {
  value: TimeRange
  onValueChange: (value: TimeRange) => void
}

export function TimeRangePicker({ value, onValueChange }: TimeRangePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Time Range:</span>
      <ToggleGroup type="single" value={value} onValueChange={onValueChange}>
        <ToggleGroupItem value="5m">Last 5min</ToggleGroupItem>
        <ToggleGroupItem value="15m">Last 15min</ToggleGroupItem>
        <ToggleGroupItem value="1h">Last 1h</ToggleGroupItem>
        <ToggleGroupItem value="6h">Last 6h</ToggleGroupItem>
        <ToggleGroupItem value="12h">Last 12h</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
