import { type ReactNode } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export function SideDrawer({
  title,
  children,
  open,
  onClose
}: {
  title: string
  children: ReactNode
  open: boolean
  onClose(): void
}) {
  return (
    <div
      className={
        cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          open ? "w-md" : "w-0"
        )
      }
    >
      <div className="h-full w-full bg-background border-l border-border shadow-lg flex flex-col">
        {/* header with close button */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border flex-none">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* content area */}
        <div className="flex-1 overflow-y-auto p-4">
          { children }
        </div>
      </div>
    </div>
  )
}