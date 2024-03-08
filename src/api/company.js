import axios from "axios";
import { live } from "./liveLink";


export const getCompaniesList=async()=>{
    const response=await axios.post(`${live}/companies`);
    console.log(response.data);
    return response.data;
}
