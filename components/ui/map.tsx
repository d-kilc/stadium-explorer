import { type ReactNode, useRef } from "react"
import MapGL, { Marker, type MapRef } from "react-map-gl/mapbox"
import { type Feature, type Point } from "geojson"
import "mapbox-gl/dist/mapbox-gl.css"
import { MapPin } from "lucide-react"

import { useTooltip } from "@/hooks"

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export type TMapMarker<T> = {
  icon?: ReactNode
  feature: Feature<Point, T>
}

function Map({
  markers = [],
  renderTooltip,
}: {
  markers?: TMapMarker<any>[]
  renderTooltip?: (marker: TMapMarker<any>) => string
}) {
  const mapRef = useRef<MapRef>(null)
  const { openTooltip, closeTooltip } = useTooltip()

  const handleMarkerMouseEnter = (marker: TMapMarker<any>) => {
    // get current map instance and return if it's not set
    const map = mapRef.current
    if (!map || !renderTooltip) return

    // get hovered coordinates generate the tooltip content
    const coordinates = marker.feature.geometry.coordinates
    const content = renderTooltip(marker)
    openTooltip(
      coordinates as [number, number],
      content,
      map
    )
  }

  if (!token) {
    return <div>Error: Mapbox access token is not set</div>
  }
  return (
    <MapGL
      ref={mapRef}
      mapboxAccessToken={token}
      initialViewState={{zoom: 1}}
      style={{width: "100%", height: "100%"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      // southwest, northeast (lng, lat)
      maxBounds={[[-130, 22],[-60, 53]]}
    >
      {markers.map((m, i) => (
        <MapMarker
          key={`marker-${i}`}
          data={m}
          onMouseEnter={() => handleMarkerMouseEnter(m)}
          onMouseLeave={closeTooltip}
        />
      ))}
    </MapGL>
  )
}

export function MapMarker({
  data,
  onMouseEnter,
  onMouseLeave
}: {
  data: TMapMarker<any>,
  onMouseEnter(): void
  onMouseLeave(): void
}) {
  return (
    <Marker
      longitude={data.feature.geometry.coordinates[0]}
      latitude={data.feature.geometry.coordinates[1]}
      className="cursor-pointer"
      anchor="bottom"
    >
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        { data.icon ?? <MapPin/> }
      </div>
    </Marker>
  )
} 

export default Map