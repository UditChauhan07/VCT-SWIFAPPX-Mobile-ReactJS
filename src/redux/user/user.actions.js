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