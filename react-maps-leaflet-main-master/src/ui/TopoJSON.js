import React, { useRef, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import * as topojson from "topojson-client";

function TopoJSON(props) {
  const layerRef = useRef(null);
  const { data, ...defProps } = props;
  
  function addData(layer, jsonData) {
    if (jsonData.type === "FeatureCollection") {
      for (let key in jsonData.objects) {
        let geojson = topojson.feature(jsonData, jsonData.objects[key]);
        layer.addData(geojson);
      }
    } else {
      layer.addData(jsonData);
    }
  }

  useEffect(() => {
    const layer = layerRef.current.leafletElement;
    addData(layer, props.data);
  }, []);

  return <GeoJSON ref={layerRef} {...defProps} 
  style={(feature) => {
    return {
      fillColor: 'blue'
    }    
  }}
  onEachFeature={(feature, layer) => {
    layer.on({
      click: this.onGeographyClick
    })
  }}/>;
}

export default TopoJSON;
