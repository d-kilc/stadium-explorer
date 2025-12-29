import { type Feature, type Point } from "geojson"

export type Stadium =  {
  id: string;
  team: string;
  name: string;
  league: string;
  neighborhood?: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  openedYear: number;
  surfaceType: string;
  roofType: string;
  image: string;
  wikipediaUrl: string;
}

export type StadiumFeature = Feature<Point, Stadium>

export type StadiumFilterOptions = {
  openedYear: { min: number, max: number }
  surfaceType: Array<SurfaceType | "all">
  roofType: Array<RoofType | "all">
}

export type StadiumFilterSelection = {
  openedYear: { min: number, max: number }
  surfaceType: SurfaceType | "all"
  roofType: RoofType | "all"
}


export type SurfaceType = "grass" | "turf"

export type RoofType = "open" | "dome" | "retractable"