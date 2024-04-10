import React, { useEffect, useState } from "react";
import Styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../../utils/TextError";
import { UserProfile } from "../../ValidationSchema/UserProfile";
import Loading from "../../components/Loading";
import { editWorkerProfile } from "../../api/worker";
import { Modal } from "react-bootstrap";
import { getUserDetails } from "../../redux/user/user.actions";
import { EditIcon, WhiteBackArrow } from "../../utils/svg";
import { extractPhoneNumber } from "../../utils/format";
import { App } from '@capacitor/app';

  const EditDetail = () => {
  // Go back functionality for android mobile
  App.addListener('backButton', ({ canGoBack }) => {
    console.log(canGoBack);
     if(canGoBack){
      window.history.back();
      } else {
       App.exitApp();
      }
    });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGlobalState = useSelector((state) => state.userModule);
  const initialValues = {
    name: userGlobalState?.details?.name,
    address: userGlobalState?.details?.address,
    contact: extractPhoneNumber(userGlobalState?.details?.contact),
  };
  const [imageFile, setImageFile] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const [notImageFile, setNotImageFile] = useState(false);
  const handleShow = () => {
    setShow(false);
    navigate("/profile");
  };
  const handleSuccessfully = () => setSuccessfully(false);
  const handleSetNotImageFile = () => setNotImageFile(false);

  // API Call to edit user details
  const handleSubmitDetails = async (values) => {
    console.log(values);
    setLoading(true);
    const result = await editWorkerProfile(values.name, values.contact, values.address, imageFile, userGlobalState?.details?.token);
    setLoading(false);
    if (result?.error) {
      console.log(result);
      setSuccessfully(true);
      // navigate("/")
    } else {
      dispatch(getUserDetails(result.result));
      setShow(true);
      console.log(result);
    }
  };
  const handleFileChange = (event) => {
    // console.log(event.target.files[0]);
    const file = event?.target?.files[0];
    const fileExtension = file?.name?.split(".")?.pop()?.toLowerCase();
    const validImageExtensions = ["jpg", "jpeg", "png", "gif"];

    if (validImageExtensions.includes(fileExtension)) {
      setImageFile(event.target.files[0]);
      console.log("image");
    } else {
      // Not an image, handle error or display message
      setNotImageFile(true)
      // alert("Please select an image file.");
    }
  };
  let imageUrl;
  useEffect(() => {
    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
      const imageElement = document.getElementById("dp");
      imageElement.src = imageUrl;
      // console.log(imageUrl);
    }
  }, [imageFile]);
  // console.log(imageFile);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmitDetails} validationSchema={UserProfile}>
          <Form>
            <div className="dd-none dd-block">
              <div className="TopSection">
                <div className="backArrow">
                  <Link to="/profile">
                    <button className="bg-transparent border-0">
                      <WhiteBackArrow />
                    </button>
                  </Link>
                </div>
              </div>
              <div className={Styles.Padding20}>
                <div className={Styles.Profile}>
                  <img
                    src={imageUrl ? imageUrl : userGlobalState?.details?.profile_image ?? "/assets/UserIcon.png"}
                    alt="profile"
                    style={{
                      borderRadius: "50%",
                      height: "120px",
                      width: "120px",
                    }}
                    id="dp"
                  />
                </div>
                <div className={Styles.EDitIConPosition}>
                  <label
                    htmlFor="fileInput"
                    style={{ cursor: "pointer" }}
                    // onClick={() => handleFileChange()}
                  >
                    <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} />
                    <EditIcon />
                  </label>
                </div>

                <div className={Styles.InputField}>
                  <div className="form-group">
                    <Field type="text" className="form-control" id="First" placeholder="Enter User name" name="name" />
                    <ErrorMessage component={TextError} name="name" className="mb-3" />
                  </div>
                  <div className="form-group">
                    <Field type="text" className="form-control" id="Second" placeholder="Enter Address" name="address" />
                    <ErrorMessage component={TextError} name="address" />
                  </div>
                  <div className="form-group">
                    <Field type="text" className="form-control" id="Third" placeholder="Enter Phone Number" name="contact" />
                    <ErrorMessage component={TextError} name="contact" />
                  </div>
                </div>
                <div className={Styles.SaveBtn}>
                  <button className="ConfirmedButton btn btn-btn" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Modal picture Upload Successfully */}
            <Modal show={show} onHide={handleShow}>
              <Modal.Header closeButton>
                <Modal.Title> Alert</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                Profile updated Successfully.
                <div className="d-flex gap-5 mt-3">
                  <button variant="primary" onClick={handleShow} className="PurpulBtnClock w-30 btn btn-btn">
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
             {/* Modal not picture type file Upload  */}
             <Modal show={notImageFile} onHide={handleSetNotImageFile}>
              <Modal.Header closeButton>
                <Modal.Title> Alert</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
              Please select an image file (.jpg, .jpeg, .png, .gif).
                <div className="d-flex gap-5 mt-3">
                  <button variant="primary" onClick={handleSetNotImageFile} className="PurpulBtnClock w-30 btn btn-btn">
                    OK
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default EditDetail;
