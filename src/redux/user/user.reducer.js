import * as actionTypes from "./user.actionTypes";

export const userInitialState = {
  user_id: null,
  password:null,
  details:null
};

export const userModule = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.getUserId :
      return {
        ...state,
        user_id: action.payload,
      };
      case actionTypes.getUserPassword :
      return {
        ...state,
        password: action.payload,
      };
      case actionTypes.getUserDetails :
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
};
