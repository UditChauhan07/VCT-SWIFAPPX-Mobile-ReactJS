import * as actionTypes from "./user.actionTypes";
export const getUserId = (id) => {
  return {
    type: actionTypes.getUserId,
    payload: id,
  };
};
export const getUserPassword = (password) => {
  return {
    type: actionTypes.getUserPassword,
    payload: password,
  };
};
export const getUserDetails = (details) => {
  return {
    type: actionTypes.getUserDetails,
    payload: details,
  };
};
export const getWorkerOrderDetail = (id) => {
  return {
    type: actionTypes.getWorkerOrderDetail,
    payload: id,
  };
};
export const getAddress = (address) => {
  return {
    type: actionTypes.getAddress,
    payload: address,
  };
};
export const selectedAdhocItems = (id, quantity) => {
  return {
    type: actionTypes.selectedAdhocItems,
    payload: { id: id, quantity: quantity },
  };
};
export const removalOfAdhocItems = (id) => {
  return {
    type: actionTypes.removeAdhocItem,
    payload: id,
  };
};
export const updationOfAdhocItems = (id, quantity) => {
  return {
    type: actionTypes.updateAdhocItem,
    payload: { id: id, quantity: quantity },
  };
};
export const additionOfServiceItems = (id, quantity) => {
  return {
    type: actionTypes.addedServiceItems,
    payload: { id: id, quantity: quantity },
  };
};
