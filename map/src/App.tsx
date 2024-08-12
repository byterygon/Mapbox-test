import { useEffect, useLayoutEffect, useState } from "react";
import { Map } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
function App() {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [zoom, setZoom] = useState(0);
  const [coord, setCoord] = useState<number[]>()
  useLayoutEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setCoord([longitude,latitude])
      });
    } else {
      setCoord([106.650690,10.792192])
    }
  },[])

  useEffect(() => {
    if (map) {
      map.on("zoom", () => {
        setZoom(map.getZoom());
      });
    }
  }, [map]);
 if(coord) return (
    <>
      <Map
        mapboxAccessToken="pk.eyJ1IjoidXlzb250cmFuIiwiYSI6ImNrcTB6Z25oNDA5dHoybm9rM2dxdDFyaDAifQ.lqacpkmmj9SAf7NNDYx9kQ"
        initialViewState={{
          longitude: coord[0],
          latitude: coord[1],
          zoom: 14,
        }}
        style={{ width: "100vw", height: "100vh", position: "relative" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onLoad={(e) => {
          setMap(e.target);
          setZoom(e.target.getZoom())
        }}
      >
        <div
          style={{ position: "absolute", backgroundColor: "white", height: 30, color:"black",zIndex:999 }}
        >
          zoom: {zoom}
        </div>
      </Map>
    </>
  );
}

export default App;
