import type { TimeRange } from "./time-range-picker"

export function generateTimeSeriesData(timeRange: TimeRange) {
  const now = new Date()
  let intervals: number
  let intervalMinutes: number

  switch (timeRange) {
    case "5m":
      intervals = 10
      intervalMinutes = 0.5
      break
    case "15m":
      intervals = 15
      intervalMinutes = 1
      break
    case "1h":
      intervals = 12
      intervalMinutes = 5
      break
    case "6h":
      intervals = 12
      intervalMinutes = 30
      break
    case "12h":
      intervals = 12
      intervalMinutes = 60
      break
  }

  const data = []
  for (let i = intervals - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * intervalMinutes * 60 * 1000)
    const timeStr = time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
    
    data.push({
      time: timeStr,
      // Generate realistic mock data with some randomness
      prompt1: Math.floor(Math.random() * 20) + 5,
      prompt2: Math.floor(Math.random() * 15) + 3,
      prompt3: Math.floor(Math.random() * 12) + 2,
      prompt4: Math.floor(Math.random() * 8) + 1,
      success: Math.floor(Math.random() * 50) + 20,
      failed: Math.floor(Math.random() * 5) + 1,
      timeout: Math.floor(Math.random() * 3) + 1,
      rateLimited: Math.floor(Math.random() * 2),
      error: Math.floor(Math.random() * 2),
      tokens1: Math.floor(Math.random() * 5000) + 1000,
      tokens2: Math.floor(Math.random() * 4000) + 800,
      tokens3: Math.floor(Math.random() * 3000) + 600,
      tokens4: Math.floor(Math.random() * 2000) + 400,
    })
  }

  return data
}
