const today = new Date();
// 24 hour date format
export const getCurrentTime = () => {
  const hours = String(today?.getHours())?.padStart(2, "0");
  const minutes = String(today?.getMinutes())?.padStart(2, "0");
  const seconds = String(today?.getSeconds())?.padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

// Return the date in "YYYY-MM-DD" format
export const getDateAfterNoOfDays = (noOfDays) => {
  const dateAfterSevenDays = new Date(today);
  dateAfterSevenDays?.setDate(today?.getDate() + noOfDays);
  const year = dateAfterSevenDays?.getFullYear();
  const month = String(dateAfterSevenDays?.getMonth() + 1)?.padStart(2, "0"); // Months are zero-based
  const day = String(dateAfterSevenDays?.getDate())?.padStart(2, "0");
  // Return the date in "YYYY-MM-DD" format
  return `${year}-${month}-${day}`;
};

// capitalize Each Word
export const capitalizeEachWord = (str) => {
  // Split the string into an array of words
  let words = str?.split(" ");
  // Capitalize the first letter of each word
  for (let i = 0; i < words?.length; i++) {
    words[i] = words[i]?.charAt(0)?.toUpperCase() + words[i]?.slice(1)?.toLowerCase();
  }
  // Join the words back together into a single string
  return words?.join(" ");
};
// convert this "2024-03-01 13:02:40" into 12 Oct 2022 at 10:08 am format
export const formatDateString = (inputDateString) => {
  const inputDate = new Date(inputDateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedDate = `${inputDate?.getDate()} ${months[inputDate?.getMonth()]} ${inputDate?.getFullYear()} at ${formatAMPM(inputDate)}`;
  function formatAMPM(date) {
    let hours = date?.getHours();
    let minutes = date?.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if minutes < 10
    return `${hours}:${minutes} ${ampm}`;
  }
  return formattedDate;
};

// const timestamp = "2024-03-07T23:43:05.000000Z";
// convert (timestamp))in 11:43pm on Mar 7, 2024
export const formatTimestamp = (timestamp) => {
  const dateObj = new Date(timestamp);

  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return `${formattedTime.toLowerCase()} on ${formattedDate}`;
};
// convert "09:53:18" this into 09:53am
export const convertTimeInAMPM = (timeString) => {
  if (timeString) {
    const [hours, minutes, seconds] = timeString?.split(":");
    const convertedHours = hours < 12 ? hours : hours % 12;
    const convertedTime = `${convertedHours?.toString().padStart(2, "0")}:${minutes}:${seconds} ${hours >= 12 ? "PM" : "AM"}`;
    return convertedTime;
  } else return null;
};

// convert  Wed Mar 13 2024 00:00:00 GMT+0530 (India Standard Time) into 2024-03-13
export const convertDateIntoYYYYMMDD = (dateString) => {
  // Parse the date string using Date object
  const date = new Date(dateString);

  // Get year, month (0-indexed), and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days

  // Format the date in YYYY-MM-DD
  return `${year}-${month}-${day}`;
};

