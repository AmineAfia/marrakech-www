"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconCheck, IconCode, IconRobot, IconBrain } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function SkeletonFormatted() {
  const sdks = [
    {
      name: "Vercel AI SDK",
      icon: IconCode,
      color: "text-black dark:text-white",
      bgColor: "bg-black dark:bg-white",
    },
    {
      name: "OpenAI",
      icon: IconRobot,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      name: "Anthropic",
      icon: IconBrain,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-8 gap-8 h-full">
      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        {sdks.map((sdk, index) => (
          <motion.div
            key={sdk.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.2 
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg border transition-all duration-200",
              sdk.bgColor,
              "border-neutral-200 dark:border-neutral-700 hover:shadow-lg"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                sdk.bgColor,
                "border border-neutral-200 dark:border-neutral-700"
              )}>
                <sdk.icon className={cn("h-6 w-6", sdk.color)} />
              </div>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                {sdk.name}
              </span>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.2 + 0.5 
              }}
              className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full"
            >
              <IconCheck className="h-4 w-4 text-white" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <div className="absolute top-8 right-8 w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
