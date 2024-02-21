import axios from "axios";

export const live="https://dev.swif.in/api";

export const getCompaniesList=async()=>{
    const response=await axios.post(`${live}/companies`);
    // console.log(response.data);
    return response.data;
}