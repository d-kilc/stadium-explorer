import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function renderInt(int: number) {
  return int.toLocaleString()
}

// helper function to convert rem to longitude degrees offset
export function pxToLongitudeOffset(px: number, zoom: number, latitude: number) {  
  // convert pixels to meters using web mercator projection
  // at zoom z, 1 pixel = (40075016.686 / (256 * 2^z)) meters
  const metersPerPixel = 40075016.686 / (256 * Math.pow(2, zoom))
  const meters = px * metersPerPixel
  
  // convert meters to longitude degrees
  // at a given latitude, 1 degree longitude = 111320 * cos(latitude in radians) meters
  const latitudeRad = (latitude * Math.PI) / 180
  const metersPerDegree = 111320 * Math.cos(latitudeRad)
  const degrees = meters / metersPerDegree
  return degrees
}