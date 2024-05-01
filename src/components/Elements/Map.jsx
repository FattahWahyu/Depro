/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '60vh'
};

function Map({ lat, lng }) {
  const center = {
    lat: lat,
    lng: lng
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // eslint-disable-next-line no-undef
    googleMapsApiKey: process.env.GOOGLE_MAP_API
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12} 
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} >
      </Marker>
    </GoogleMap>
  ) : <></>;
}

export default Map;
