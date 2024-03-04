import * as actionTypes from "./user.actionTypes";

export const userInitialState = {
  user_id: null,
  password: null,
  details: null,
  workerOrderId: null,
  address:null,
};

export const userModule = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.getUserId:
      return {
        ...state,
        user_id: action.payload,
      };
    case actionTypes.getUserPassword:
      return {
        ...state,
        password: action.payload,
      };
    case actionTypes.getUserDetails:
      return {
        ...state,
        details: action.payload,
      };
    case actionTypes.getWorkerOrderDetail:
      return {
        ...state,
        workerOrderId: action.payload,
      };
      case actionTypes.getAddress:
        return {
          ...state,
          address: action.payload,
        };
    default:
      return state;
  }
};
