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
export const taxValueOfCompany=(value)=>{
    return{
        type: actionTypes.getTaxValue,
        payload:value,
    }
}
export const getLogoCompany=(value)=>{
    return{
        type: actionTypes.companyLogo,
        payload:value,
    }
}
export const companyLogout=()=>{
    return{
        type: actionTypes.companyLogout,
    }
}