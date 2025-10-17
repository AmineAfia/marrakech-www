import type { TimeRange } from "@/app/dashboard/time-range-picker"

export function generateCompleteTimeRange(timeRange: TimeRange): string[] {
  const now = new Date()
  
  const timeRangeMinutes: Record<TimeRange, number> = {
    '5m': 5,
    '15m': 15,
    '1h': 60,
    '6h': 360,
    '12h': 720,
    '24h': 1440,
    '7d': 10080
  }
  
  const minutesBack = timeRangeMinutes[timeRange] || 60
  const startTime = new Date(now.getTime() - minutesBack * 60 * 1000)
  
  // Adaptive granularity based on time range
  let intervalMinutes: number
  if (timeRange === '5m' || timeRange === '15m' || timeRange === '1h') {
    intervalMinutes = 1  // minute-level
  } else if (timeRange === '7d') {
    intervalMinutes = 60  // hour-level
  } else {
    intervalMinutes = 5  // 5-minute level for 6h, 12h, 24h
  }
  
  // Align start time to interval boundary
  if (intervalMinutes === 5) {
    const minutes = startTime.getMinutes()
    const alignedMinutes = Math.floor(minutes / 5) * 5
    startTime.setMinutes(alignedMinutes)
    startTime.setSeconds(0)
    startTime.setMilliseconds(0)
  } else if (intervalMinutes === 1) {
    startTime.setSeconds(0)
    startTime.setMilliseconds(0)
  } else if (intervalMinutes === 60) {
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    startTime.setMilliseconds(0)
  }
  
  const allTimeSlots = []
  const currentTime = new Date(startTime)
  
  while (currentTime <= now) {
    const timeKey = currentTime.toISOString().slice(0, 19) // YYYY-MM-DDTHH:mm:ss
    
    allTimeSlots.push(timeKey)
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes)
  }
  
  return allTimeSlots
}

export function fillDataGaps<T extends Record<string, string | number | null>>(
  data: T[],
  timeRange: TimeRange,
  dataKeys: string[],
  fillValue: number | null = 0,
  timeKey = 'time'
): T[] {
  const allTimeSlots = generateCompleteTimeRange(timeRange)
  
  // Create a map from existing data - handle both 'time' and 'minute' keys
  const dataMap = new Map<string, T>()
  for (const item of data) {
    let time: string
    
    if ('minute' in item) {
      // Remove the 'Z' suffix if present and normalize to match generated keys
      time = String(item.minute).replace('Z', '').slice(0, 19)
    } else {
      // Use existing time key
      time = String(item[timeKey])
    }
    
    dataMap.set(time, item)
  }
  
  // Fill in missing time slots
  const completeData: T[] = []
  
  for (const slot of allTimeSlots) {
    if (dataMap.has(slot)) {
      const existingData = dataMap.get(slot)
      if (existingData) {
        // Convert minute to time if needed
        const processedData = { ...existingData }
        if ('minute' in processedData) {
          const { minute, ...rest } = processedData
          processedData[timeKey] = slot
          Object.assign(processedData, rest)
        }
        completeData.push(processedData)
      }
    } else {
      // Create empty entry with fill values
      const entry: Record<string, string | number | null> = { [timeKey]: slot }
      
      for (const key of dataKeys) {
        entry[key] = fillValue
      }
      
      completeData.push(entry as T)
    }
  }
  
  return completeData
}
