import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../redux/user/user.actions";

const LoginDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  const handleNext = () => {
    dispatch(getUserId(userName));
    navigate("/password");
  };
  const handleChange = (e) => {
    setUserName(e.target.value);
  };
  return (
    <div>
      <div className="dd-none dd-block p20">
        <div className="vCenter">
          <div className="w-100">
            <div className="logo ">
              <img className="img-fluid" src="/assets/dx-Icon.png" alt="" />
            </div>
            <p className="SearchCompanyText">Enter Your Login Detail to Access Your Account</p>
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Enter User ID" aria-label="Search" aria-describedby="search-addon" onChange={handleChange} />
            </div>
            <div className="SubmitButton mt-20">
              {/* <a href="/password" className="btn btn-btn SubmitBtnStyle">
                Next
              </a> */}
              <button className="btn btn-btn SubmitBtnStyle" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDetail;
