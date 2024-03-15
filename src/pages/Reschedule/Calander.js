import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./style.module.css"
// import "./style.css"; // Assuming this is a custom CSS file
import { Link, useNavigate } from "react-router-dom";
import { WhiteBackArrow } from "../../utils/svg";
// import Select from "react-select";



function Reschedule() {
   const [date, changeDate] = useState(new Date()); // State to hold the selected date

   // Function to update the selected date
   function changeValue(val) {
      changeDate(val);
   }



   return (
      <div className={styles.mainHide}>
         {/* Top Section */}
         <div className={styles.TopSection}>
           
            <div className= {styles.backArrow}>
              <Link to="/dashboard"> <WhiteBackArrow />
              </Link>
            </div>
         <h3>
             Reschedule for Customer 
         </h3>
          </div>
         
         {/* Title */}

         {/* Calendar Component */}
         <Calendar 
    prev2Label
    next2Label
         className={styles.calanderControl} onChange={changeValue} value={date} />

         {/* Display selected date */}
       <select  className={styles.calanderSelect}>
         <option >1</option>
         <option>2</option>
         <option>3</option>
       </select>

       <div className={styles.calanderReschedule} >
         <Link to="./dasboard">Reschedule</Link>
       </div>
      </div>
   );
}

export default Reschedule;
