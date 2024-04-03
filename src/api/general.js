import { Geolocation } from "@capacitor/geolocation";
import axios from "axios";

export const getCurrentAddress = async (latitude, longitude) => {
  const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
  console.log(response.data.display_name);
  return response.data.display_name;
};
export const getLatLongParameters = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  console.log(coordinates);
  return {
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude,
  };
};
