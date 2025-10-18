"use client";

import { forwardRef, useRef } from "react";
import { motion } from "framer-motion";
import { IconUser, IconMessage, IconTool, IconCheck, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export function SkeletonUserBehavior() {
  const containerRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLDivElement>(null)
  const tool1Ref = useRef<HTMLDivElement>(null)
  const tool2Ref = useRef<HTMLDivElement>(null)
  const tool3Ref = useRef<HTMLDivElement>(null)
  const response1Ref = useRef<HTMLDivElement>(null)
  const response2Ref = useRef<HTMLDivElement>(null)
  const response3Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="grid grid-cols-4 gap-8 w-full max-w-4xl h-full items-center">
        {/* Column 1: User */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0 }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex flex-col items-center gap-2"
          >
            <Circle ref={userRef}>
              <IconUser className="h-6 w-6 text-neutral-700" />
            </Circle>
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              User
            </span>
          </motion.div>
        </div>

        {/* Column 2: Prompt Hub */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex flex-col items-center gap-2"
          >
            <Circle ref={promptRef} className="size-16">
              <IconMessage className="h-8 w-8 text-neutral-700" />
            </Circle>
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Prompt
            </span>
          </motion.div>
        </div>

        {/* Column 3: Tools */}
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Tool 1 (Success) - moved to top to align with Response 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex flex-col items-center gap-2"
          >
            <Circle ref={tool1Ref} className="border-green-500">
              <IconCheck className="h-6 w-6 text-green-600" />
            </Circle>
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Tool Call ✓
            </span>
          </motion.div>

          {/* Tool 2 (Failed) - stays in middle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex flex-col items-center gap-2"
          >
            <Circle ref={tool2Ref} className="border-red-500">
              <IconX className="h-6 w-6 text-red-600" />
            </Circle>
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Tool Call ✗
            </span>
          </motion.div>

          {/* Tool 3 (Success) - moved to bottom to align with Response 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex flex-col items-center gap-2"
          >
            <Circle ref={tool3Ref} className="border-green-500">
              <IconCheck className="h-6 w-6 text-green-600" />
            </Circle>
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Tool Call ✓
            </span>
          </motion.div>
        </div>

        {/* Column 4: Responses */}
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Response 1 (for Tool 1 - Success) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.5 }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex flex-col items-center gap-2"
          >
            <Circle ref={response1Ref}>
              <IconCheck className="h-6 w-6 text-neutral-700" />
            </Circle>
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Success
            </span>
          </motion.div>

          {/* Response 2 (for Tool 2 - Failed) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.6 }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex flex-col items-center gap-2"
          >
            <Circle ref={response2Ref} className="border-red-500">
              <IconX className="h-6 w-6 text-red-600" />
            </Circle>
            <span className="text-xs font-medium text-red-600 dark:text-red-400">
              Failed
            </span>
          </motion.div>

          {/* Response 3 (for Tool 3 - Success) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.7 }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex flex-col items-center gap-2"
          >
            <Circle ref={response3Ref}>
              <IconCheck className="h-6 w-6 text-neutral-700" />
            </Circle>
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Success
            </span>
          </motion.div>
        </div>
      </div>

      {/* Animated Beams - Multi-Tool Network */}
      
      {/* User ↔ Prompt Hub - Bidirectional beam */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={promptRef}
        curvature={-30}
        endYOffset={-10}
        gradientStartColor="#3b82f6"
        gradientStopColor="#8b5cf6"
        delay={0.5}
        duration={4}
        reverse={false}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={promptRef}
        curvature={-30}
        endYOffset={-10}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#3b82f6"
        delay={4.5}
        duration={4}
        reverse={true}
      />
      
      {/* Prompt → Tool 1 (Success) - Green gradient - now at top */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={promptRef}
        toRef={tool1Ref}
        curvature={-80}
        endYOffset={-15}
        gradientStartColor="#10b981"
        gradientStopColor="#8b5cf6"
        delay={0.8}
        duration={5}
        reverse={false}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={promptRef}
        toRef={tool1Ref}
        curvature={-80}
        endYOffset={-15}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#10b981"
        delay={5.8}
        duration={5}
        reverse={true}
      />
      
      {/* Prompt → Tool 2 (Failed) - Orange/Red gradient - straight line */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={promptRef}
        toRef={tool2Ref}
        curvature={0}
        gradientStartColor="#f59e0b"
        gradientStopColor="#ef4444"
        delay={1.0}
        duration={4}
        reverse={false}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={promptRef}
        toRef={tool2Ref}
        curvature={0}
        gradientStartColor="#ef4444"
        gradientStopColor="#f59e0b"
        delay={5.0}
        duration={4}
        reverse={true}
      />
      
      {/* Prompt → Tool 3 (Success) - Green gradient - now at bottom */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={promptRef}
        toRef={tool3Ref}
        curvature={80}
        endYOffset={15}
        gradientStartColor="#10b981"
        gradientStopColor="#8b5cf6"
        delay={1.2}
        duration={5}
        reverse={false}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={promptRef}
        toRef={tool3Ref}
        curvature={80}
        endYOffset={15}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#10b981"
        delay={6.2}
        duration={5}
        reverse={true}
      />
      
      {/* Tool 1 → Response 1 (Success) - Purple gradient - direct alignment */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tool1Ref}
        toRef={response1Ref}
        curvature={0}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#ec4899"
        delay={2.0}
        duration={3.5}
        reverse={false}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tool1Ref}
        toRef={response1Ref}
        curvature={0}
        gradientStartColor="#ec4899"
        gradientStopColor="#8b5cf6"
        delay={5.5}
        duration={3.5}
        reverse={true}
      />
      
      {/* Tool 2 → Response 2 (Failed) - Red gradient - direct alignment */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tool2Ref}
        toRef={response2Ref}
        curvature={0}
        gradientStartColor="#ef4444"
        gradientStopColor="#dc2626"
        delay={2.1}
        duration={3.5}
        reverse={false}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tool2Ref}
        toRef={response2Ref}
        curvature={0}
        gradientStartColor="#dc2626"
        gradientStopColor="#ef4444"
        delay={5.6}
        duration={3.5}
        reverse={true}
      />
      
      {/* Tool 3 → Response 3 (Success) - Purple gradient - direct alignment */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tool3Ref}
        toRef={response3Ref}
        curvature={0}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#ec4899"
        delay={2.2}
        duration={3.5}
        reverse={false}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tool3Ref}
        toRef={response3Ref}
        curvature={0}
        gradientStartColor="#ec4899"
        gradientStopColor="#8b5cf6"
        delay={5.7}
        duration={3.5}
        reverse={true}
      />
    </div>
  );
}
