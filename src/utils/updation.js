import { Buffer } from "buffer";

// Function to update an object in the array based on its id

export const updateObject = (array, updatedObject) => {
  const index = array.findIndex((obj) => obj.id === updatedObject.id);
  if (index !== -1) {
    // Create a new array with the updated object at the correct index
    const newArray = [
      ...array.slice(0, index), // Get elements before the updated object
      updatedObject, // Insert the updated object
      ...array.slice(index + 1), // Get elements after the updated object
    ];
    return newArray;
  }
  return array; // Return the original array if the object is not found
};

export const dataUrlToFile = (dataUrl, filename) => {
  const arr = dataUrl.split(",");
  if (arr.length < 2) {
    return undefined;
  }
  const mimeArr = arr[0].match(/:(.*?);/);
  if (!mimeArr || mimeArr.length < 2) {
    return undefined;
  }
  const mime = mimeArr[1];
  const buff = Buffer.from(arr[1], "base64");
  return new File([buff], filename, { type: mime });
};
