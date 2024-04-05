import { Geolocation } from "@capacitor/geolocation";
import axios from "axios";
import { config } from "dotenv";
config();

export const getCurrentAddress = async (latitude, longitude) => {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
  return response.data.results[0].formatted_address;
};
export const getLatLongParameters = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  // console.log(coordinates);
  return {
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude,
  };
};
