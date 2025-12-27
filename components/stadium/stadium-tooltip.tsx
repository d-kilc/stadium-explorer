import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { type Stadium } from "@/lib/types"

export function StadiumTooltip({
  stadium
}: {
  stadium: Stadium
}) {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>
          {stadium.name}
        </ItemTitle>
        <ItemDescription className="text-xs">
          {stadium.team}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}