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
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
    console.log(response.data.display_name);
    setAddress(response.data.display_name)
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

export default MyLocation;
