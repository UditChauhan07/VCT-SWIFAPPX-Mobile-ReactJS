import React from "react";
import "./style.css";

const BusinessDetail = () => {
  return (
    <div className="dd-none dd-block">
      <div className="TopSection">
        <div className="backArrow">
          <a href="/">
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              class="css-8mmkcg"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </a>
        </div>
        <div className="CompanyLogo">
          <img className="img-fluid" src="/assets/Swif-logo.png" alt="logo" />
        </div>
      </div>
      <div className="GrayBg">
        <div className="CompanylogoSection">
          <div className="">
            <img
              className="img-fluid"
              src="/assets/homecleanz-logo.png"
              alt="logo"
            />
          </div>
        </div>
        <div className="CompanyInfo">
          <div className="CompanyName">HomeCleanz</div>
          <p>Victor Tai</p>
          <div className="Location">7 Jalan Saudara Ku Singapore 457444</div>
          <div className="CallNumber">
            <button className="CallButton btn btn-btn">Call</button>65-64403342
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
                <div className="weeks">MON, TUE, WED, THR, FRI, SAT, SUN</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Executive Name</div>
              </div>
              <div className="col-6">
                <div className="weeks">Victor Tai</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Company Email</div>
              </div>
              <div className="col-6">
                <div className="weeks">contact@homeclean.com</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">NEA</div>
              </div>
              <div className="col-6">
                <div className="weeks">NEAHC4565456</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Executive Contact Number</div>
              </div>
              <div className="col-6">
                <div className="weeks">65-64403342</div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Quotation`s Prefix</div>
              </div>
              <div className="col-6">
                <div className="weeks">QT</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Contract`s Prefix</div>
              </div>
              <div className="col-6">
                <div className="weeks">CT</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Work Order`s Prefix</div>
              </div>
              <div className="col-6">
                <div className="weeks">WO</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Amount to collect Show</div>
              </div>
              <div className="col-6">
                <div className="weeks">Yes</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="WorkDays">Mobile App top Bar Week Show</div>
              </div>
              <div className="col-6">
                <div className="weeks">Yes</div>
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
            <a  href="/LoginDetail" className="ConfirmedButton btn btn-btn">Confirmed</a>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
