import * as actionTypes from "./user.actionTypes";

export const userInitialState = {
  user_id: null,
  password:null
};

export const userModule = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.getUserId :
      return {
        ...state,
        user_id: action.payload,
      };
    default:
      return state;
  }
};
