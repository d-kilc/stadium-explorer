import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { type SurfaceType } from "@/lib/types"

import { convertToTitleCase } from "@/lib/utils"

function SurfaceTypeFilter({
  selection,
  options,
  onUpdate
}: {
  selection: SurfaceType | "all"
  options: Array<SurfaceType | "all">
  onUpdate(type: SurfaceType | "all"): void
}) {
  return (
    <RadioGroup
      value={selection}
      onValueChange={(v) => {
        onUpdate(v as SurfaceType | "all")
      }}
    >
      {options.map((o) => (
        <div
          key={`surfacetype-${o}`}
          className="flex items-center gap-3"
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
  )
}

export default SurfaceTypeFilter