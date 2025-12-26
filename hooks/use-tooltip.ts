import { useRef } from "react"
import { Popup } from "mapbox-gl"
import { MapRef} from "react-map-gl/mapbox"

// custom hook to manage the state of map tooltips 
function useTooltip(
  offset: number = 20,
  maxWidth: string = "300px"
) {
  // dummy tooltip which we'll show and hide, replacing the content/location as we do so
  const tooltipRef = useRef(new Popup({ offset, maxWidth }))

  // update tooltip location and content, and add to the given map instance
  const openTooltip = (
    lngLat: [number, number],
    content: string,
    mapRef: MapRef
  ) => {
    console.log("lngLat", lngLat)
    console.log("content", content)
    const current = mapRef.getMap()
    if (!current) {
      console.log("no current map found. returning")
      return
    }
    tooltipRef.current
      .setLngLat(lngLat)
      .setHTML(content)
      .addTo(current)
  } 

  // remove the tooltip
  const closeTooltip = () => tooltipRef.current.remove()

  return { openTooltip, closeTooltip }
}

export default useTooltip