import React, { useRef, useState } from "react";
import Styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { WhiteBackArrow } from "../../utils/svg";
import { capitalizeEachWord, convertTimeTo24h, get24HourTime } from "../../utils/format";
import { useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";
import { Modal } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SignatureValidationSchema } from "../../ValidationSchema/Signature";
import TextError from "../../utils/TextError";
import { dataUrlToFile } from "../../utils/updation";
import { uploadSignature, workOrderWorkersFinish } from "../../api/worker";
import Loading from "../../components/Loading";

function SignatureScreen() {
  const navigate = useNavigate();

  const userGlobalState = useSelector((state) => state.userModule);
  const sigCanvas = useRef(null);
  const [isNotSignedModal, setIsNotSignedModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [woStopped, setWoStopped] = useState(false);
  const [isSignatureUploaded, setIsSignatureUploaded] = useState(false);

  const handleIsSignatureUploaded = () => setIsSignatureUploaded(false);
  const handleIsNotSignedModal = () => setIsNotSignedModal(false);
  const handleWoStopped = () => {
    setWoStopped(false);
    navigate("/dashboard");
  };
  const file = useRef();
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
      file.current = dataUrlToFile(signatureImage, "image.png");
      // console.log(file.current, signatureImage);
      // console.log(signatureImage);
    }
  };
  // console.log(isNotSignedModal);
  const initialValues = {
    signOff: "",
    remarks: "",
  };
  const handleSubmit = async (values) => {
    // console.log(values);
    saveSignature();
    if (sigCanvas.current?.isEmpty()) {
      setIsNotSignedModal(true);
    } else {
      // setLoading(true);
      // api for uploading WO signature
      const result = await uploadSignature(userGlobalState?.workerOrderId, file.current, values.signOff, values.remarks, userGlobalState?.details?.token);
      // console.log(result);
      if (result?.status === 200) {
        setIsSignatureUploaded(true);
        // api for finishing WO

        // const resultFinishing = await workOrderWorkersFinish(userGlobalState?.workerOrderId, convertTimeTo24h(new Date().toLocaleTimeString().substring(0, 8)), userGlobalState?.details?.token);
        const resultFinishing = await workOrderWorkersFinish(userGlobalState?.workerOrderId, get24HourTime(), userGlobalState?.details?.token);
        // console.log(resultFinishing);
        if (!resultFinishing.error) {
          setIsSignatureUploaded(false);
          setWoStopped(true);
        }
      }

      // setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={Styles.JobDetalTop}>
            <div className={`${Styles.TopSection} fixed-top`}>
              <div className={Styles.backArrow}>
                <Link to="/final-job-detail">
                  <WhiteBackArrow />
                </Link>
              </div>
              <div className={Styles.Greetings}>
                <p className="m-0">Thank you</p>
                <h5>
                  {capitalizeEachWord(userGlobalState?.details?.name)}, <span>kindly sign off below</span>
                </h5>
              </div>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignatureValidationSchema}>
              <Form>
                <div className={Styles.BorderRadiusTop}>
                  <div className={Styles.CodAmount}>
                    <label> Sign off by</label>
                    <Field type="text" placeholder="Enter your name" name="signOff" />
                    <ErrorMessage component={TextError} name="signOff" />

                    <label> Add Remarks</label>
                    <Field type="text" placeholder="Enter your remarks/comment" name="remarks" />
                    <ErrorMessage component={TextError} name="remarks" />

                    <label> Signature</label>
                    <div className="bg-white">
                      <SignatureCanvas ref={sigCanvas} penColor="black" className="titiSingh" canvasProps={{ width: 300, height: 200 }} />
                    </div>
                    <div className={Styles.CodButton}>
                      <button type="button" onClick={clearSignature}>
                        Clear Sign.
                      </button>
                      {/* <button type="button" onClick={saveSignature}>
                    Confirm Signature
                  </button> */}
                      {/* </div>
                <div className={Styles.CodButton}> */}
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
          {/* Modal for Unsuccessfully something*/}
          <Modal show={isNotSignedModal} onHide={handleIsNotSignedModal}>
            <Modal.Header closeButton>
              <Modal.Title> Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-center">Please do your signature!</p>
              <div className="d-flex gap-5 mt-3">
                <button variant="primary" onClick={handleIsNotSignedModal} className="PurpulBtnClock w-30 btn btn-btn">
                  OK
                </button>
              </div>
            </Modal.Body>
          </Modal>
          {/* Modal WO stopped Successfully */}
          <Modal show={woStopped} onHide={handleWoStopped}>
            <Modal.Header closeButton>
              <Modal.Title> Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-center">Work Order completed Successfully.</p>
              <div className="d-flex gap-5 mt-3">
                <button variant="primary" onClick={handleWoStopped} className="PurpulBtnClock w-30 btn btn-btn">
                  OK
                </button>
              </div>
            </Modal.Body>
          </Modal>
          {/* Modal WO sign upload Successfully */}
          <Modal show={isSignatureUploaded} onHide={handleIsSignatureUploaded}>
            <Modal.Header closeButton>
              <Modal.Title> Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-center">Signature along with details uploaded Successfully.</p>
              <div className="d-flex gap-5 mt-3">
                <button variant="primary" onClick={handleIsSignatureUploaded} className="PurpulBtnClock w-30 btn btn-btn">
                  OK
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default SignatureScreen;
