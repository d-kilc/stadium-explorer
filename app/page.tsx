"use client"

import { useState, useEffect, useMemo } from "react"
import Map, { type TMapMarker } from "@/components/ui/map"
import { Placeholder } from "@/components/ui/placeholder"

import { type StadiumFeature, type Stadium } from "@/lib/types"
import { LoaderCircle } from "lucide-react"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [stadiums, setStadiums] = useState<StadiumFeature[] | null>(null)

  // fetch all stadiums on mount
  useEffect(() => {
    fetchStadiums()
  }, [])

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

  // format StadiumFeatures into TMapMarkers to pass to map component 
  const mapMarkers: TMapMarker<Stadium>[] | null = useMemo(() => {
    if (!stadiums) return null
    return stadiums.map((s) => ({ feature: s }))
  }, [stadiums])

  
  const renderStadiumTooltip = (m: TMapMarker<Stadium>) => {
    return `
      <h1>${m.feature.properties.name}</h1>
    `
  } 

  return (
    <main className="w-full h-full relative">
      { loading && (
        <Placeholder className="absolute z-10 bg-black/50">
          <LoaderCircle className="animate-spin" width="40" height="40"/>
        </Placeholder>
      )}
      <Map
        markers={mapMarkers ?? []}
        renderTooltip={renderStadiumTooltip}
      />
    </main>
  );
}
