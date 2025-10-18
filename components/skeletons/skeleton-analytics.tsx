"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export function SkeletonAnalytics() {
  const chartData = [
    { name: "Mon", value: 2400 },
    { name: "Tue", value: 1398 },
    { name: "Wed", value: 9800 },
    { name: "Thu", value: 3908 },
    { name: "Fri", value: 4800 },
    { name: "Sat", value: 3800 },
    { name: "Sun", value: 4300 },
  ];

  const lineData = [
    { name: "1", value: 65 },
    { name: "2", value: 78 },
    { name: "3", value: 82 },
    { name: "4", value: 75 },
    { name: "5", value: 88 },
    { name: "6", value: 92 },
  ];

  const metrics = [
    { label: "Success Rate", value: "98.2%", color: "text-green-600" },
    { label: "Avg Latency", value: "1.2s", color: "text-blue-600" },
    { label: "Total Calls", value: "12.4k", color: "text-purple-600" },
  ];

  return (
    <div className="relative flex flex-col p-4 gap-4 h-full bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-2">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1 
            }}
            className="bg-neutral-50 dark:bg-neutral-800 p-2 rounded text-center"
          >
            <div className={cn("text-xs font-medium", metric.color)}>
              {metric.value}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="h-20"
      >
        <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
          Daily Executions
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Bar 
              dataKey="value" 
              fill="currentColor" 
              className="text-blue-500"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="h-16"
      >
        <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
          Performance Trend
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="currentColor" 
              strokeWidth={2}
              className="text-green-500"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-2 right-2 w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
}
