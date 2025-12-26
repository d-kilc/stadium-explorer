import { type ReactNode, useRef } from "react"
import { Popup } from "mapbox-gl"
import MapGL, { type MapRef, Marker } from "react-map-gl/mapbox"
import { type Feature, type Point } from "geojson"
import "mapbox-gl/dist/mapbox-gl.css"
import { MapPin } from "lucide-react"

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export type TMapMarker = {
  icon?: ReactNode
  feature: Feature<Point, any>
}

export function Map({
  markers = [],
  renderMarkerPopup,
}: {
  markers?: TMapMarker[]
  renderMarkerPopup?: (marker: TMapMarker) => Popup
}) {
  const mapRef = useRef<MapRef>(null)

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
      onClick={(event) => {
        console.log("map click", event)
      }}
    >
      {markers.map((m, i) => (
        <Marker
          key={`marker-${i}`}
          longitude={m.feature.geometry.coordinates[0]}
          latitude={m.feature.geometry.coordinates[1]}
          className="cursor-pointer"
          anchor="bottom"
        >
          <div
            onMouseOver={(event) => {
              console.log("marker mouseover", event)
              const popup = new Popup({
                className: 'my-class',
                closeOnClick: false
              })
                .setLngLat([
                  m.feature.geometry.coordinates[0],
                  m.feature.geometry.coordinates[1]
                ])
                .setHTML("<h1>Hello World!</h1>")
                .setMaxWidth("300px")
              const map = mapRef.current?.getMap()
              if (map) {
                popup.addTo(map)
              }
            }}
            onMouseLeave={() => {

            }}
          >
            { m.icon ?? <MapPin/> }
          </div>
        </Marker>
      ))}
    </MapGL>
  )
}