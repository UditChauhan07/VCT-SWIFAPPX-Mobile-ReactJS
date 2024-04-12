import React, { useState } from "react";
import { editWorkerProfileImage, uploadPicture } from "../../api/worker";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom/dist";
import { WhiteBackArrow } from "../../utils/svg";
import Styles from "../../pages/JobDetails/style.module.css";
import { App } from "@capacitor/app";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { dataUrlToFile } from "../../utils/updation";
import { getUserDetails } from "../../redux/user/user.actions";

const ProfileImage = () => {
  // Go back functionality for android mobile
  App.addListener("backButton", ({ canGoBack }) => {
    console.log(canGoBack);
    if (canGoBack) {
      window.history.back();
    } else {
      App.exitApp();
    }
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGlobalState = useSelector((state) => state.userModule);
  const [loading, setLoading] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const [pictureUpload, setPictureUpload] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [notImageFile, setNotImageFile] = useState(false);

  const handlePictureUpload = () => {
    setPictureUpload(false);
    navigate("/edit-details");
  };
  const handleSuccessfully = () => {
    setSuccessfully(false);
  };
  const handleSetNotImageFile = () => setNotImageFile(false);

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
        const { CameraSource, CameraResultType } = await import(
          "@capacitor/camera"
        );

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
        setImageFile(file);
        await uploadProfileImageAPICall();
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
      console.log("wwwb");
      //   console.log(image.dataUrl);
      const file = dataUrlToFile(image.dataUrl, "image.jpeg");
      //   console.log(file);
      setImageFile(file);
      //   setLoading(true);
      uploadProfileImageAPICall(file);
    }
  };
  const uploadFromGallery = async (event) => {
    // console.log(event.target.files[0]);
    const file = event?.target?.files[0];
    const fileExtension = file?.name?.split(".")?.pop()?.toLowerCase();
    const validImageExtensions = ["jpg", "jpeg", "png", "gif"];

    if (validImageExtensions.includes(fileExtension)) {
      setImageFile(event.target.files[0]);
      uploadProfileImageAPICall(event.target.files[0]);
    } else {
      // Not an image, handle error or display message
      setNotImageFile(true);
    }
  };
  // API Call to upload profile image
  const uploadProfileImageAPICall = async (picture) => {
    setLoading(true);
    console.log(picture);
    const result = await editWorkerProfileImage(
      picture,
      userGlobalState?.details?.token
    );
    console.log(result);
    setLoading(false);
    if (result?.error) {
      console.log(result);
      setSuccessfully(true);
      // navigate("/")
    } else {
      dispatch(getUserDetails(result.result));
      setPictureUpload(true);
      console.log(result);
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
                <Link to="/edit-details">
                  <WhiteBackArrow />
                </Link>
              </div>
            </div>
          </div>
          <div
            className="d-flex justify-content-center align-items-center gap-5 flex-column"
            style={{ maxHeight: "100vh", minHeight: "100vh" }}
          >
            <button
              variant="primary"
              className="PurpulBtnClock w-30 btn btn-btn"
              onClick={takePhoto}
              style={{ minWidth: "180px" }}
            >
              Take Photo
            </button>
            {/* <button
              variant="primary"
              className="PurpulBtnClock w-30 btn btn-btn"
              //   onClick={uploadFromGallery}
              style={{ minWidth: "180px" }}
            > */}
            <label
              variant="primary"
              className="PurpulBtnClock w-30 btn btn-btn"
              style={{ minWidth: "180px" }}
            >
              <input
                type="file"
                id="fileInput"
                onChange={uploadFromGallery}
                style={{ display: "none" }}
              />
              Upload from Gallery
            </label>
            {/* </button> */}
          </div>
          {/* Modal picture Upload Successfully */}
          <Modal show={pictureUpload} onHide={handlePictureUpload}>
            <Modal.Header closeButton>
              <Modal.Title> Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-center">Picture uploaded Successfully.</p>
              <div className="d-flex gap-5 mt-3">
                <button
                  variant="primary"
                  onClick={handlePictureUpload}
                  className="PurpulBtnClock w-30 btn btn-btn"
                >
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
                <button
                  variant="primary"
                  onClick={handleSuccessfully}
                  className="PurpulBtnClock w-30 btn btn-btn"
                >
                  OK
                </button>
              </div>
            </Modal.Body>
          </Modal>
          {/* Modal not picture type file Upload  */}
          <Modal show={notImageFile} onHide={handleSetNotImageFile}>
            <Modal.Header closeButton>
              <Modal.Title> Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              Please select an image file (.jpg, .jpeg, .png, .gif).
              <div className="d-flex gap-5 mt-3">
                <button
                  variant="primary"
                  onClick={handleSetNotImageFile}
                  className="PurpulBtnClock w-30 btn btn-btn"
                >
                  OK
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProfileImage;
