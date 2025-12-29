import { useRef, useEffect, useMemo } from "react"
import MapboxMap, { type MapMouseEvent, type MapRef } from "react-map-gl/mapbox"

import ClusterLayer, { type ClusterLayerOptions } from "./layers/cluster-layer"
import { type LayerOptions } from "."
import { type GeoJSONFeature } from "mapbox-gl"
import { type GeoJsonProperties } from "geojson"

import { useTooltip } from "@/hooks"

import "mapbox-gl/dist/mapbox-gl.css"

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
const ZOOM_DURATION = 2000

export type MapLayer<TLayer> = {
  type: "cluster" // ...add others
  options: TLayer
}

function Map<
  TLayer = LayerOptions,
  TType extends GeoJsonProperties = GeoJsonProperties
>({
  mapStyle = "mapbox://styles/mapbox/light-v11",
  layers = [],
  interactiveLayerIds = [],
  zoom,
  center,
  renderTooltip,
  onMarkerClick
}: {
  mapStyle?: string
  layers?: MapLayer<TLayer>[]
  interactiveLayerIds: string[]
  zoom: number
  center: [number, number]
  renderTooltip?(properties: GeoJsonProperties): string
  onMarkerClick?(marker: GeoJSONFeature): void
}) {
  const mapRef = useRef<MapRef>(null)

  // if there is a focusOn value, zoom in on those coords
  // if not, go back to the default view
  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.flyTo({ center, zoom, duration: ZOOM_DURATION })
  }, [zoom, center])

  // tooltip management
  const { openTooltip, closeTooltip } = useTooltip({
    offset: 20,
    maxWidth: "500px",
    closeButton: false,
    className: "bg-background border-border"
  })

  const mapLayers = useMemo(() => {
    return layers.map((l, i) => {
      if (l.type === "cluster") {
        return (
          <ClusterLayer
            key={i}
            {...l.options as ClusterLayerOptions<TType>}
          />
        )
      }
      // ...build this out as different layer types are added
    })
  }, [layers])

  const handleClick = (event: MapMouseEvent) => {
    const map = mapRef.current
    if (!map || !onMarkerClick) return
    const features = map.queryRenderedFeatures(event.point)
    if (features.length > 0) {
      const clicked = features[0]
      const clickedLayerId = clicked.layer?.id
      if (!clickedLayerId) return
      if (interactiveLayerIds.includes(clickedLayerId)) {
        onMarkerClick(clicked)
      }
    }
  }

  const handleMouseEnter = (event: MapMouseEvent) => {
    const map = mapRef.current
    if (!map || !renderTooltip) return
    const features = map.queryRenderedFeatures(event.point)
    if (features.length > 0) {
      const hovered = features[0]
      const hoveredLayerId = hovered.layer?.id
      if (!hoveredLayerId) return
      if (interactiveLayerIds.includes(hoveredLayerId)) {
        // get hovered coordinates generate the tooltip content
        const coordinates = hovered.geometry.coordinates
        const content = renderTooltip(hovered.properties)
        openTooltip(
          coordinates as [number, number],
          content,
          map
        )
      }
    }
  }

  const handleMouseLeave = () => {
    if (renderTooltip) closeTooltip()
  }

  if (!token) {
    return <div>Error: Mapbox access token is not set</div>
  }
  return (
    <MapboxMap
      ref={mapRef}
      mapboxAccessToken={token}
      initialViewState={{
        zoom,
        longitude: center[0],
        latitude: center[1]
      }}
      style={{width: "100%", height: "100%"}}
      interactiveLayerIds={interactiveLayerIds}
      mapStyle={mapStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {mapLayers}
    </MapboxMap>
  )
}

export default Map