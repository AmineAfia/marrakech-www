"use client";

import React from "react";
import { motion } from "framer-motion";
import { StackedBarChart } from "@/components/charts";
import { type ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export function SkeletonAnalytics() {
  const chartConfig = {
    success: {
      label: "Success",
      color: "hsl(142, 76%, 36%)",
    },
    failed: {
      label: "Failed", 
      color: "hsl(0, 84%, 60%)",
    },
    timeout: {
      label: "Timeout",
      color: "hsl(25, 95%, 53%)",
    },
    rateLimited: {
      label: "Rate Limited",
      color: "hsl(262, 83%, 58%)",
    },
    error: {
      label: "Error",
      color: "hsl(0, 0%, 45%)",
    },
  } satisfies ChartConfig;

  const chartData = [
    { time: "2024-01-15T09:00:00Z", success: 420, failed: 85, timeout: 35, rateLimited: 28, error: 18 },
    { time: "2024-01-15T12:00:00Z", success: 580, failed: 110, timeout: 48, rateLimited: 35, error: 22 },
    { time: "2024-01-15T15:00:00Z", success: 450, failed: 95, timeout: 42, rateLimited: 31, error: 15 },
    { time: "2024-01-15T18:00:00Z", success: 520, failed: 75, timeout: 38, rateLimited: 25, error: 20 },
    { time: "2024-01-16T09:00:00Z", success: 480, failed: 90, timeout: 40, rateLimited: 33, error: 17 },
    { time: "2024-01-16T12:00:00Z", success: 610, failed: 120, timeout: 52, rateLimited: 38, error: 25 },
    { time: "2024-01-16T15:00:00Z", success: 390, failed: 105, timeout: 45, rateLimited: 29, error: 19 },
    { time: "2024-01-16T18:00:00Z", success: 550, failed: 80, timeout: 36, rateLimited: 27, error: 21 },
  ];

  return (
    <div className="relative flex flex-col p-4 gap-4 h-full bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
      {/* Chart Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        Tool Calls by Status
      </motion.div>

      {/* Stacked Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 min-h-[200px]"
      >
        <StackedBarChart
          data={chartData}
          config={chartConfig}
          xAxisKey="time"
          className="h-full w-full"
          yAxisFormatter={(value) => value.toLocaleString()}
        />
      </motion.div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-2 right-2 w-1 h-1 bg-green-500 rounded-full animate-pulse" />
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
