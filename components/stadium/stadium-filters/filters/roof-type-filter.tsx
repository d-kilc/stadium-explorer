import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { type RoofType } from "@/lib/types"

import { convertToTitleCase } from "@/lib/utils"

function RoofTypeFilter({
  selection,
  options,
  onUpdate
}: {
  selection: RoofType | "all"
  options: Array<RoofType | "all">
  onUpdate(type: RoofType | "all"): void
}) {
  return (
    <RadioGroup
      value={selection}
      onValueChange={(v) => {
        onUpdate(v as RoofType | "all")
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

export default RoofTypeFilter