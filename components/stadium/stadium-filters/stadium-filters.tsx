import { useState } from "react"

import { Button } from "@/components//ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import { RoofTypeFilter, SurfaceTypeFilter, OpenedYearFilter } from "./filters"

import { type StadiumFilterOptions, type StadiumFilterSelection } from "@/lib/types"
import { convertToTitleCase } from "@/lib/utils"

import { ChevronDown, Filter } from "lucide-react"

export function StadiumFilters({
  selection,
  options,
  onUpdateFilters
}: {
  selection: StadiumFilterSelection | null
  options: StadiumFilterOptions | null
  onUpdateFilters(key: string, value: any): void
}) {
  const [dialogOpen, setDialogOpen] = useState(false)

  if (!options || !selection) return null
  return (
    <>
      {/* desktop view - shown on screens md and above */}
      <div className="hidden md:block">
        <div className="flex flex-col md:flex-row gap-4 border border-border rounded-md bg-background p-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
              >
                <span className="font-semibold">Surface:</span>
                <span className="text-muted-foreground">
                  {convertToTitleCase(selection.surfaceType)}
                </span>
                <ChevronDown/>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-fit"
              align="start"
              sideOffset={10}
            >
              <SurfaceTypeFilter
                selection={selection.surfaceType}
                options={options.surfaceType}
                onUpdate={(value) => onUpdateFilters("surfaceType", value)}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
              >
                <span className="font-semibold">Roof:</span>
                <span className="text-muted-foreground">
                  {convertToTitleCase(selection.roofType)}
                </span>
                <ChevronDown/>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-fit"
              align="start"
              sideOffset={10}
            >
              <RoofTypeFilter
                selection={selection.roofType}
                options={options.roofType}
                onUpdate={(value) => onUpdateFilters("roofType", value)}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
              >
                <span className="font-semibold">Opened:</span>
                <span className="text-muted-foreground">
                  {selection.openedYear.min}-{selection.openedYear.max}
                </span>
                <ChevronDown/>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={10}>
              <OpenedYearFilter
                selection={{ min: selection.openedYear.min, max: selection.openedYear.max }}
                options={{ min: options.openedYear.min, max: options.openedYear.max }}
                onUpdate={(value) => onUpdateFilters("openedYear", value)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* mobile view - shown on screens md and below */}
      <div className="md:hidden">
        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="icon-lg"
              className="rounded-md text-foreground bg-background hover:bg-accent border-2 border-border"
            >
              <Filter/>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] sm:max-w-lg gap-6">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <Label>Surface Type</Label>
                  <SurfaceTypeFilter
                    selection={selection.surfaceType}
                    options={options.surfaceType}
                    onUpdate={(value) => onUpdateFilters("surfaceType", value)}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <Label>Roof Type</Label>
                  <RoofTypeFilter
                    selection={selection.roofType}
                    options={options.roofType}
                    onUpdate={(value) => onUpdateFilters("roofType", value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Opened Year</Label>
                <OpenedYearFilter
                  selection={{ min: selection.openedYear.min, max: selection.openedYear.max }}
                  options={{ min: options.openedYear.min, max: options.openedYear.max }}
                  onUpdate={(value) => onUpdateFilters("openedYear", value)}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}