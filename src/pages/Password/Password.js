import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, getUserPassword } from "../../redux/user/user.actions";
import { workerLogin } from "../../api/worker";

const Password = () => {
  const globalState = useSelector((state) => state.userModule);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState();

  const login = async (userName, password) => {
    const result = await workerLogin(userName, password);
    if (result.error) alert("You are offline. Reconnecting...");
    else {
      dispatch(getUserDetails(result.details));
      navigate("/dashboard");
    }
  };
  const handleSubmit = () => {
    dispatch(getUserPassword(password));
    login(globalState.user_id,password);
  };
  const handleChange = (e) => {
    setPassword(e.target.value);
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
              <input type="password" className="form-control rounded" placeholder="Password" aria-label="Search" aria-describedby="search-addon" onChange={handleChange} />
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
