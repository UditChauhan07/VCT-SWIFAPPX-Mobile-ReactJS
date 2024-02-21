import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyId } from "../../redux/company/company.actions";
import { getCompaniesList } from "../../api/company";

const BusinessDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.companyModule);
  const [companyDetails, setCompanyDetails] = useState([]);
  const handleBack = () => {
    dispatch(getCompanyId(0));
    navigate("/");
  };
  const companiesListApiCall = async () => {
    const result = await getCompaniesList();
    if (result.error) alert("You are offline. Reconnecting...");
    else setCompanyDetails(result.details.filter((ele) => ele.id == globalState.company_id )[0]);
  };

  useEffect(() => {
    companiesListApiCall();
  }, []);
  console.log((companyDetails));
  console.log((companyDetails?.certificationString
    ));
  return (
    <div className="dd-none dd-block">
      <div className="TopSection">
        <div className="backArrow">
          {/* <a href="/"> */}
          <button className="bg-transparent border-0" onClick={handleBack}>
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg">
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </button>
          {/* </a> */}
        </div>
        <div className="CompanyLogo">
          <img className="img-fluid" src="/assets/Swif-logo.png" alt="logo" />
        </div>
      </div>
      <div className="GrayBg">
        <div className="CompanylogoSection">
          <div className="">
            <img className="img-fluid" src={companyDetails?.company_logo ?? ""} alt="logo" />
          </div>
        </div>
        <div className="CompanyInfo">
          <div className="CompanyName">{companyDetails?.name ?? ""}</div>
          <p>{companyDetails?.ownerName ?? ""}</p>
          <div className="Location">
            {companyDetails?.address ?? ""}
            {companyDetails.city ? `, ${companyDetails.city}` : ""}
            {companyDetails.state ? `, ${companyDetails.state}` : ""}
            {companyDetails.country ? `, ${companyDetails.country}` : ""}
            {companyDetails.zip ? `, ${companyDetails.zip}` : ""}{" "}
          </div>
          <div className="CallNumber">
            <button className="CallButton btn btn-btn">Call</button>
            {companyDetails?.contactNumber ?? "N/A"}
          </div>
        </div>
        <hr></hr>
        <div className="companyDetails">
          <h1>Company Details</h1>
          <div className="AllDetails ">
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Working Days</div>
              </div>
              <div className="col-6">
                <div className="weeks">
                  {companyDetails?.workingDay?.monday ? "MON" : ""}
                  {companyDetails?.workingDay?.tuesday ? ", TUE" : ""}
                  {companyDetails?.workingDay?.wednesday ? ", WED" : ""}
                  {companyDetails?.workingDay?.thursday ? ", THR" : ""}
                  {companyDetails?.workingDay?.friday ? ", FRI" : ""}
                  {companyDetails?.workingDay?.saturday ? ", SAT" : ""}
                  {companyDetails?.workingDay?.sunday ? ", SUN" : ""}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Executive Name</div>
              </div>
              <div className="col-6">
                <div className="weeks">{companyDetails?.executiveName ?? ""}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Company Email</div>
              </div>
              <div className="col-6">
                <div className="weeks">{companyDetails?.email ?? ""}</div>
              </div>
            </div>

            {(companyDetails?.certificationString)
              ? JSON.parse(companyDetails?.certificationString).map((ele) => {
                  return (
                    <div className="row">
                      <div className="col-6">
                        <div className="WorkDays">{ele.name??""}</div>
                      </div>
                      <div className="col-6">
                        <div className="weeks">{ele.number??""}</div>
                      </div>
                    </div>
                  );
                })
              : null}
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Executive Contact Number</div>
              </div>
              <div className="col-6">
                <div className="weeks">{companyDetails?.executiveContactNumber ?? ""}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Quotation`s Prefix</div>
              </div>
              <div className="col-6">
                <div className="weeks">{companyDetails?.quotation_prefix ?? ""}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Contract`s Prefix</div>
              </div>
              <div className="col-6">
                <div className="weeks">{companyDetails?.contract_prefix ?? ""}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Work Order`s Prefix</div>
              </div>
              <div className="col-6">
                <div className="weeks">{companyDetails?.wo_prefix ?? ""}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Amount to collect Show</div>
              </div>
              <div className="col-6">
                <div className="weeks">{companyDetails?.priceViewPermission ? "Yes" : "No"}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Mobile App top Bar Week Show</div>
              </div>
              <div className="col-6">
                <div className="weeks">{companyDetails?.topBarPermission ? "Yes" : "No"}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Expected Time Required</div>
              </div>
              <div className="col-6">
                <div className="weeks">04:00:00 Hrs</div>
              </div>
            </div>
          </div>
        </div>
        <div className="PurpulLeftBorder">
          <div className="ContactUsText">If you need a services before or after the time availabe please contact us.</div>
        </div>
        <div>
          {/* <a href="/LoginDetail" className="ConfirmedButton btn btn-btn"> */}
          <button className="ConfirmedButton btn btn-btn" onClick={() => navigate("/LoginDetail")}>
            Confirmed
          </button>
          {/* </a> */}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
