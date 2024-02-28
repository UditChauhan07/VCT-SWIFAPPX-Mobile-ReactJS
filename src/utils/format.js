const today = new Date();
// 24 hour date format
export const getCurrentTime = () => {
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
  
// Return the date in "YYYY-MM-DD" format
export const getDateAfterNoOfDays = (noOfDays) => {
  const dateAfterSevenDays = new Date(today);
  dateAfterSevenDays.setDate(today.getDate() + noOfDays);
  const year = dateAfterSevenDays.getFullYear();
  const month = String(dateAfterSevenDays.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateAfterSevenDays.getDate()).padStart(2, "0");
  // Return the date in "YYYY-MM-DD" format
  return `${year}-${month}-${day}`;
};
