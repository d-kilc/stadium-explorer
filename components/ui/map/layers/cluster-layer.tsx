import { FeatureCollection, GeoJsonProperties, Point } from "geojson"
import { Source, Layer } from "react-map-gl/mapbox"

export type ClusterLayerOptions<TType> = {
  id: string
  data: FeatureCollection<Point, TType>
  clusterMaxZoom?: number
  clusterRadius?: number
  clusterPaint?: Record<string, any>
  pointPaint?: Record<string, any>
  pointLayout?: Record<string, any>
  clusterCountLayout?: Record<string, any>
  pointLabelLayout?: Record<string, any>
  pointLabelPaint?: Record<string, any>
}

export function ClusterLayer<TType extends GeoJsonProperties = GeoJsonProperties>({
  id,
  data,
  clusterMaxZoom = 14,
  clusterRadius = 50,
  clusterPaint = {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  },
  pointPaint = {
    'circle-color': '#11b4da',
    'circle-radius': 8,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  },
  pointLayout = {},
  clusterCountLayout = {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  },
  pointLabelPaint = {},
  pointLabelLayout = {}
}: ClusterLayerOptions<TType>) {
  return (
    <Source
      id={id}
      type="geojson"
      data={data}
      cluster={true}
      clusterMaxZoom={clusterMaxZoom}
      clusterRadius={clusterRadius}
    >
      <Layer
        id={`${id}-clusters`}
        type="circle"
        source={id}
        filter={["has", "point_count"]}
        paint={clusterPaint}
      />
      <Layer
        id={`${id}-cluster-count`}
        type="symbol"
        source={id}
        filter={["has", "point_count"]}
        layout={clusterCountLayout}
      />
      <Layer
        id={`${id}-unclustered-point`}
        type="circle"
        source={id}
        filter={['!', ['has', 'point_count']]}
        paint={pointPaint}
        layout={pointLayout}
      />
      <Layer
        id={`${id}-point-label`}
        type="symbol"
        source={id}
        filter={['!', ['has', 'point_count']]}
        paint={pointLabelPaint}
        layout={pointLabelLayout}
      />
    </Source>
  )
}

export default ClusterLayer