import React, { useState } from "react";
import "./style.css";
import FooterNav from "../footer/footerNav";
import Modal from "react-bootstrap/Modal";
const Dashboard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="DashboardBg">
      <div className="dd-none dd-block">
        <div className="TopSection">
          <div className="userName">
            <div className="UserProfile">
              <div className="UserIcon">
                <img className="img-fluid" src="/assets/UserIcon.png" />
              </div>
              <span>John vick</span>
            </div>

            <div className="CompanyIcon">
              <img className="img-fluid" src="/assets/Swif-logo.png" />
            </div>
          </div>
        </div>
        <div className="GrayBg">
          <div className="WorkOrderSectionTop">
            <div className="OrderFor text-center">
              <h1>Your Work Orders for</h1>
            </div>
            <div className="calenderWeek">
              <div className="WeeklyCal">
                <div className="DayDate Active">
                  <p className="WeekDay">Mon</p>
                  <p className="WeekDate">12</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">Tue</p>
                  <p className="WeekDate">13</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">Wed</p>
                  <p className="WeekDate">14</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">Thr</p>
                  <p className="WeekDate">15</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">Fri</p>
                  <p className="WeekDate">16</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">Sat</p>
                  <p className="WeekDate">17</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">Sun</p>
                  <p className="WeekDate">18</p>
                </div>
              </div>
              <div className="FourTaskShow">
                <div className="Pending">
                  <a className="#">
                    <div className="YellowBg active">3</div>
                    <p>Pending</p>
                  </a>
                </div>

                <div className="Pending">
                  <a className="#">
                    <div className="RedBg">0</div>
                    <p>Cancel</p>
                  </a>
                </div>
                <div className="Pending">
                  <a className="#">
                    <div className="GreenBg">1</div>
                    <p>Completed</p>
                  </a>
                </div>
                <div className="Pending">
                  <a className="#">
                    <div className="BlueBg">4</div>
                    <p>Total</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="OrderCreate">
            <a href="/final-job-detail">
              <h2>Celeste Gomez</h2>
               </a>
              <div className="OrderDetailsInfo">
                <div className="InnerInfo">
                  <img className="img-fluid" src="/assets/call-mess.png" />
                  <span>9876543210</span>
                </div>
                <div className="InnerInfo">
                  <img className="img-fluid" src="/assets/Home_icon.png" />
                  <span>
                    Quia Ispum Voluptat, Officiis accusantium Veniam sit dolor,
                    Ispum autem dicta fu,Vanuatu, 69833
                  </span>
                </div>
                <div className="InnerInfo">
                  <img className="img-fluid" src="/assets/Read-icon.png" />
                  <span>Debra Melton</span>
                </div>
                <div className="ClockOrRead">
                  <div className="InnerInfo w-50">
                    <img className="img-fluid" src="/assets/Clock.png" />
                    <span>09:00 am</span>
                  </div>
                  <div className="InnerInfo w-50">
                    <img className="img-fluid" src="/assets/Reading.png" />
                    <span>PRHU20202290027</span>
                  </div>
                </div>
                <div className="Bottom-button">
                  <div className="w-40">
                    <button variant="primary" onClick={handleShow} className="PurpulBtnClock btn btn-btn">
                      <img
                        className="img-fluid"
                        src="/assets/Clock-white.png"
                      />
                      Start
                    </button>
                  </div>
                  <div className="w-30">
                    <button className="YellowBtn btn btn-btn">
                      <img className="img-fluid" src="/assets/Clock-Time.png" />
                    </button>
                  </div>
                  <div className="w-30">
                    
                      <div className="YellowBtn btn btn-btn">
                        <img
                          className="img-fluid"
                          src="/assets/Anti-clock.png"
                        />
                      </div>
                   
                  </div>
                </div>
              </div>
           
          </div>
          <div className="OrderCreate mt-3">
            <a href="/job-details">
              <h2>Xavier Smith</h2>
              <div className="OrderDetailsInfo">
                <div className="InnerInfo">
                  <img className="img-fluid" src="/assets/call-mess.png" />
                  <span>978521457</span>
                </div>
                <div className="InnerInfo">
                  <img className="img-fluid" src="/assets/Home_icon.png" />
                  <span>
                    Quia Ispum Voluptat, Officiis accusantium Veniam sit dolor,
                    Ispum autem dicta fu,Vanuatu, 69833
                  </span>
                </div>
                <div className="InnerInfo">
                  <img className="img-fluid" src="/assets/Read-icon.png" />
                  <span>Debra Melton</span>
                </div>
                <div className="ClockOrRead">
                  <div className="InnerInfo w-50">
                    <img className="img-fluid" src="/assets/Clock.png" />
                    <span>09:00 am</span>
                  </div>
                  <div className="InnerInfo w-50">
                    <img className="img-fluid" src="/assets/Reading.png" />
                    <span>PRHU20202290027</span>
                  </div>
                </div>
                <div className="Bottom-button">
                  <div className="w-40">
                    
                      <button className="PurpulBtnClock  btn btn-btn">
                        <img
                          className="img-fluid"
                          src="/assets/Clock-white.png"
                        />
                        Start
                      </button>
                    
                  </div>
                  <div className="w-30">
                   
                      <button className="YellowBtn btn btn-btn">
                        <img
                          className="img-fluid"
                          src="/assets/Clock-Time.png"
                        />
                      </button>
                    
                  </div>
                  <div className="w-30">
                    
                      <div className="YellowBtn btn btn-btn">
                        <img
                          className="img-fluid"
                          src="/assets/Anti-clock.png"
                        />
                      </div>
                   
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <FooterNav></FooterNav>
        {/* modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Work Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you want to start work order
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
