import * as actionTypes from "./company.actionTypes";

export const companyInitialState = {
  company_id: null,
  topBarPermission:null,
};

export const companyModule = (state = companyInitialState, action) => {
  switch (action.type) {
    case actionTypes.getCompanyId:
      return {
        ...state,
        company_id: action.payload,
      };
      case actionTypes.getTopBarPermission:
      return {
        ...state,
        topBarPermission: action.payload,
      };
    default:
      return state;
  }
};
