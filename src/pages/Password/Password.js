import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, getUserId, getUserPassword } from "../../redux/user/user.actions";
import { workerLogin } from "../../api/worker";

const Password = () => {
  // const globalUserState = useSelector((state) => state.userModule);
  const globalCompanyState = useSelector((state) => state.companyModule);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();

  const login = async (userName, password, company_id) => {
    const result = await workerLogin(userName, password, company_id);
    if (result.error) alert(result.message);
    else {
      dispatch(getUserDetails(result.details));
      navigate("/dashboard");
    }
  };
  const handleSubmit = () => {
    dispatch(getUserId(userName));
    dispatch(getUserPassword(password));
    login(userName, password, globalCompanyState.company_id);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUserChange = (e) => {
    setUserName(e.target.value);
  };
  return (
    <div>
      <div className="dd-none dd-block p20">
        <div className="vCenter">
          <div className="w-100">
            <div className="logo ">
              <img className="img-fluid" src="/assets/dx-Icon.png" alt="img" />
            </div>
            <p className="SearchCompanyText">Enter Your Login Detail to Access Your Account</p>
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Enter User ID" aria-label="Search" aria-describedby="search-addon" onChange={handleUserChange} />
            </div>
            <div className="input-group rounded mt-4">
              <input type="password" className="form-control rounded" placeholder="Password" aria-label="Search" aria-describedby="search-addon" onChange={handlePasswordChange} />
            </div>
            <div className="SubmitButton mt-20">
              {/* <a href="/dashboard" className="btn btn-btn SubmitBtnStyle">
                Login
              </a> */}
              <button className="btn btn-btn SubmitBtnStyle" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
