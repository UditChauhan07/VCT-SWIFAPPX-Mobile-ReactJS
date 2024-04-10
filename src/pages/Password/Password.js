import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, getUserId, getUserPassword } from "../../redux/user/user.actions";
import { workerLogin } from "../../api/worker";
import { Modal } from "react-bootstrap";
import { useInternetStatusCheck } from "../../utils/updation";
import "./style.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../../utils/TextError";
import { LoginFormSchema } from "../../ValidationSchema/Login";
const Password = () => {
  const online = useInternetStatusCheck();
  const globalCompanyState = useSelector((state) => state.companyModule);
  const userGlobalState = useSelector((state) => state.userModule);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unSuccessfully, setUnsuccessfully] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleUnsuccessfully = () => setUnsuccessfully(false);
  const initialValues = {
    userName:"",
    password:""
  };
  const login = async (userName, password, company_id) => {
    const result = await workerLogin(userName, password, company_id);
    if (result.error) setUnsuccessfully(true);
    else {
      dispatch(getUserDetails(result.details));
      navigate("/dashboard");
    }
  };
  const handleSubmit = async(values, actions) => {
    console.log(values);
    if (online) {
      dispatch(getUserId(values.userName));
      dispatch(getUserPassword(values.password));
      login(values.userName, values.password, globalCompanyState.company_id);
    }
  };

  console.log(userGlobalState);
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={LoginFormSchema}>
        <Form>
          <div className="dd-none dd-block p20">
            <div className="vCenter">
              <div className="w-100">
                <div className="logo ">
                  <img className="img-fluid" src={globalCompanyState.company_logo} alt="img" />
                </div>
                <p className="SearchCompanyText">Enter Your Login Detail to Access Your Account</p>
                <div className="input-group rounded" style={{textAlign:"left",marginBottom:"25px"}}>
                  <Field type="text" className="form-control rounded" placeholder="Enter User Id" name="userName" />
                  <ErrorMessage component={TextError} name="userName" />
                </div>
                <div className="input-group rounded mt-4" style={{textAlign:"left"}}>
                <Field type="password" className="form-control rounded" placeholder="Password" name="password" />
                  <ErrorMessage component={TextError} name="password" className="mb-3" />
                </div>

                <div className="SubmitButton mt-25">
                  <button type="submit" className={online ? "btn btn-btn SubmitBtnStyle" : "btn btn-btn SubmitBtnStyle blur"} >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      {!online ? <div className="bg-danger fixed-bottom d-flex justify-content-center mt-3">You are offline. Check your internet connection!</div> : null}

      {/* Modal for Unsuccessfully something*/}
      <Modal show={unSuccessfully} onHide={handleUnsuccessfully}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">Invalid Credentials. Try Again!</p>
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleUnsuccessfully} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Password;
