"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Map, type TMapMarker } from "@/components/ui/map"
import { Placeholder } from "@/components/ui/placeholder"
import { Popup } from "react-map-gl/mapbox"
import { type Popup as TPopup } from "mapbox-gl"

import { type StadiumFeature } from "@/lib/types"
import { LoaderCircle } from "lucide-react"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [stadiums, setStadiums] = useState<StadiumFeature[] | null>(null)

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

  // fetch all stadiums on mount
  useEffect(() => {
    fetchStadiums()
  }, [])

  const mapMarkers: TMapMarker[] | null = useMemo(() => {
    if (!stadiums) return null
    return stadiums.map((s) => ({ feature: s }))
  }, [stadiums])

  // const renderStadiumPopup = (m: TMapMarker) => {
  //   return (
  //     <Popup></Popup>
  //   )
  // } 

  return (
    <main className="w-full h-full relative">
      { loading && (
        <Placeholder className="absolute z-10 bg-black/50">
          <LoaderCircle className="animate-spin" width="40" height="40"/>
        </Placeholder>
      )}
      <Map markers={mapMarkers ?? []}/>
    </main>
  );
}
