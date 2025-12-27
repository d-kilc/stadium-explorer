import { Button } from "@/components//ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export function StadiumFilters() {
  return (
    <div className="flex gap-4 border border-border rounded-md bg-background p-2">
      <Popover>
        <PopoverTrigger>
          <Button
            variant="ghost"
            size="sm"
            onClick={console.log}
            className="cursor-pointer"
          >
            <span>Surface:</span>
            <span className="text-muted-foreground">All</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <span>hello world</span>
        </PopoverContent>
      </Popover>
      {/* <Separator orientation="vertical"/> */}
      <Popover>
        <PopoverTrigger>
          <Button
            variant="ghost"
            size="sm"
            onClick={console.log}
            className="cursor-pointer"
          >
            <span>Roof:</span>
            <span className="text-muted-foreground">All</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <span>hello world</span>
        </PopoverContent>
      </Popover>
      {/* <Separator orientation="vertical"/> */}
      <Popover>
        <PopoverTrigger>
          <Button
            variant="ghost"
            size="sm"
            onClick={console.log}
            className="cursor-pointer"
          >
            <span>Opened:</span>
            <span className="text-muted-foreground">1912-Present</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <span>hello world</span>
        </PopoverContent>
      </Popover>
    </div>
  )
}``