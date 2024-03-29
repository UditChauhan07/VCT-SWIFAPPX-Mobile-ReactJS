import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCompaniesList } from "../../api/company";
import { getCompanyId, getCompanyName, getLogoCompany, taxValueOfCompany, topBarPermission } from "../../redux/company/company.actions";
import { useNavigate } from "react-router-dom";
import { useInternetStatusCheck } from "../../utils/updation";

const Index = () => {
  const online = useInternetStatusCheck();

  const globalState = useSelector((state) => state.companyModule);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companiesList, setCompaniesList] = useState([]);

  const companiesListApiCall = async () => {
    const result = await getCompaniesList();
    if (result.error) alert("You are offline. Reconnecting...");
    else setCompaniesList(result.details);
  };

  useEffect(() => {
    if (online) companiesListApiCall();
  }, []);

  console.log("globalState", globalState);

  const handleCompanySubmit = () => {
    if (globalState.company_id) {
      navigate("/BusinessDetail");
    } else alert("Pick one company to proceed.");
  };

  return (
    <div className="dd-none dd-block p20">
      <div className="vCenter">
        <div className="w-100">
          <div className="logo ">
            <img className="img-fluid" src="/assets/Swif-logo.png" alt="img" />
          </div>
          <p className="SearchCompanyText">Search Company Name</p>
          <div className="input-group rounded">
            <Select
              className="form-control p-0 rounded"
              placeholder="Company Name"
              options={companiesList.map((ele) => ({
                value: ele.id,
                label: ele.name,
              }))}
              defaultValue={online ? null : { value: globalState.company_id, label: globalState.company_name }}
              onChange={(option) => {
                dispatch(getCompanyId(option.value));
                dispatch(getCompanyName(option.label));
                dispatch(topBarPermission(companiesList.filter((ele) => ele.id === option.value)[0].topBarPermission));
                dispatch(taxValueOfCompany(companiesList.filter((ele) => ele.id === option.value)[0].tax));
                dispatch(getLogoCompany(companiesList.filter((ele) => ele.id === option.value)[0].company_logo));
              }}
            />

            <span className="input-group-text border-0" id="search-addon">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path>
              </svg>
            </span>
          </div>
          {globalState.company_id ? (
            <div className="SubmitButton mt-20">
              <button className="btn btn-btn SubmitBtnStyle" onClick={handleCompanySubmit}>
                Submit
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Index;
