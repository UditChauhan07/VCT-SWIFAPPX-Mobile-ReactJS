import React, { useRef, useState } from "react";
import Styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { WhiteBackArrow } from "../../utils/svg";
import { capitalizeEachWord } from "../../utils/format";
import { useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";
import { Modal } from "react-bootstrap";

function SignatureScreen() {
  const userGlobalState = useSelector((state) => state.userModule);
  const sigCanvas = useRef(null);
  const [isNotSignedModal, setIsNotSignedModal] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const handleSuccessfully = () => setSuccessfully(false);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };
  const saveSignature = () => {
    const signatureImage = sigCanvas.current.getCanvas().toDataURL("image/png");
    // Further processing or sending the signature data (explained later)
    if (sigCanvas.current?.isEmpty()) {
      setIsNotSignedModal(true);
    } else {
      setIsNotSignedModal(false);

      console.log(signatureImage);
    }
  };
  return (
    <div>
      <div className={Styles.JobDetalTop}>
        <div className={Styles.TopSection}>
          <div className={Styles.backArrow}>
            <Link to="/final-job-detail">
              <WhiteBackArrow />
            </Link>
          </div>
          <div className={Styles.Greetings}>
            <p className="m-0">Thank you</p>
            <h5>
              {capitalizeEachWord(userGlobalState?.details?.name)}, <span>kindly sign off below</span>{" "}
            </h5>
          </div>
        </div>

        <div className={Styles.BorderRadiusTop}>
          <div className={Styles.CodAmount}>
            <label> Sign off by</label>
            <input type="text" placeholder="Enter your name" />

            <label> Add Remarks</label>
            <input type="text" placeholder="Enter your remarks/comment" />

            <label> Signature</label>
            <div className="bg-white">
              <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{ width: 500, height: 200 }} />
            </div>
            <div className={Styles.CodButton}>
              <button onClick={clearSignature}>Clear Signature</button>
              <button onClick={saveSignature}>Confirm Signature</button>
            </div>
            <div className={Styles.CodButton}>
              <button onClick={clearSignature}>Submit</button>
            </div>
          </div>

          {/* <div className={Styles.CodButton}>
                    <a href='/signature-screen' className={Styles.Btn1}>Clear</a>
                    <a>Confirm</a>

                </div> */}
        </div>
      </div>
      {/* Modal for Unsuccessfully something*/}
      <Modal show={successfully} onHide={handleSuccessfully}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Something went wrong. Try Again!
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleSuccessfully} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignatureScreen;
