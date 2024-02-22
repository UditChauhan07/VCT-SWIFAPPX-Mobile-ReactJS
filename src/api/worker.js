import axios from "axios";

export const live = "https://dev.swif.in/api";

export const workerLogin = async (userName, password) => {
  const response = await axios.post(`${live}/wxlogin`, { username: userName, password, company_id: "53" });
  console.log(response.data);
  return response.data;
};
