import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { WhiteBackArrow } from "../../utils/svg";
import { reasonsForCancelAndReschedule, workOrderReschedule } from "../../api/worker";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Modal } from "react-bootstrap";

function Reschedule() {
  const userGlobalState = useSelector((state) => state.userModule);
  console.log(userGlobalState);
  let navigate = useNavigate();
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null); // Track selected value
  const [reasonError, setReasonError] = useState(null); // State for error message
  const [unSuccessfully, setUnsuccessfully] = useState(false);
  const [date, setDate] = useState(new Date()); // State to hold the selected date
  const [showRescheduleSuccessfullyModal, setShowRescheduleSuccessfullyModal] = useState(false);
  const handleRescheduleSuccessfullyModal = () => {
    setShowRescheduleSuccessfullyModal(false);
    // navigate("/dashboard");
  };
  const handleUnsuccessfully = () => setUnsuccessfully(false);
  const handleSubmit = async () => {
    if (!selectedReason) {
      setReasonError("Please select a reason");
      return; // Prevent form submission if reason is not selected
    }
    const result = await workOrderReschedule(userGlobalState?.cancelWO?.id, userGlobalState?.details?.token);
    console.log(result);
    if (result.error) {
      setUnsuccessfully(true);
    } else {
      setShowRescheduleSuccessfullyModal(true);
    }
  };
  const handleReason = (options) => {
    console.log(options);
    setSelectedReason(options?.value);
    setReasonError(options?.value ? null : "Please select a reason"); // Set error if empty
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
      {/* Display rescheduled reasons */}
      {/* // className={` ${styles.calanderSelect} `} */}
      <Select
        className="mx-5"
        placeholder="Search Reason"
        options={reasons?.map((ele) => ({
          value: ele?.title,
          label: ele?.title,
        }))}
        onChange={handleReason}
        // menuIsOpen={true}
      />
      {reasonError && <p className="text-danger w-100 ps-1 form-error mx-5 fs-6">{reasonError}</p>} {/* Display error if present */}
      <div className={styles.calanderReschedule}>
        <button className={styles.calanderReschedule} onClick={handleSubmit}>
        Reschedule
        </button>
      </div>
      {/* Modal WO rescheduled Successfully */}
      <Modal show={showRescheduleSuccessfullyModal} onHide={handleRescheduleSuccessfullyModal}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Reschedule Work Order request has been sent to admin successfully.
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleRescheduleSuccessfullyModal} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal for Unsuccessfully something*/}
      <Modal show={unSuccessfully} onHide={handleUnsuccessfully}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Something went wrong. Try Again!
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleUnsuccessfully} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Reschedule;