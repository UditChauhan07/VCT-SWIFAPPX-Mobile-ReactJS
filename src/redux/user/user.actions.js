import *  as actionTypes from "./user.actionTypes" 
export const getUserId=(id)=>{
    return{
        type: actionTypes.getUserId,
        payload:id,
    }
}