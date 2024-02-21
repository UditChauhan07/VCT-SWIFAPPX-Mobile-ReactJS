import * as actionTypes from "./company.actionTypes";

export const companyInitialState = {
  company_id: null,
};

export const companyModule = (state = companyInitialState, action) => {
  switch (action.type) {
    case actionTypes.getCompanyId:
      return {
        ...state,
        company_id: action.payload,
      };
    default:
      return state;
  }
};
