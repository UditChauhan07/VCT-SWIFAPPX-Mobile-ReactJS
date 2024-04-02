import React, { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setPosition({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      {position.latitude && position.longitude ? (
        <p>
          Your Latitude: {position.latitude}, Longitude: {position.longitude}
        </p>
      ) : (
        <p>{errorMessage || 'Loading location...'}</p>
      )}
    </div>
  );
}

export default MyLocation;
