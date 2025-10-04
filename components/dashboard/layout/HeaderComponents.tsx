"use client"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell } from "@/components/icons/bell"
import { Gear } from "@/components/icons/gear"

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={cn("relative hidden lg:block", className)}>
      <Input type="search" placeholder="Search..." className="w-64 h-8 text-xs" />
    </div>
  )
}

interface ActionButtonsProps {
  className?: string
}

export function ActionButtons({ className }: ActionButtonsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button variant="ghost" size="icon-sm" className="relative" aria-label="Notifications">
        <Bell className="size-4" />
        <span className="absolute top-1 right-1 size-2 bg-destructive rounded-full" />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Settings">
        <Gear className="size-4" />
      </Button>
    </div>
  )
}
