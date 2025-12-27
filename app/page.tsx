"use client"
import { useState, useEffect, useMemo } from "react"
import { renderToString } from "react-dom/server"
import { useTheme } from "next-themes"

import Map, { type MapLayer } from "@/components/ui/map"
import { Placeholder } from "@/components/ui/placeholder"
import { SideDrawer } from "@/components/ui/side-drawer"
import { StadiumTooltip } from "@/components/stadium/stadium-tooltip"
import { StadiumCard } from "@/components/stadium/stadium-card"

import { type LayerOptions } from "@/components/ui/map"
import { type StadiumFeature, type Stadium } from "@/lib/types"
import { type FeatureCollection, type Point } from "geojson"
import { type GeoJSONFeature } from "mapbox-gl"

import { LoaderCircle } from "lucide-react"

import { pxToLongitudeOffset } from "@/lib/utils"
import { StadiumFilters } from "@/components/stadium/stadium-filters"

export default function Home() {
  const { theme } = useTheme()

  const [loading, setLoading] = useState(true)
  const [stadiums, setStadiums] = useState<FeatureCollection<Point, Stadium> | null>(null)
  const [selectedStadium, setSelectedStadium] = useState<StadiumFeature | null>(null)
  const [mapStyle, setMapStyle] = useState<string>(theme === "dark"
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/light-v11"
  )

  // fetch all stadiums on mount
  useEffect(() => {
    fetchStadiums()
  }, [])

  // toggle the map style URL as theme changes
  useEffect(() => {
    if (theme === "dark") setMapStyle("mapbox://styles/mapbox/dark-v11")
    else setMapStyle("mapbox://styles/mapbox/light-v11")
  }, [theme])

  // handler to fetch stadiums via api
  const fetchStadiums = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/stadiums")
      const data = await response.json()
      setStadiums(data)
    } catch (error) {
      console.error("Error fetching stadiums:", error)
      setStadiums(null)
    } finally {
      setLoading(false)
    }
  }

  // derive the map center and zoom from the selected stadium, or default values if null
  const { mapZoom, mapCenter } = useMemo(() => {
    let mapZoom: number, mapCenter: [number, number]
    if (!selectedStadium) {
      // default view
      mapCenter = [-95, 39.2]
      mapZoom = 3.85
    } else {
      const { coordinates } = selectedStadium.geometry
      const [longitude, latitude] = coordinates as [number, number]
      
      // shift longitude to the left to account for opening sidebar
      const longitudeOffset = pxToLongitudeOffset(80, 14, latitude)
      mapCenter = [longitude + longitudeOffset, latitude]
      mapZoom = 14
    }
    return { mapZoom, mapCenter }
  }, [selectedStadium])


  const mapLayers: MapLayer<LayerOptions>[] = useMemo(() => {
    let l: MapLayer<LayerOptions>[] = []
    if (stadiums) {
      l.push({
        type: "cluster",
        options: {
          id: "stadiums",
          data: stadiums,
          pointLabelLayout: {
            'text-field': '{name}',
            'text-size': 12,
            'text-justify': 'left',
            'text-anchor': 'left',
            'text-offset': [1, 0]
          },
          pointLabelPaint: {
            'text-color': theme === "dark"
              ? "#fff"
              : "#000"
          },
          pointPaint: {
            'circle-radius': 4,
            'circle-color': "#11b4da",
            'circle-stroke-width': 1,
            'circle-stroke-color': "#fff"
          },
          clusterPaint: {
            'circle-color': "#11b4da",
            'circle-radius': 20,
            'circle-stroke-width': 1,
            'circle-stroke-color': "#fff"
          },
          clusterCountLayout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14
          }
          // ... TODO other options here
        }
      })
    }
    return l
  }, [stadiums])

  const handleMarkerClick = (m: GeoJSONFeature) => {
    setSelectedStadium({
      type: "Feature",
      geometry: m.geometry as Point,
      properties: m.properties as Stadium
    })
  }

  // const renderStadiumTooltip = (s: Stadium) => (
  //   renderToString(<StadiumTooltip stadium={s}/>)
  // )

  return (
    <main className="w-full h-full relative flex">
      { loading && (
        <Placeholder className="absolute z-10 bg-black/50">
          <LoaderCircle
            className="animate-spin"
            width="40"
            height="40"
          />
        </Placeholder>
      )}
      <div className="flex-1 relative">
        <div className="absolute z-10 top-4 left-4">
          <StadiumFilters/>
        </div>
        <Map
          mapStyle={mapStyle}
          layers={mapLayers}
          interactiveLayerIds={mapLayers.flatMap(l => ([
            `${l.options.id}-unclustered-point`,
            `${l.options.id}-point-label`,
          ]))}
          // renderTooltip={renderStadiumTooltip}
          onMarkerClick={handleMarkerClick}
          zoom={mapZoom}
          center={mapCenter}
        />
      </div>
      <div
        className={
          `transition-all duration-300 ease-in-out overflow-hidden ${
          selectedStadium ? "w-full max-w-md" : "w-0"
        }`}
      >
        {selectedStadium && (
          <SideDrawer
            title={selectedStadium.properties.name}
            onClose={() => setSelectedStadium(null)}
          >
            <StadiumCard stadium={selectedStadium.properties}/>
          </SideDrawer>
        )}
      </div>
    </main>
  );
}