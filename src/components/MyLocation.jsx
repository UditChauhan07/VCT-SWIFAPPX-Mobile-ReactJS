import React, { useState, useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";
import axios from "axios";

function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [address,setAddress]=useState();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setPosition({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        });
        handleAddress(coordinates.coords.latitude,coordinates.coords.longitude);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getLocation();
  }, []);

  const handleAddress = async (latitude,longitude) => {
    // const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
    // console.log(response.data.display_name);
    const response1 = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBS2lUMCNQ_zk3oxcIDBiZgSSZvUUFga2w`);
  console.log("response1",response1.data.results[0].formatted_address);

    setAddress(response1.data.results[0].formatted_address)
  };
  return (
    <div>
      {position.latitude && position.longitude ? (
        <p>
          Your Latitude: {position.latitude}, Longitude: {position.longitude}
          <br></br>
          Address: {address}
        </p>
      ) : (
        <p>{errorMessage || "Loading location..."}</p>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from 'react';

function MyLocation1() {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log({position});
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => setError("ppp"+error.message)
    );
    
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
          Latitude: {coords.latitude}, Longitude: {coords.longitude}
        </p>
      )}
    </div>
  );
}

// export default MyComponent;

export default MyLocation;
