import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { WhiteBackArrow } from "../../utils/svg";
import { reasonsForCancelAndReschedule } from "../../api/worker";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Modal } from "react-bootstrap";

function Reschedule() {
  const userGlobalState = useSelector((state) => state.userModule);

  const [date, setDate] = useState(new Date()); // State to hold the selected date
  const [reasons, setReasons] = useState([]);
  const [showRescheduleSuccessfullyModal, setShowRescheduleSuccessfullyModal] = useState(false);
  let navigate = useNavigate();
  const handleRescheduleSuccessfullyModal = () => {
    setShowRescheduleSuccessfullyModal(false);
    // navigate("/dashboard");
  };
  // API call for reasons
  const reasonsAPICAll = async (accessToken) => {
    const result = await reasonsForCancelAndReschedule(accessToken);
    console.log(result.requestedResheduleReason);
    setReasons(result.requestedResheduleReason);
  };
  useEffect(() => {
    reasonsAPICAll(userGlobalState?.details?.token);
  }, []);
  // Function to update the selected date
  function changeValue(val) {
    setDate(val);
    console.log(val);
  }

  return (
    <div className={styles.mainHide}>
      {/* Top Section */}
      <div className={styles.TopSection}>
        <div className={styles.backArrow}>
          <Link to="/dashboard">
            <WhiteBackArrow />
          </Link>
        </div>
        <h3>Reschedule for Customer</h3>
      </div>

      {/* Calendar Component */}
      <Calendar prev2Label next2Label className={styles.calanderControl} onChange={changeValue} value={date} />

      <Select
        className="mx-5"
        placeholder="Search Reschedule Reason"
        options={reasons?.map((ele) => ({
          value: ele?.id,
          label: ele?.title,
        }))}
        // onChange={handleAdhocItemChange}
        // menuIsOpen={true}
      />

      <div className={styles.calanderReschedule}>
        <Link to="./dasboard">Reschedule</Link>
      </div>
      {/* Modal WO stopped Successfully */}
      <Modal show={showRescheduleSuccessfullyModal} onHide={handleRescheduleSuccessfullyModal}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Work Order completed Successfully.
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleRescheduleSuccessfullyModal} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Reschedule;
