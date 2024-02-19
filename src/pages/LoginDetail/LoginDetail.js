import React from "react";

const LoginDetail = () => {
  return (
    <div>
      <div className="dd-none dd-block p20">
        <div className="vCenter">
          <div className="w-100">
            <div className="logo ">
              <img className="img-fluid" src="/assets/dx-Icon.png" />
            </div>
            <p className="SearchCompanyText">
              Enter Your Login Detail to Access Your Account
            </p>
            <div class="input-group rounded">
              <input
                type="search"
                class="form-control rounded"
                placeholder="Enter User ID"
                aria-label="Search"
                aria-describedby="search-addon"
              />
             
            </div>
            <div className="SubmitButton mt-20">
              <a href="/password" className="btn btn-btn SubmitBtnStyle">
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDetail;
