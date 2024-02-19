import React from "react";
import "./style.css";
import FooterNav from "../footer/footerNav";

const JobDetails = () => {
  return (
    <div>
      <div class="dd-none dd-block">
        <div className="TopSection">
          <div className="backArrow">
            <a href="/dashboard">
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
          {/* <div className="CompanyLogo">
            <img className="img-fluid" src="/assets/Swif-logo.png" alt="logo" />
          </div> */}
        </div>
        <section className="JobHolder">
          <div className="NameWithTasks">
            <h1>Xavier Smith</h1>
            <div className="TaskCompleted">
              <div className="Completed">9 Tasks Completed</div>
              <div className="PicTaken">3 Picture Taken</div>
            </div>
          </div>

          <div>
            <div class="InnerInfo">
              <img class="img-fluid" src="/assets/call-mess.png" />
              <span>985362525, 785485412</span>
            </div>
          </div>
          <div class="InnerInfo">
            <img class="img-fluid" src="/assets/Home_icon.png" />
            <span>24, smomen road,inner circle, Montana street singapore</span>
          </div>
        </section>
        <section className="GrayBg">
          <div class="InnerInfo">
            <img class="img-fluid" src="/assets/Read-icon.png" />
            <h2>Penthouse Cleaning</h2>
          </div>
          <hr></hr>
          <div className="RegularCleaning">
            <div className="IconPlusCleaning">
              <img className="img-fluid" src="/assets/check-circle.png" />
              <p className="m-0">Regular Cleaning</p>
            </div>
            <div className="IconPlusCleaning">
              <div class="form-group">               
                <select class="form-control" id="sel1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <p className="m-0">$399.00</p>
            </div>
          </div>
          <hr></hr>
        </section>
        <FooterNav></FooterNav>
      </div>
    </div>
  );
};

export default JobDetails;
