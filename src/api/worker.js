import axios from "axios";

export const live = "https://dev.swif.in/api";

export const workerLogin = async (userName, password, company_id) => {
  const response = await axios
    .post(`${live}/wxlogin`, { username: userName, password, company_id: `${company_id}` })
    .then((response) => {
      // Handle successful response
      console.log(response.data);
    })
    .catch((error) => {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log("Error response status:", error.response.status);
        console.log("Error response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
      }
      console.log("Error config:", error.config);
    });
  console.log(response);
  if (response.status == 401) {
    console.log(response);
    return null;
  } else return response.data;
};
