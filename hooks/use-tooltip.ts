import { useRef } from "react"
import { Popup, PopupOptions } from "mapbox-gl"
import { MapRef} from "react-map-gl/mapbox"

// custom hook to manage the state of map tooltips 
function useTooltip(options: PopupOptions) {
  // dummy tooltip which we'll show and hide, replacing the content/location as we do so
  const tooltipRef = useRef(new Popup(options))

  // update tooltip location and content, and add to the given map instance
  const openTooltip = (
    lngLat: [number, number],
    content: string,
    mapRef: MapRef
  ) => {
    const current = mapRef.getMap()
    if (!current) return
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