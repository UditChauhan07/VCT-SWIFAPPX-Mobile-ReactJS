import React, { useState } from "react";
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

const EditDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGlobalState = useSelector((state) => state.userModule);
  const initialValues = {
    name: userGlobalState?.details?.name,
    address: userGlobalState?.details?.address,
    contact: userGlobalState?.details?.contact,
  };

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(false);
    navigate("/profile");
  };

  // API Call to edit user details
  const handleSubmitDetails = async (values) => {
    console.log(values);
    setLoading(true);
    const result = await editWorkerProfile(values.name, values.contact, values.address, userGlobalState?.details?.token);
    setLoading(false);
    if (result?.error) navigate("/");
    else {
      dispatch(getUserDetails(result.result));
      setShow(true);
      console.log(result);
    }
  };
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
                      <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-8mmkcg">
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
              <div className={Styles.Padding20}>
                <div className={Styles.Profile}>
                  <img src={userGlobalState?.details?.profile_image ?? "/assets/UserIcon.png"} alt="profile" style={{ borderRadius: "50%", height: "120px", width: "120px" }} />
                </div>
                <div className={Styles.EDitIConPosition}>
                  <button className={Styles.EditIconBTn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="none">
                      <path
                        d="M27.23 30H2.77C1.243 30 0 28.757 0 27.23V2.77C0 1.243 1.243 0 2.77 0H18.19C18.743 0 19.19 0.448 19.19 1C19.19 1.552 18.743 2 18.19 2H2.77C2.345 2 2 2.345 2 2.77V27.23C2 27.655 2.345 28 2.77 28H27.23C27.655 28 28 27.655 28 27.23V11.81C28 11.258 28.447 10.81 29 10.81C29.553 10.81 30 11.258 30 11.81V27.23C30 28.757 28.758 30 27.23 30Z"
                        fill="black"
                      />
                      <path
                        d="M7.20802 24.5821C6.73702 24.5821 6.28102 24.3961 5.94202 24.0581C5.52502 23.6411 5.34002 23.0461 5.44702 22.4661L6.33202 17.7141C6.36902 17.5161 6.46502 17.3331 6.60802 17.1901L22.514 1.28505C24.225 -0.425945 27.007 -0.422945 28.716 1.28505C30.425 2.99405 30.425 5.77606 28.716 7.48706L12.811 23.3921C12.668 23.5351 12.485 23.6311 12.287 23.6681L7.53602 24.5521C7.42602 24.5721 7.31602 24.5821 7.20802 24.5821ZM8.24202 18.3841L7.47002 22.5301L11.616 21.7591L27.302 6.07205C28.232 5.14205 28.232 3.62805 27.302 2.69805C26.372 1.76805 24.858 1.77005 23.928 2.69805L8.24202 18.3841Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>

                <div className={Styles.InputField}>
                  <div className="form-group">
                    <Field type="text" className="form-control" id="First" placeholder="Enter User name" name="name" />
                    <ErrorMessage component={TextError} name="name" />
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
              <Modal.Body>
                Profile updated Successfully.
                <div className="d-flex gap-5 mt-3">
                  <button variant="primary" onClick={handleShow} className="PurpulBtnClock w-30 btn btn-btn">
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
