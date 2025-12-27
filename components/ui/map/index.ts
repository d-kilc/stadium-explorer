import Map, { type MapLayer } from "./map"
import ClusterLayer, { type ClusterLayerOptions } from "./layers/cluster-layer"
import { GeoJsonProperties } from "geojson"


export default Map
export {
  type MapLayer,
  ClusterLayer
}

export type LayerOptions = ClusterLayerOptions<GeoJsonProperties>
  // | ...others