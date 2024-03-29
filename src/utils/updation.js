import { Buffer } from "buffer";
import { useEffect, useState } from "react";

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
export const generateRandomDigits = (length) => {
  // Input validation (optional but recommended)
  if (length <= 0) {
    throw new Error("Length of random digits string must be a positive integer.");
  }

  const digits = "0123456789";
  let result = "";

  // Generate random digits using Math.random()
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    result += digits[randomIndex];
  }

  return result;
  // Example usage:
  // const randomDigits = generateRandomDigits(6); // Get 6 random digits
  // console.log(randomDigits); // Output: Example: 521874 (may vary on each run)
};
export const useInternetStatusCheck = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);
  return isOnline;
};
