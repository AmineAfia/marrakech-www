// Tremor Raw Badge [v0.0.0]

import React from "react"
import { type VariantProps, tv } from "tailwind-variants"

import { cx } from "@/lib/utils"

const badgeVariants = tv({
  base: cx(
    "inline-flex items-center gap-x-1 whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-semibold ring-1",
  ),
  variants: {
    variant: {
      default: [
        "bg-blue-1 text-blue-9 ring-blue-7/30",
      ],
      neutral: [
        "bg-gray-1 text-gray-9 ring-gray-5/30",
      ],
      success: [
        "bg-green-1 text-green-9 ring-green-7/30",
      ],
      error: [
        "bg-red-1 text-red-9 ring-red-7/30",
      ],
      warning: [
        "bg-amber-1 text-amber-9 ring-amber-7/30",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface BadgeProps
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }: BadgeProps, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cx(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  },
)

Badge.displayName = "Badge"

export { Badge, badgeVariants, type BadgeProps }
