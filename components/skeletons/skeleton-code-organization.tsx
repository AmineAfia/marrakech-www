"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SkeletonCodeOrganization() {
  const [highlightedCode, setHighlightedCode] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const codeExample = `const weatherBot = prompt('You are a weather assistant')
  .tool(getWeather)
  .output(z.object({ 
    temp: z.number(), 
    conditions: z.string() 
  }));

// Clean, type-safe, observable`;

  useEffect(() => {
    // Simulate syntax highlighting
    const highlighted = codeExample
      .replace(/const/g, '<span class="text-blue-400">const</span>')
      .replace(/prompt/g, '<span class="text-yellow-300">prompt</span>')
      .replace(/\.tool/g, '<span class="text-yellow-300">.tool</span>')
      .replace(/\.output/g, '<span class="text-yellow-300">.output</span>')
      .replace(/z\.object/g, '<span class="text-purple-400">z.object</span>')
      .replace(/z\.number/g, '<span class="text-purple-400">z.number</span>')
      .replace(/z\.string/g, '<span class="text-purple-400">z.string</span>')
      .replace(/getWeather/g, '<span class="text-green-300">getWeather</span>')
      .replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')
      .replace(/\{/g, '<span class="text-gray-300">{</span>')
      .replace(/\}/g, '<span class="text-gray-300">}</span>')
      .replace(/\(/g, '<span class="text-gray-300">(</span>')
      .replace(/\)/g, '<span class="text-gray-300">)</span>')
      .replace(/;/g, '<span class="text-gray-300">;</span>')
      .replace(/,/g, '<span class="text-gray-300">,</span>')
      .replace(/'/g, '<span class="text-green-400">\'</span>');

    setHighlightedCode(highlighted);
    setIsVisible(true);
  }, []);

  const lines = codeExample.split('\n');

  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full rounded-lg overflow-hidden">
        <div className="flex flex-1 w-full h-full flex-col space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500 ml-4">weather-bot.ts</span>
          </div>
          
          <div className="relative">
            <motion.pre
              className="text-sm font-mono leading-relaxed overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {lines.map((line, index) => (
                <motion.div
                  key={`line-${index}-${line}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0, 
                    x: isVisible ? 0 : -20 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1 
                  }}
                  className="flex items-center"
                >
                  <span className="text-gray-500 w-8 text-right mr-4 select-none">
                    {index + 1}
                  </span>
                  <span className="flex-1">
                    {line}
                  </span>
                </motion.div>
              ))}
            </motion.pre>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
}
