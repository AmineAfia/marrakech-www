"use client"

import { Button } from "@/components/Button"
import { cx, focusRing } from "@/lib/utils"
import { RiMore2Fill } from "@remixicon/react"

import { DropdownUserProfile } from "./DropdownUserProfile"

export const UserProfileDesktop = () => {
  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          focusRing,
          "group flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-fg hover:bg-surface-hover data-[state=open]:bg-surface-hover",
        )}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs text-fg"
            aria-hidden="true"
          >
            ES
          </span>
          <span>Emma Stone</span>
        </span>
        <RiMore2Fill
          className="size-4 shrink-0 text-fg-muted group-hover:text-fg"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  )
}

export const UserProfileMobile = () => {
  return (
    <DropdownUserProfile align="end">
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex items-center rounded-md p-1 text-sm font-medium text-fg hover:bg-surface-hover data-[state=open]:bg-surface-hover",
        )}
      >
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs text-fg"
          aria-hidden="true"
        >
          ES
        </span>
      </Button>
    </DropdownUserProfile>
  )
}
