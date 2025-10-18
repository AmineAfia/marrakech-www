"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconUser, IconMessage, IconTool, IconCheck, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function SkeletonUserBehavior() {
  const flowSteps = [
    {
      icon: IconUser,
      label: "User",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      status: "success"
    },
    {
      icon: IconMessage,
      label: "Prompt",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      status: "success"
    },
    {
      icon: IconTool,
      label: "Tool Call",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      status: "success"
    },
    {
      icon: IconCheck,
      label: "Response",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      status: "success"
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-6 h-full">
      {/* Flow visualization */}
      <div className="flex items-center justify-between w-full max-w-lg">
        {flowSteps.map((step, index) => (
          <React.Fragment key={step.label}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.2 
              }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "p-3 rounded-full border-2 transition-all duration-200",
                  step.bgColor,
                  step.status === "success" 
                    ? "border-green-500 dark:border-green-400" 
                    : "border-red-500 dark:border-red-400"
                )}
              >
                <step.icon className={cn("h-6 w-6", step.color)} />
              </motion.div>
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                {step.label}
              </span>
              
              {/* Status indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.2 + 0.5 
                }}
                className={cn(
                  "w-2 h-2 rounded-full",
                  step.status === "success" 
                    ? "bg-green-500" 
                    : "bg-red-500"
                )}
              />
            </motion.div>

            {/* Connection line */}
            {index < flowSteps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.2 + 0.3 
                }}
                className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-2 relative"
              >
                {/* Animated particles */}
                <motion.div
                  animate={{ x: [0, 100, 0] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Number.POSITIVE_INFINITY, 
                    ease: "linear" 
                  }}
                  className="absolute top-0 w-2 h-0.5 bg-white rounded-full"
                />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Stats below flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 grid grid-cols-2 gap-4 w-full max-w-md"
      >
        <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <div className="text-lg font-bold text-green-600">98.2%</div>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">Success Rate</div>
        </div>
        <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <div className="text-lg font-bold text-blue-600">1.2s</div>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">Avg Response</div>
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <div className="absolute top-8 right-8 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-4 right-4 w-1 h-1 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
}
