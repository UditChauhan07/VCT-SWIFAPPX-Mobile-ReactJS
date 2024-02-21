import *  as actionTypes from "./company.actionTypes" 
export const getCompanyId=(id)=>{
    return{
        type: actionTypes.getCompanyId,
        payload:id,
    }
}