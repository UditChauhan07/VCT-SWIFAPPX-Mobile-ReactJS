import *  as actionTypes from "./user.actionTypes" 
export const getUserId=(id)=>{
    return{
        type: actionTypes.getUserId,
        payload:id,
    }
}
export const getUserPassword=(password)=>{
    return{
        type: actionTypes.getUserPassword,
        payload:password,
    }
}
export const getUserDetails=(details)=>{
    return{
        type: actionTypes.getUserDetails,
        payload:details,
    }
}
export const getWorkerOrderDetail=(id)=>{
    return{
        type: actionTypes.getWorkerOrderDetail,
        payload:id,
    }
}