import { Slider } from "@/components/ui/slider"

function OpenedYearFilter ({
  selection,
  options,
  onUpdate
}: {
  selection: { min: number, max: number }
  options: { min: number, max: number }
  onUpdate(value: { min: number, max: number }): void
}) {
  return (
    <div className="flex flex-col gap-2">
      <Slider
        min={options.min}
        max={options.max}
        value={[ selection.min, selection.max ]}
        onValueChange={(v) => {
          const min = v[0]
          const max = v[1]
          onUpdate({ min, max })
        }}

      />
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground text-xs">
          {selection.min}
        </span>
        <span className="text-muted-foreground text-xs">
          {selection.max}
        </span>
      </div>
    </div>
  )
}

export default OpenedYearFilter