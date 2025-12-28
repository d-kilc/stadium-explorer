import { useMemo, type CSSProperties } from "react"
import { Button } from "@/components//ui/button"
import { ChevronDown } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  type StadiumFilterOptions,
  type StadiumFilterSelection
} from "@/lib/types"
import { convertToTitleCase } from "@/lib/utils"

export function StadiumFilters({
  selection,
  options,
  onUpdateFilters
}: {
  selection: StadiumFilterSelection | null
  options: StadiumFilterOptions | null
  onUpdateFilters(key: string, value: any): void
}) {

  if (!options || !selection) return null
  return (
    <div className="flex gap-4 border border-border rounded-md bg-background p-2">
      <Popover>
        <PopoverTrigger>
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
          <RadioGroup
            value={selection.surfaceType}
            onValueChange={(v) => {
              onUpdateFilters("surfaceType", v)
            }}
          >
            {options.surfaceType.map((o) => (
              <div
                className="flex items-center gap-3"
                key={`surfacetype-${o}`}
              >
                <RadioGroupItem
                  value={o}
                  id={`surfacetype-${o}`}
                />
                <Label htmlFor={`surfacetype-${o}`}>
                  {convertToTitleCase(o)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
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
          <RadioGroup
            value={selection.roofType}
            onValueChange={(v) => {
              onUpdateFilters("roofType", v)
            }}
          >
            {options.roofType.map((o) => (
              <div
                className="flex items-center gap-3"
                key={`rooftype-${o}`}
              >
                <RadioGroupItem
                  id={`rooftype-${o}`}
                  value={o}
                />
                <Label htmlFor={`rooftype-${o}`}>
                  {convertToTitleCase(o)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer"
          >
            <span className="font-semibold">Opened:</span>
            <span className="text-muted-foreground">
              {selection.openedYear.startYear}-{selection.openedYear.endYear}
            </span>
            <ChevronDown/>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={10}>
          <div className="flex flex-col gap-2">
            <Slider
              min={options.openedYear.startYear}
              max={options.openedYear.endYear}
              value={[
                selection.openedYear.startYear,
                selection.openedYear.endYear
              ]}
              onValueChange={(v) => {
                const startYear = v[0]
                const endYear = v[1]
                onUpdateFilters("openedYear", { startYear, endYear })
              }}

            />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-xs">
                {selection.openedYear.startYear}
              </span>
              <span className="text-muted-foreground text-xs">
                {selection.openedYear.endYear}
              </span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}