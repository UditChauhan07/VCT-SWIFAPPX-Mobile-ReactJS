import { updateObject } from "../../utils/updation";
import * as actionTypes from "./user.actionTypes";

export const userInitialState = {
  user_id: null,
  password: null,
  details: null,
  workerOrderId: null,
  address: null,
  // adhocItems: [],
  // serviceItems: [],
  cancelWO: {},
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
    case actionTypes.cancelWO:
      return {
        ...state,
        cancelWO: action.payload,
      };
    case actionTypes.logout:
      return userInitialState;
    // case actionTypes.selectedAdhocItems:
    //   if (Array.isArray(state.adhocItems)) {
    //     return {
    //       ...state,
    //       adhocItems: [...state.adhocItems, action.payload],
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       adhocItems: [action.payload],
    //     };
    //   }
    // case actionTypes.updateAdhocItem:
    //   if (Array.isArray(state.adhocItems)) {
    //     // // console.log("jiji");
    //     let arrayOfObjects = updateObject(state.adhocItems, action.payload);
    //     // console.log("hi", arrayOfObjects);
    //     return {
    //       ...state,
    //       adhocItems: [...arrayOfObjects],
    //       // adhocItems:[...state.adhocItems,action.payload]
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       adhocItems: [action.payload],
    //     };
    //   }
    // case actionTypes.removeAdhocItem:
    //   return {
    //     ...state,
    //     adhocItems: state.adhocItems.filter((ele) => ele.id !== action.payload),
    //   };
    // case actionTypes.addedServiceItems:
    //   console.log(action.payload);
    //   console.log(Array.isArray(state.serviceItems));
    //   if (Array.isArray(state.serviceItems)) {
    //     return {
    //       ...state,
    //       serviceItems: [...state.serviceItems, action.payload],
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       serviceItems: [action.payload],
    //     };
    //   }
    default:
      return state;
  }
};
