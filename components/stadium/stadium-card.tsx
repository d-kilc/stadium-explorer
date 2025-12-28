import { type Stadium } from "@/lib/types"
import Image from "next/image"

import { convertToTitleCase, renderInt } from "@/lib/utils"
import { Button } from "../ui/button"

export function StadiumCard({
  stadium
}: {
  stadium: Stadium
}) {
  console.log("stadium", stadium)

  const renderLocation = () => {
    let locationArr = []
    if (stadium.neighborhood) locationArr.push(stadium.neighborhood)
    locationArr.push(stadium.city)
    locationArr.push(stadium.state)
    locationArr.push(stadium.country)
    return locationArr.join(", ")
  }

  return (
    <>
    <Image
      loader={() => stadium.image}
      src={stadium.image}
      alt={`Image of ${stadium.name}`}
      width={10000000}
      height={600000000}
      className="w-full h-auto border-border border-2 rounded-md"
    />
    <div className="grid grid-cols-2 gap-4 pt-4">
      <div className="flex flex-col gap-0">
        <span className="text-xs text-muted-foreground font-semibold">Team</span>
        <span>{stadium.team}</span>
      </div>
      <div className="flex flex-col gap-0">
        <span className="text-xs text-muted-foreground font-semibold">Location</span>
        <span>{renderLocation()}</span>
      </div>
      <div className="flex flex-col gap-0">
        <span className="text-xs text-muted-foreground font-semibold">Opened</span>
        <span>{stadium.openedYear}</span>
      </div>
      <div className="flex flex-col gap-0">
        <span className="text-xs text-muted-foreground font-semibold">Capacity</span>
        <span>{renderInt(stadium.capacity)}</span>
      </div>
      <div className="flex flex-col gap-0">
        <span className="text-xs text-muted-foreground font-semibold">Surface</span>
        <span>{convertToTitleCase(stadium.surfaceType)}</span>
      </div>
      <div className="flex flex-col gap-0">
        <span className="text-xs text-muted-foreground font-semibold">Wikipedia</span>
        <span>
          <Button variant="link" className="p-0" asChild>
            <a className="!inline !text-base" href={stadium.wikipediaUrl} target="_blank">Read More</a>
          </Button>
        </span>
      </div>
    </div>
    </>
  )
}