import *  as actionTypes from "./company.actionTypes" 
export const getCompanyId=(id)=>{
    return{
        type: actionTypes.getCompanyId,
        payload:id,
    }
}
export const topBarPermission=(value)=>{
    return{
        type: actionTypes.getTopBarPermission,
        payload:value,
    }
}