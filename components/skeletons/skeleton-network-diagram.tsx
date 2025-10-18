"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconRobot, IconBrain, IconCode, IconActivity, IconZap } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function SkeletonNetworkDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    {
      id: "app",
      label: "Your App",
      icon: IconActivity,
      position: { x: 50, y: 50 },
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      metrics: { calls: "12.4k", latency: "1.2s", cost: "$24.50" }
    },
    {
      id: "openai",
      label: "OpenAI",
      icon: IconRobot,
      position: { x: 20, y: 20 },
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      metrics: { calls: "8.2k", latency: "0.9s", cost: "$18.30" }
    },
    {
      id: "anthropic",
      label: "Anthropic",
      icon: IconBrain,
      position: { x: 80, y: 20 },
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      metrics: { calls: "4.2k", latency: "1.5s", cost: "$6.20" }
    },
    {
      id: "vercel",
      label: "Vercel AI",
      icon: IconCode,
      position: { x: 20, y: 80 },
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      metrics: { calls: "3.1k", latency: "0.8s", cost: "$2.10" }
    }
  ];

  const connections = [
    { from: "app", to: "openai", strength: 0.8 },
    { from: "app", to: "anthropic", strength: 0.6 },
    { from: "app", to: "vercel", strength: 0.4 },
  ];

  return (
    <div className="relative w-full h-80 p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-lg">
      <div className="relative w-full h-full">
        {/* Network nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: nodes.indexOf(node) * 0.2 
            }}
            whileHover={{ scale: 1.1 }}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode(null)}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full border-2 transition-all duration-200 cursor-pointer",
              node.bgColor,
              hoveredNode === node.id 
                ? "border-blue-500 shadow-lg" 
                : "border-neutral-200 dark:border-neutral-700"
            )}
            style={{
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
            }}
          >
            <node.icon className={cn("h-8 w-8", node.color)} />
          </motion.div>
        ))}

        {/* Connection lines */}
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.div
              key={`${connection.from}-${connection.to}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 1, 
                delay: index * 0.3 + 0.5 
              }}
              className="absolute pointer-events-none"
            >
              <svg
                width="100%"
                height="100%"
                className="absolute inset-0"
                style={{ zIndex: 1 }}
                aria-label="Network connection"
              >
                <motion.line
                  x1={`${fromNode.position.x}%`}
                  y1={`${fromNode.position.y}%`}
                  x2={`${toNode.position.x}%`}
                  y2={`${toNode.position.y}%`}
                  stroke="currentColor"
                  strokeWidth={2}
                  className="text-blue-400"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.3 + 0.5 
                  }}
                />
                
                {/* Animated particles */}
                <motion.circle
                  r="3"
                  fill="currentColor"
                  className="text-blue-500"
                  animate={{
                    cx: [`${fromNode.position.x}%`, `${toNode.position.x}%`, `${fromNode.position.x}%`],
                    cy: [`${fromNode.position.y}%`, `${toNode.position.y}%`, `${fromNode.position.y}%`],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear"
                  }}
                />
              </svg>
            </motion.div>
          );
        })}

        {/* Metrics overlay */}
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700"
          >
            <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">
              {nodes.find(n => n.id === hoveredNode)?.label} Metrics
            </div>
            {nodes.find(n => n.id === hoveredNode)?.metrics && (
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Calls:</span>
                  <span className="font-medium">{nodes.find(n => n.id === hoveredNode)?.metrics.calls}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Latency:</span>
                  <span className="font-medium">{nodes.find(n => n.id === hoveredNode)?.metrics.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Cost:</span>
                  <span className="font-medium">{nodes.find(n => n.id === hoveredNode)?.metrics.cost}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-8 h-8 border border-blue-300 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-6 h-6 border border-green-300 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
