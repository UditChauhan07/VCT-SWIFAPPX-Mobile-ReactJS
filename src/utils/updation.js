// Function to update an object in the array based on its id
export const updateObject = (array, updatedObject) => {
    const index = array.findIndex(obj => obj.id === updatedObject.id);
    if (index !== -1) {
      // Create a new array with the updated object at the correct index
      const newArray = [
        ...array.slice(0, index), // Get elements before the updated object
        updatedObject,             // Insert the updated object
        ...array.slice(index + 1)  // Get elements after the updated object
      ];
      return newArray;
    }
    return array; // Return the original array if the object is not found
  };
  
//   // Example: Update object with id 2
//   const updatedObject = { id: 2, name: 'Updated Object 2' };
//   arrayOfObjects = updateObject(arrayOfObjects, updatedObject);
  
//   console.log(arrayOfObjects);