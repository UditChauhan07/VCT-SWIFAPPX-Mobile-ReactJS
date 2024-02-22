import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserPassword } from '../../redux/user/user.actions';

const Password = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  const handleNext = () => {
    dispatch(getUserPassword(userName));
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
              <img className="img-fluid" src="/assets/dx-Icon.png" />
            </div>
            <p className="SearchCompanyText">
              Enter Your Login Detail to Access Your Account
            </p>
            <div class="input-group rounded">
              <input
                type="search"
                class="form-control rounded"
                placeholder="Password"
                aria-label="Search"
                aria-describedby="search-addon"
              />
             
            </div>
            <div className="SubmitButton mt-20">
              <a href="/dashboard" className="btn btn-btn SubmitBtnStyle">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
            
        </div>
    );
}

export default Password;
