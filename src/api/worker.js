import axios from "axios";

export const live = "https://dev.swif.in/api";

export const workerLogin = async (userName, password, company_id) => {
  // console.log("userName, password, company_id", userName, password, `${company_id}`);
  const response = await axios.post(`${live}/wxlogin`, { username: userName, password, company_id: `${company_id}` });
  // console.log(response);
  return response.data;
};
