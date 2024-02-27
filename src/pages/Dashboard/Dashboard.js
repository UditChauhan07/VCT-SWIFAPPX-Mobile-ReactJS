import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import FooterNav from "../footer/footerNav";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { workOrderList } from "../../api/worker";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
const Dashboard = () => {
  const userGlobalState = useSelector((state) => state.userModule);
  const companyGlobalState = useSelector((state) => state.companyModule);
  console.log(userGlobalState.details, companyGlobalState);
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [originalApiWOs, setOriginalApiWOs] = useState([]);
  const [listOfWO, setListOfWO] = useState([]);
  const [startWOId, setStartWOId] = useState(null);
  const [startWO, setStartWO] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const [activeDate, setActiveDate] = useState(getDateAfterNoOfDays(0));

  const handleClose = () => {
    setShow(false);
    setStartWOId(null);
  };
  const handleShow = (id) => {
    setStartWOId(id);
    setShow(true);
    // navigate("/dashboard");
  };
  const handleModalYes = () => {
    setStartWO(startWOId);
    setShow(false);
  };

  // Tabbing
  const handleClick = (index) => {
    setActiveIndex(index);
    // setActiveTab(index);
  };
  const handleDateClick = (date) => {
    console.log("date", date);
    setActiveDate(date);
    workOrderListAPICall(date.substring(8), date.substring(5, 7), date.substring(0, 4), userGlobalState.details.token);
  };
  const workOrderListAPICall = async (day, month, year, token) => {
    setLoading(true);
    const result = await workOrderList(day, month, year, token);
    setLoading(false);
    if (result.error) alert(result.message);
    else {
      setOriginalApiWOs(result.list);
      setListOfWO(originalApiWOs?.filter((ele) => ele.workstatus === 1 || ele.workstatus === 2));
    }
  };
  useEffect(() => {
    console.log(activeIndex);
    switch (activeIndex) {
      case 0:
        setListOfWO(originalApiWOs?.filter((ele) => ele.workstatus === 1 || ele.workstatus === 2));
        break;
      case 1:
        setListOfWO(originalApiWOs?.filter((ele) => ele.workstatus === 5));
        break;
      case 2:
        setListOfWO(originalApiWOs?.filter((ele) => ele.workstatus === 3));
        break;
      case 3:
        setListOfWO(
          originalApiWOs?.filter(
            (ele) =>
              ele.workstatus === 1 ||
              ele.workstatus === 2 ||
              ele.workstatus === 3 ||
              ele.workstatus === 4 ||
              ele.workstatus === 5 ||
              ele.workstatus === 6 ||
              ele.workstatus === 7 ||
              ele.workstatus === 8 ||
              ele.workstatus === 9
          )
        );
        break;
      default:
        console.log(activeIndex);
    }
  }, [activeIndex, originalApiWOs]);
  console.log("list", listOfWO);
  // worker list api call
  useEffect(() => {
    if (userGlobalState.details.token) {
      workOrderListAPICall(today.getDate(), today.getMonth() + 1, today.getFullYear(), userGlobalState.details.token);
    } else {
      navigate("/");
    }
  }, []);
  const capitalizeEachWord = (str) => {
    // Split the string into an array of words
    let words = str.split(" ");
    // Capitalize the first letter of each word
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    // Join the words back together into a single string
    return words.join(" ");
  };

  const pendingWO = useMemo(() => {
    return originalApiWOs?.filter((ele) => ele.workstatus === 1 || ele.workstatus === 2).length;
  }, [originalApiWOs]);

  const cancelWO = useMemo(() => {
    return originalApiWOs?.filter((ele) => ele.workstatus === 5).length;
  }, [originalApiWOs]);
  const completeWO = useMemo(() => {
    return originalApiWOs?.filter((ele) => ele.workstatus === 3).length;
  }, [originalApiWOs]);
  const totalWO = useMemo(() => {
    return originalApiWOs?.filter(
      (ele) =>
        ele.workstatus === 1 ||
        ele.workstatus === 2 ||
        ele.workstatus === 3 ||
        ele.workstatus === 4 ||
        ele.workstatus === 5 ||
        ele.workstatus === 6 ||
        ele.workstatus === 7 ||
        ele.workstatus === 8 ||
        ele.workstatus === 9
    ).length;
  }, [originalApiWOs]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="DashboardBg">
          <div className="dd-none dd-block">
            <div className="TopSection">
              <div className="userName">
                <div className="UserProfile">
                  <div className="UserIcon">
                    <img className="img-fluid" alt="img" src="/assets/UserIcon.png" />
                  </div>
                  <span>Hi, {capitalizeEachWord(userGlobalState.details.name)}</span>
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

                <div className="calenderWeek">
                  <div className="WeeklyCal">
                    <div
                      className={`DayDate ${activeDate === getDateAfterNoOfDays(0) ? "Active" : null}`}
                      id={getDateAfterNoOfDays(0).substring(8)}
                      onClick={() => handleDateClick(getDateAfterNoOfDays(0))}
                    >
                      <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(0))}</p>
                      <p className="WeekDate">{getDateAfterNoOfDays(0).substring(8)}</p>
                    </div>
                    {companyGlobalState.topBarPermission ? (
                      <>
                        <div
                          className={`DayDate ${activeDate === getDateAfterNoOfDays(1) ? "Active" : null}`}
                          id={getDateAfterNoOfDays(1).substring(8)}
                          onClick={() => handleDateClick(getDateAfterNoOfDays(1))}
                        >
                          <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(1))}</p>
                          <p className="WeekDate">{getDateAfterNoOfDays(1).substring(8)}</p>
                        </div>
                        <div className={`DayDate ${activeDate === getDateAfterNoOfDays(2) ? "Active" : null}`} onClick={() => handleDateClick(getDateAfterNoOfDays(2))}>
                          <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(2))}</p>
                          <p className="WeekDate">{getDateAfterNoOfDays(2).substring(8)}</p>
                        </div>
                        <div className={`DayDate ${activeDate === getDateAfterNoOfDays(3) ? "Active" : null}`} onClick={() => handleDateClick(getDateAfterNoOfDays(3))}>
                          <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(3))}</p>
                          <p className="WeekDate">{getDateAfterNoOfDays(3).substring(8)}</p>
                        </div>
                        <div className={`DayDate ${activeDate === getDateAfterNoOfDays(4) ? "Active" : null}`} onClick={() => handleDateClick(getDateAfterNoOfDays(4))}>
                          <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(4))}</p>
                          <p className="WeekDate">{getDateAfterNoOfDays(4).substring(8)}</p>
                        </div>
                        <div className={`DayDate ${activeDate === getDateAfterNoOfDays(5) ? "Active" : null}`} onClick={() => handleDateClick(getDateAfterNoOfDays(5))}>
                          <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(5))}</p>
                          <p className="WeekDate">{getDateAfterNoOfDays(5).substring(8)}</p>
                        </div>
                        <div className={`DayDate ${activeDate === getDateAfterNoOfDays(6) ? "Active" : null}`} onClick={() => handleDateClick(getDateAfterNoOfDays(6))}>
                          <p className="WeekDay">{getDayOfWeek(getDateAfterNoOfDays(6))}</p>
                          <p className="WeekDate">{getDateAfterNoOfDays(6).substring(8)}</p>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="FourTaskShow">
                    <div className="Pending">
                      <li onClick={() => handleClick(0)} className={activeIndex === 0 ? "active" : ""}>
                        <div className="YellowBg">{pendingWO}</div>
                        <p>Pending</p>
                      </li>
                    </div>

                    <div className="Pending">
                      <li onClick={() => handleClick(1)} className={activeIndex === 1 ? "active" : ""}>
                        <div className="RedBg">{cancelWO}</div>
                        <p>Cancel</p>
                      </li>
                    </div>
                    <div className="Pending">
                      <li onClick={() => handleClick(2)} className={activeIndex === 2 ? "active" : ""}>
                        <div className="GreenBg">{completeWO}</div>
                        <p>Completed</p>
                      </li>
                    </div>
                    <div className="Pending">
                      <li onClick={() => handleClick(3)} className={activeIndex === 3 ? "active" : ""}>
                        <div className="BlueBg">{totalWO}</div>
                        <p>Total</p>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              {/* cards of WO */}
              {listOfWO.length ? (
                listOfWO.map((ele) => {
                  return (
                    <>
                      <div className="OrderCreate">
                        {/* <div onClick={() => navigate("/final-job-detail")}> */}
                        <div>
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
                            {ele?.workstatus === 1 && ele?.start_date === getDateAfterNoOfDays(0) ? (
                              <>
                                <div className="Bottom-button">
                                  <div className="w-40">
                                    <button variant="primary" onClick={() => handleShow(ele?.id)} className="PurpulBtnClock btn btn-btn">
                                      <img className="img-fluid" alt="img" src="/assets/Clock-white.png" />
                                      {startWO && ele?.id === startWOId ? (ele?.is_leader ? "Stop" : "Check Out") : ele?.is_leader ? "Start" : "Check In"}
                                    </button>
                                  </div>
                                  {startWO ? null : (
                                    <>
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
                                    </>
                                  )}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <div className="OrderCreate">
                    <h2>No Work Order</h2>
                  </div>
                </>
              )}
            </div>
            <FooterNav></FooterNav>
            {/* modal */}
            {/* {console.log(show)} */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title> Work Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you want to start work order?
                <div className="d-flex gap-5 mt-3">
                  <button variant="primary" onClick={handleModalYes} className="PurpulBtnClock w-30 btn btn-btn">
                    Yes
                  </button>
                  <button variant="primary" onClick={handleClose} className="PurpulBtnClock w-30 btn btn-btn">
                    No
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
