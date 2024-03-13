import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";

const CameraApp = ({ show }) => {
  const [showModal, setShowModal] = useState(show);
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [stream, setStream] = useState(null);

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
  const handleOnHide = () => {
    setShowModal(false);
    stopCapture();
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
  }, []);
  console.log(imageData);
  return (
    <div>
      <Modal show={showModal} onHide={handleOnHide}>
        <Modal.Header closeButton>
          <Modal.Title> Capturing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video ref={videoRef} autoPlay />
          {imageData && <img src={imageData} alt="Captured" />}

          <div className="d-flex gap-5 mt-3">
            {/* <button onClick={startCapture}>Start Capture</button> */}
            <button variant="primary" className="PurpulBtnClock w-30 btn btn-btn" onClick={captureImage}>
              Capture Image
            </button>
            <button variant="primary" className="PurpulBtnClock w-30 btn btn-btn" onClick={handleOnHide}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* <button onClick={captureImage}>Capture Image</button> */}
    </div>
  );
};

export default CameraApp;
