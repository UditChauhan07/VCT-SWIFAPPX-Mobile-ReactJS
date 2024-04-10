import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { WhiteBackArrow } from "../../utils/svg";
import { reasonsForCancelAndReschedule, workOrderCancel } from "../../api/worker";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { App } from "@capacitor/app";

function Cancel() {
  // Go back functionality for android mobile
  App.addListener("backButton", ({ canGoBack }) => {
    console.log(canGoBack);
    if (canGoBack) {
      window.history.back();
    } else {
      App.exitApp();
    }
  });
  const userGlobalState = useSelector((state) => state.userModule);
  console.log(userGlobalState);
  const [reasons, setReasons] = useState([]);
  const [showCancelSuccessfullyModal, setShowCancelSuccessfullyModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null); // Track selected value
  const [reasonError, setReasonError] = useState(null); // State for error message
  const [unSuccessfully, setUnsuccessfully] = useState(false);

  let navigate = useNavigate();
  const handleCancelSuccessfullyModal = () => {
    setShowCancelSuccessfullyModal(false);
    navigate("/dashboard");
  };
  const handleUnsuccessfully = () => setUnsuccessfully(false);

  // // API call for reasons
  const reasonsAPICAll = async (accessToken) => {
    const result = await reasonsForCancelAndReschedule(accessToken);
    console.log(result.requestedCancelReason);
    setReasons(result.requestedCancelReason);
  };
  useEffect(() => {
    reasonsAPICAll(userGlobalState?.details?.token);
  }, []);
  const handleSubmit = async () => {
    if (!selectedReason) {
      setReasonError("Please select a reason");
      return; // Prevent form submission if reason is not selected
    }
    const result = await workOrderCancel(userGlobalState?.cancelWO?.id, selectedReason, userGlobalState?.details?.token);
    console.log(result);
    if (result.error) {
      setUnsuccessfully(true);
    } else {
      setShowCancelSuccessfullyModal(true);
    }
  };
  const handleReason = (options) => {
    console.log(options);
    setSelectedReason(options?.value);
    setReasonError(options?.value ? null : "Please select a reason"); // Set error if empty
  };
  console.log(selectedReason);
  return (
    <div className={styles.mainHide}>
      {/* Top Section */}
      <div className={styles.TopSection}>
        <div className={styles.backArrow}>
          <Link to="/dashboard">
            <WhiteBackArrow />
          </Link>
          {/* Title */}
        </div>
        <h3>Cancellation for {userGlobalState?.cancelWO?.customerName}</h3>
      </div>
      {/* Display cancel reasons */}
      {/* // className={` ${styles.calanderSelect} `} */}
      <Select
        className="mx-5"
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
        {/* <Link to="/dashboard"> */}
        <button className={styles.calanderReschedule} onClick={handleSubmit}>
          Submit
        </button>
        {/* </Link> */}
      </div>
      {/* Modal WO stopped Successfully */}
      <Modal show={showCancelSuccessfullyModal} onHide={handleCancelSuccessfullyModal}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center"> Cancel Work Order request has been sent to admin successfully.</p>
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleCancelSuccessfullyModal} className="PurpulBtnClock w-30 btn btn-btn">
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
          <p className="text-center">Something went wrong. Try Again!</p>
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

export default Cancel;
