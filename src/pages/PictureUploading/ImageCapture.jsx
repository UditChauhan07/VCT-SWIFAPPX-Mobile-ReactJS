import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadPicture } from "../../api/worker";
import { Buffer } from "buffer";
import Loading from "../../components/Loading";
import { Modal } from "react-bootstrap";
function dataUrlToFile(dataUrl, filename) {
  const arr = dataUrl.split(",");
  if (arr.length < 2) {
    return undefined;
  }
  const mimeArr = arr[0].match(/:(.*?);/);
  if (!mimeArr || mimeArr.length < 2) {
    return undefined;
  }
  const mime = mimeArr[1];
  const buff = Buffer.from(arr[1], "base64");
  return new File([buff], filename, { type: mime });
}

const CameraApp = ({ show }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successfully, setSuccessfully] = useState(false);

  const [pictureUpload, setPictureUpload] = useState(false);

  const [stream, setStream] = useState(null);
  const userGlobalState = useSelector((state) => state.userModule);
  const handlePictureUpload = () => setPictureUpload(false);
  const handleSuccessfully = () => {
    setSuccessfully(false);
    // navigate("/job-details");
    startCapture();
  };

  // Function to start capturing video
  const startCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Function to stop capturing video
  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };
  // Function to capture image
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    // const dataUrl = canvas.toDataURL('image/jpeg');
    const dataUrl = canvas.toDataURL("image/png");
    setImageData(dataUrl);
    stopCapture(); // Stop capturing after image capture
  };
  useEffect(() => {
    startCapture();
    setImageData(null);
  }, []);
  console.log(imageData);
  const uploadImage = async () => {
    const file = dataUrlToFile(imageData, "image.png");
    console.log(file, imageData);
    await toUploadPictureAPICall(userGlobalState?.workerOrderId, file, userGlobalState?.details?.token);
  };
  // API Call to Upload Picture
  const toUploadPictureAPICall = async (item_id, file, accessToken) => {
    setLoading(true);
    const result = await uploadPicture(item_id, file, accessToken);
    console.log(result);
    setLoading(false);
    // if (result?.error) navigate("/");
    // else
    if (result === 400) {
      setSuccessfully(true);
      setImageData(null);
    } else {
      setPictureUpload(true);
      setImageData(null);
      navigate("/job-details");
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!imageData ? <video ref={videoRef} autoPlay /> : null}
          {imageData && <img src={imageData} alt="Captured" />}
          <div className="d-flex gap-5 justify-content-center mt-4">
            {/* <button onClick={startCapture}>Start Capture</button> */}
            {!imageData ? (
              <button variant="primary" className="PurpulBtnClock w-30 btn btn-btn" onClick={captureImage}>
                Capture Image
              </button>
            ) : (
              <button variant="primary" className="PurpulBtnClock w-30 btn btn-btn" onClick={uploadImage}>
                Upload Image
              </button>
            )}
            <button
              variant="primary"
              className="PurpulBtnClock w-30 btn btn-btn"
              onClick={() => {
                stopCapture();
                navigate("/job-details");
              }}
            >
              Cancel
            </button>
          </div>
          {/* Modal picture Upload Successfully */}
          <Modal show={pictureUpload} onHide={handlePictureUpload}>
            <Modal.Header closeButton>
              <Modal.Title> Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Picture uploaded Successfully.
              <div className="d-flex gap-5 mt-3">
                <button variant="primary" onClick={handlePictureUpload} className="PurpulBtnClock w-30 btn btn-btn">
                  OK
                </button>
              </div>
            </Modal.Body>
          </Modal>
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
        </>
      )}
    </div>
  );
};

export default CameraApp;
