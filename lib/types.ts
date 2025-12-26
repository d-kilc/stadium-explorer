import { type Feature, type Point } from "geojson"

export interface StadiumProperties {
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

export type StadiumFeature = Feature<Point, StadiumProperties>

