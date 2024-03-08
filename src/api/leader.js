import axios from "axios";
import { live } from "./liveLink";

export const updateQuantityOfServiceSubItem = async (id, quantity, accessToken) => {
  try {
    const response = await axios.post(`${live}/updateAddHocItem`, { id: `${id}`, quantity: `${quantity}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
export const toCheckServiceSubItem = async (id, quantity, type, accessToken) => {
  try {
    const response = await axios.post(`${live}/completeTask`, { id: `${id}`, quantity: `${quantity}`, type: `${type}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
export const toAddAdhocItem = async (workorder_id, category_id, item_id, quantity, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxAddItem`, { workorder_id, category_id, item_id, quantity, accessToken }, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
export const removeServiceSubItem = async (id, accessToken) => {
  try {
    const response = await axios.post(`${live}/removeAddHocItem`, { id: `${id}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
