import React, {  useState } from "react";
import { dataUrlToFile } from "../utils/updation";
import { uploadPicture } from "../api/worker";
import { Camera,  CameraResultType } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom/dist";
import { WhiteBackArrow } from "../utils/svg";
import Styles from "../pages/JobDetails/style.module.css";

function MyCamera() {
  const navigate = useNavigate();
  const userGlobalState = useSelector((state) => state.userModule);
  const [loading, setLoading] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const [pictureUpload, setPictureUpload] = useState(false);
  const handlePictureUpload = () => {
    setPictureUpload(false);
    navigate("/job-details");
  };
  const handleSuccessfully = () => {
    setSuccessfully(false);
    // navigate("/job-details");
  };

  const toUploadPictureAPICall = async (item_id, file, accessToken) => {
    setLoading(true);
    const result = await uploadPicture(item_id, file, accessToken);
    console.log(result);
    setLoading(false);
    if (result?.error) {
      setSuccessfully(true);
    } else {
      setPictureUpload(true);
      setTimeout(() => {
        navigate("/job-details");
      }, 2000);
    }
  };
  const takePhoto = async () => {
    console.log(Capacitor.getPlatform());
    if (Capacitor.getPlatform() !== "web") {
      if (Capacitor.getPlatform() === "ios") {
        // Check for iOS platform
        const image = await Camera.getPhoto({
          quality: 80,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          saveToPhotoAlbum: true,
        });
        console.log(image.webPath);
      } else {
        // Check for Android platform
        const { CameraSource, CameraResultType } = await import("@capacitor/camera");

        const image = await Camera.getPhoto({
          quality: 80,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          saveToGallery: true,
          source: CameraSource.Camera,
        });
        // alert("JSON.stringify(image)");
        console.log("image", image);
        console.log(image.dataUrl);
        const file = dataUrlToFile(image.dataUrl, "image.jpg");
        console.log("file", file);

        await toUploadPictureAPICall(userGlobalState?.workerOrderId, file, userGlobalState?.details?.token);
        console.log(image.base64String);
      }
    } else {
      // Check for web platform
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        saveToGallery: true,
      });
      console.log(image.dataUrl);
      const file = dataUrlToFile(image.dataUrl, "image.png");
      console.log(file);
      setLoading(true);
      const result = await uploadPicture(userGlobalState?.workerOrderId, file, userGlobalState?.details?.token);
      console.log(result);
      setLoading(false);
      if (result?.error) {
        setSuccessfully(true);
      } else {
        console.log("ihih");
        setPictureUpload(true);
        setTimeout(() => {
          navigate("/job-details");
        }, 2000);
      }
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
           <div className={` ${Styles.TopSection} fixed-top `}>
            {/* name and tASk and picture counting */}
            <div className={` ${Styles.rowed} `}>
              <div className={` ${Styles.backArrow} `}>
                <Link to="/job-details">
                  <WhiteBackArrow />
                </Link>
              </div>
          </div>
          </div>
          <div className="d-flex justify-content-center align-items-center" style={{ maxHeight: "100vh", minHeight: "100vh" }}>
            <button variant="primary" className="PurpulBtnClock w-30 btn btn-btn" onClick={takePhoto}>
              Take Photo
            </button>
          </div>
          {/* Modal picture Upload Successfully */}
          <Modal show={pictureUpload} onHide={handlePictureUpload}>
            <Modal.Header closeButton>
              <Modal.Title> Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-center">Picture uploaded Successfully.</p>
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
              <p className="text-center">Something went wrong. Try Again!</p>
              <div className="d-flex gap-5 mt-3">
                <button variant="primary" onClick={handleSuccessfully} className="PurpulBtnClock w-30 btn btn-btn">
                  OK
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

export default MyCamera;
