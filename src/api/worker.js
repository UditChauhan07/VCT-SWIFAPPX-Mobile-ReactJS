import axios from "axios";

export const live = "https://dev.swif.in/api";

export const workerLogin = async (userName, password, company_id) => {
  try {
    const response = await axios.post(`${live}/wxlogin`, { username: userName, password, company_id: `${company_id}` });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const workOrderList = async (day, month, year, accessToken) => {
  try {
    const response = await axios.post(`${live}/wxWorkerOrderList`, { day: `${day}`, month: `${month}`, year: `${year}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
export const workOrderWorkersStart = async (workorder_id, time, accessToken) => {
  console.log("hihih",workorder_id, time, accessToken);
  try {
    const response = await axios.post(`${live}/wxWorkOrderWorkersStart`, { workorder_id: `${workorder_id}`, time: `${time}` }, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
};
