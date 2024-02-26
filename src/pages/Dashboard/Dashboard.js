import React, { useEffect, useState } from "react";
import "./style.css";
import FooterNav from "../footer/footerNav";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { workOrderList } from "../../api/worker";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userGlobalState = useSelector((state) => state.userModule);
  const companyGlobalState = useSelector((state) => state.companyModule);
  console.log(userGlobalState.details,companyGlobalState);
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [listOfWO, setListOfWO] = useState([]);
  const today = new Date();
  const navigate = useNavigate();
  const getDateAfterNoOfDays = (noOfDays) => {
    const dateAfterSevenDays = new Date(today);
    dateAfterSevenDays.setDate(today.getDate() + noOfDays);
    const year = dateAfterSevenDays.getFullYear();
    const month = String(dateAfterSevenDays.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(dateAfterSevenDays.getDate()).padStart(2, "0");
    // Return the date in "YYYY-MM-DD" format
    return `${year}-${month}-${day}`;
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Tabbing
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const workOrderListAPICall = async () => {
    const result = await workOrderList(today.getDate(), today.getMonth() + 1, today.getFullYear(), userGlobalState.details.token);
    if (result.error) alert(result.message);
    else {
      setListOfWO(result.list);
    }
  };
  console.log("list", listOfWO);
  // worker list api call
  useEffect(() => {
    workOrderListAPICall();
  }, []);

  useEffect(() => {
    if (!userGlobalState.details.token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="DashboardBg">
      <div className="dd-none dd-block">
        <div className="TopSection">
          <div className="userName">
            <div className="UserProfile">
              <div className="UserIcon">
                <img className="img-fluid" alt="img" src="/assets/UserIcon.png" />
              </div>
              <span>Hi, {userGlobalState.details.name}</span>
            </div>

            <div className="CompanyIcon">
              <img className="img-fluid" alt="img" src="/assets/Swif-logo.png" />
            </div>
          </div>
        </div>
        <div className="GrayBg">
          <div className="WorkOrderSectionTop">
            <div className="OrderFor text-center">
              <h1>Your Work Orders for</h1>
            </div>
            {/* calender dates */}
            {companyGlobalState.topBarPermission? <div className="calenderWeek">
              <div className="WeeklyCal">
                <div className="DayDate Active">
                  <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(0))}</p>
                  <p className="WeekDate">{getDateAfterNoOfDays(0).substring(8)}</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(1))}</p>
                  <p className="WeekDate">{getDateAfterNoOfDays(1).substring(8)}</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(2))}</p>
                  <p className="WeekDate">{getDateAfterNoOfDays(2).substring(8)}</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(3))}</p>
                  <p className="WeekDate">{getDateAfterNoOfDays(3).substring(8)}</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(4))}</p>
                  <p className="WeekDate">{getDateAfterNoOfDays(4).substring(8)}</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(5))}</p>
                  <p className="WeekDate">{getDateAfterNoOfDays(5).substring(8)}</p>
                </div>
                <div className="DayDate ">
                  <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(6))}</p>
                  <p className="WeekDate">{getDateAfterNoOfDays(6).substring(8)}</p>
                </div>
              </div>

              <div className="FourTaskShow">
                <div className="Pending">
                  <li onClick={() => handleClick(0)} className={activeIndex === 0 ? "active" : ""}>
                    <div className="YellowBg">3</div>
                    <p>Pending</p>
                  </li>
                </div>

                <div className="Pending">
                  <li onClick={() => handleClick(1)} className={activeIndex === 1 ? "active" : ""}>
                    <div className="RedBg">0</div>
                    <p>Cancel</p>
                  </li>
                </div>
                <div className="Pending">
                  <li onClick={() => handleClick(2)} className={activeIndex === 2 ? "active" : ""}>
                    <div className="GreenBg">1</div>
                    <p>Completed</p>
                  </li>
                </div>
                <div className="Pending">
                  <li onClick={() => handleClick(3)} className={activeIndex === 3 ? "active" : ""}>
                    <div className="BlueBg">4</div>
                    <p>Total</p>
                  </li>
                </div>
              </div>
            </div>:null}
           
          </div>
          {/* cards of WO */}
          {listOfWO.length ? (
            listOfWO.map((ele) => {
              return (
                <>
                  <div className="OrderCreate">
                    <div onClick={() => navigate("/final-job-detail")}>
                      <h2>{ele?.customer_name ?? "N/A"}</h2>

                      <div className="OrderDetailsInfo">
                        <div className="InnerInfo">
                          <img className="img-fluid" src="/assets/call-mess.png" alt="img" />
                          <span>{ele?.customer_contact_number ?? "N/A"}</span>
                        </div>
                        <div className="InnerInfo">
                          <img className="img-fluid" alt="img" src="/assets/Home_icon.png" />
                          <span>{ele?.customer_address ?? "N/A"}</span>
                        </div>
                        <div className="InnerInfo">
                          <img className="img-fluid" alt="img" src="/assets/Read-icon.png" />
                          <span>{ele?.service_name ?? "N/A"}</span>
                        </div>
                        <div className="ClockOrRead">
                          <div className="InnerInfo w-50">
                            <img className="img-fluid" alt="img" src="/assets/Clock.png" />
                            <span>{ele?.expected_start_time ?? "N/A"}</span>
                          </div>
                          <div className="InnerInfo w-50">
                            <img className="img-fluid" alt="img" src="/assets/Reading.png" />
                            <span>{ele?.contractNumber ?? "N/A"}</span>
                          </div>
                        </div>
                        <div className="Bottom-button">
                          <div className="w-40">
                            <button variant="primary" onClick={handleShow} className="PurpulBtnClock btn btn-btn">
                              <img className="img-fluid" alt="img" src="/assets/Clock-white.png" />
                              {ele?.is_leader ? "Start" : "Check In"}
                            </button>
                          </div>
                          {ele?.is_leader ? (
                            <div className="w-30">
                              <button className="YellowBtn btn btn-btn">
                                <img className="img-fluid" alt="img" src="/assets/Clock-Time.png" />
                              </button>
                            </div>
                          ) : null}
                          {ele?.is_leader ? (
                            <div className="w-30">
                              <div className="YellowBtn btn btn-btn">
                                <img className="img-fluid" alt="img" src="/assets/Anti-clock.png" />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <FooterNav></FooterNav>
        {/* modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Work Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you want to start work order</Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
