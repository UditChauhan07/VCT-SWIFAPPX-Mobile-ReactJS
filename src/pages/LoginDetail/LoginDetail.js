import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginDetail = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  
  const handleNext = () => {
    navigate("/password");
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
            <div class="input-group rounded">
              <input type="search" class="form-control rounded" placeholder="Enter User ID" aria-label="Search" aria-describedby="search-addon" />
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
