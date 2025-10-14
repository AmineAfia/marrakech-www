// Tremor Raw ProgressCircle [v0.0.1]

import React from "react"
import { VariantProps, tv } from "tailwind-variants"

import { cx } from "@/lib/utils"

const progressCircleVariants = tv({
  slots: {
    background: "",
    circle: "",
  },
  variants: {
    variant: {
      default: {
        background: "stroke-blue-1",
        circle: "stroke-brand",
      },
      neutral: {
        background: "stroke-gray-2",
        circle: "stroke-gray-5",
      },
      warning: {
        background: "stroke-amber-1",
        circle: "stroke-amber-7",
      },
      error: {
        background: "stroke-red-1",
        circle: "stroke-danger",
      },
      success: {
        background: "stroke-green-1",
        circle: "stroke-success",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ProgressCircleProps
  extends Omit<React.SVGProps<SVGSVGElement>, "value">,
    VariantProps<typeof progressCircleVariants> {
  value?: number
  max?: number
  showAnimation?: boolean
  radius?: number
  strokeWidth?: number
  children?: React.ReactNode
}

const ProgressCircle = React.forwardRef<SVGSVGElement, ProgressCircleProps>(
  (
    {
      value = 0,
      max = 100,
      radius = 32,
      strokeWidth = 6,
      showAnimation = true,
      variant,
      className,
      children,
      ...props
    }: ProgressCircleProps,
    forwardedRef,
  ) => {
    const safeValue = Math.min(max, Math.max(value, 0))
    const normalizedRadius = radius - strokeWidth / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const offset = circumference - (safeValue / max) * circumference

    const { background, circle } = progressCircleVariants({ variant })
    return (
      <>
        <div className={cx("relative")}>
          <svg
            ref={forwardedRef}
            width={radius * 2}
            height={radius * 2}
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            className={cx("-rotate-90 transform", className)}
            role="progress circle"
            aria-label="progress bar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            data-max={max}
            data-value={safeValue ?? null}
            {...props}
          >
            <circle
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
              stroke=""
              strokeLinecap="round"
              className={cx("transition-colors ease-linear", background())}
            />
            {safeValue >= 0 ? (
              <circle
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                fill="transparent"
                stroke=""
                strokeLinecap="round"
                className={cx(
                  "transition-colors ease-linear",
                  circle(),
                  showAnimation &&
                    "transform-gpu transition-all duration-300 ease-in-out",
                )}
              />
            ) : null}
          </svg>
          <div
            className={cx("absolute inset-0 flex items-center justify-center")}
          >
            {children}
          </div>
        </div>
      </>
    )
  },
)

ProgressCircle.displayName = "ProgressCircle"

export { ProgressCircle, type ProgressCircleProps }
