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
import { convertDateIntoYYYYMMDD, isPreviousDate } from "../../utils/format";

function Reschedule() {
  const userGlobalState = useSelector((state) => state.userModule);
  console.log(userGlobalState);
  let navigate = useNavigate();
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null); // Track selected value
  const [selectedDate, setSelectedDate] = useState(null);
  const [reasonError, setReasonError] = useState(null); // State for error message
  const [reasonErrorDate, setReasonErrorDate] = useState(null); // State for error message
  const [unSuccessfully, setUnsuccessfully] = useState(false);
  const [previousDate, setPreviousDate] = useState(false);
  const [date, setDate] = useState(new Date()); // State to hold the selected date
  const [showRescheduleSuccessfullyModal, setShowRescheduleSuccessfullyModal] = useState(false);
  const handleRescheduleSuccessfullyModal = () => {
    setShowRescheduleSuccessfullyModal(false);
    navigate("/dashboard");
  };
  const handleUnsuccessfully = () => setUnsuccessfully(false);
  const handlePreviousDate = () => setPreviousDate(false);
  const handleSubmit = async () => {
    if (!selectedDate) {
      setReasonErrorDate("Please select a date");
      return; // Prevent form submission if reason is not selected
    }
    if (!selectedReason) {
      setReasonError("Please select a reason");
      return; // Prevent form submission if reason is not selected
    }
    const result = await workOrderReschedule(userGlobalState?.rescheduleWO?.id, convertDateIntoYYYYMMDD(selectedDate), selectedReason, userGlobalState?.details?.token);
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
  const changeValue = (val) => {
    setSelectedDate(val);
    setReasonErrorDate(val ? null : "Please select a date"); // Set error if empty
    if (isPreviousDate(val)) setPreviousDate(true);
  };
  console.log(selectedDate);

  return (
    <div className={styles.mainHide}>
      {/* Top Section */}
      <div className={styles.TopSection}>
        <div className={styles.backArrow}>
          <Link to="/dashboard">
            <WhiteBackArrow />
          </Link>
        </div>
        <h3>Reschedule for {userGlobalState?.rescheduleWO?.customerName}</h3>
      </div>
      {/* Calendar Component */}
      <Calendar prev2Label next2Label className={styles.calanderControl} onChange={changeValue} value={date} />
      {reasonErrorDate && <p className="text-danger w-100 ps-1 form-error mx-5 fs-6">{reasonErrorDate}</p>} {/* Display error if present */}
      {/* Display rescheduled reasons */}
      <Select
        className="mx-5 mt-3"
        placeholder="Search Reason"
        options={reasons?.map((ele) => ({
          value: ele?.id,
          label: ele?.title,
        }))}
        filterOption={(option, filterValue) => option.label.toLowerCase().includes(filterValue.toLowerCase())}
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
        <p className="text-center">
          Reschedule Work Order request has been sent to admin successfully.
          </p>
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
        <p className="text-center">
          Something went wrong. Try Again!
          </p>
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleUnsuccessfully} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal for selection of previous date*/}
      <Modal show={previousDate} onHide={handlePreviousDate}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center"> Past Date can't be selected!</p>

          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handlePreviousDate} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Reschedule;
