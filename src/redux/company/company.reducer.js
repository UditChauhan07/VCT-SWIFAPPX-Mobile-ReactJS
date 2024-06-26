import * as actionTypes from "./company.actionTypes";

export const companyInitialState = {
  company_id: null,
  company_name: null,
  topBarPermission: null,
  tax: null,
  company_logo: null,
  company_details: null,
};

export const companyModule = (state = companyInitialState, action) => {
  switch (action.type) {
    case actionTypes.getCompanyId:
      return {
        ...state,
        company_id: action.payload,
      };
    case actionTypes.getCompanyName:
      return {
        ...state,
        company_name: action.payload,
      };
    case actionTypes.getTopBarPermission:
      return {
        ...state,
        topBarPermission: action.payload,
      };
    case actionTypes.getTaxValue:
      return {
        ...state,
        tax: action.payload,
      };
    case actionTypes.companyLogo:
      return {
        ...state,
        company_logo: action.payload,
      };
    case actionTypes.companyDetails:
      return {
        ...state,
        company_details: action.payload,
      };
    case actionTypes.companyLogout:
      return companyInitialState;
    default:
      return state;
  }
};
