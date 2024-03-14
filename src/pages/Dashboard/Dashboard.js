import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import FooterNav from "../footer/footerNav";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { workOrderList, workOrderWorkersStart, workOrderWorkersStartLeader } from "../../api/worker";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { capitalizeEachWord, getCurrentTime, getDateAfterNoOfDays } from "../../utils/format";
import { getWorkerOrderDetail } from "../../redux/user/user.actions";
import { Field, Form, Formik } from "formik";
const Dashboard = () => {
  const userGlobalState = useSelector((state) => state.userModule);
  const companyGlobalState = useSelector((state) => state.companyModule);
  console.log(userGlobalState?.details, companyGlobalState);
  const [show, setShow] = useState(false);
  const [leaderModalShow, setLeaderModalShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [originalApiWOs, setOriginalApiWOs] = useState([]);
  const [listOfWO, setListOfWO] = useState([]);
  const [startWOId, setStartWOId] = useState([]);
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };
  const [activeDate, setActiveDate] = useState(getDateAfterNoOfDays(0));
  const initialValues = {
    workers: [],
  };
  const handleClose = () => {
    setShow(false);
    startWOId.pop();
    setStartWOId([...startWOId]);
  };
  const handleShow = (id) => {
    startWOId.push(id);
    setStartWOId([...startWOId]);
    setShow(true);
  };
  const handleLeaderClose = (e) => {
    e.stopPropagation();
    setLeaderModalShow(false);
    startWOId.pop();
    setStartWOId([...startWOId]);
  };
  const handleLeaderCloseCross = (e) => {
    setLeaderModalShow(false);
    startWOId.pop();
    setStartWOId([...startWOId]);
  };
  const handleLeaderShow = (id) => {
    startWOId.push(id);
    setStartWOId([...startWOId]);
    setLeaderModalShow(true);
  };
  const handleModalYes = () => {
    if (userGlobalState?.details?.token) {
      workOrderWorkersStartAPICall(startWOId[0], getCurrentTime(), userGlobalState?.details?.token);
    } else {
      alert("Token expired. Login Again");
    }
    startWOId.pop();
    setStartWOId([...startWOId]);
    setShow(false);
  };
  const handleLeaderModalYes = async (values) => {
    dispatch(getWorkerOrderDetail(startWOId[0]));
    if (userGlobalState?.details?.token) {
      const result = await workOrderWorkersStartLeader(startWOId[0], getCurrentTime(), userGlobalState?.details?.token, values.workers);
      setOriginalApiWOs(result?.data);
      setListOfWO(result?.data?.filter((ele) => ele.workstatus === 1 || ele.workstatus === 2));
      navigate("/job-details");
    } else {
      alert("Token expired. Login Again");
    }
    startWOId.pop();
    setStartWOId([...startWOId]);
    setLeaderModalShow(false);
  };

  // Tabbing of counting of status of tasks
  const handleClick = (index) => {
    setActiveIndex(index);
    // setActiveTab(index);
  };
  const handleDateClick = (date) => {
    console.log("date", date);
    setActiveDate(date);
    workOrderListAPICall(date.substring(8), date.substring(5, 7), date.substring(0, 4), userGlobalState?.details?.token);
  };
  const workOrderListAPICall = async (day, month, year, token) => {
    setLoading(true);
    const result = await workOrderList(day, month, year, token);
    setLoading(false);
    if (result.error) {
      navigate("/");
    } else {
      setOriginalApiWOs(result.list);
      setListOfWO(originalApiWOs?.filter((ele) => ele.workstatus === 1 || ele.workstatus === 2));
    }
  };
  const workOrderWorkersStartAPICall = async (wo_id, time, token) => {
    setLoading(true);
    const result = await workOrderWorkersStart(wo_id, time, token);
    setLoading(false);
    if (result.error) alert(result.message);
    else {
      setOriginalApiWOs(result?.data);
      setListOfWO(result?.data?.filter((ele) => ele.workstatus === 1 || ele.workstatus === 2));
    }
  };
  useEffect(() => {
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
    if (userGlobalState?.details?.token) {
      workOrderListAPICall(today.getDate(), today.getMonth() + 1, today.getFullYear(), userGlobalState?.details?.token);
    } else {
      navigate("/");
    }
  }, []);

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
  const leaders = useMemo(() => {
    return originalApiWOs?.filter((ele) => ele?.id === startWOId[0] && ele?.is_leader === true);
  }, [originalApiWOs, startWOId]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="DashboardBg">
          <div className="dd-none dd-block">
            {/* Top section */}
            <div className="TopSection">
              <div className="userName">
                <div className="UserProfile">
                  <div className="UserIcon">
                    <img className="img-fluid" alt="img" src={userGlobalState?.details?.profile_image} />
                  </div>
                  <span>Hi, {capitalizeEachWord(userGlobalState?.details?.name)}</span>
                </div>

                <div className="CompanyIcon">
                  <img className="img-fluid" alt="img" src="/assets/Swif-logo.png" />
                </div>
              </div>
            </div>
            {/* cards with counting  of  WO's and their details*/}
            <div className="GrayBg">
              <div className="WorkOrderSectionTop">
                <div className="OrderFor text-center">
                  <h1>Your Work Orders for</h1>
                </div>

                <div className="calenderWeek">
                  {/* calender dates */}
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
                  {/* counting of status of tasks */}
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
                listOfWO.map((ele, index) => {
                  return (
                    <>
                      <div className="OrderCreate" key={index}>
                        <div
                          onClick={() => {
                            dispatch(getWorkerOrderDetail(ele.id));
                            navigate("/job-details");
                          }}
                        >
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
                            {ele?.start_date === getDateAfterNoOfDays(0) && (ele?.workstatus === 1 || ele?.workstatus === 2) ? (
                              <>
                                <div className="Bottom-button">
                                  <div className="w-40">
                                    <button
                                      variant="primary"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (ele?.is_leader) {
                                          handleLeaderShow(ele?.id);
                                        } else {
                                          handleShow(ele?.id);
                                        }
                                      }}
                                      className="PurpulBtnClock btn btn-btn"
                                    >
                                      <img className="img-fluid" alt="img" src="/assets/Clock-white.png" />
                                      {ele?.workstatus === 1 ? (ele?.is_leader ? "Start" : "Check In") : null}
                                      {ele?.workstatus === 2 ? (ele?.is_leader ? "Stop" : "Check Out") : null}
                                    </button>
                                  </div>
                                  {ele?.is_leader && ele?.workstatus === 1 ? (
                                    <div className="w-30">
                                      <button className="YellowBtn btn btn-btn">
                                        <img className="img-fluid" alt="img" src="/assets/Clock-Time.png" />
                                      </button>
                                    </div>
                                  ) : null}
                                  {ele?.is_leader && ele?.workstatus === 1 ? (
                                    <div className="w-30">
                                      <div className="YellowBtn btn btn-btn">
                                        <img className="img-fluid" alt="img" src="/assets/Anti-clock.png" />
                                      </div>
                                    </div>
                                  ) : null}
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
            {/* modal for leader */}
            {leaderModalShow ? (
              <Modal show={leaderModalShow} onHide={handleLeaderCloseCross}>
                <Modal.Header closeButton>
                  <Modal.Title> Worker List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <>
                    <Formik initialValues={initialValues} onSubmit={handleLeaderModalYes}>
                      {({ isSubmitting }) => (
                        <Form>
                          {leaders.length ? (
                            <>
                              {leaders.map((ele) =>
                                ele.workers.map((item, index) => {
                                  return (
                                    <div className="formCheck d-flex gap-2" key={index}>
                                      <Field type="checkbox" className="formCheckInput " name="workers" id={`${item.name}`} value={`${item.worker_id}`} />
                                      <label className="form-check-label" htmlFor={`${item.name}`}>
                                        {item?.name}
                                      </label>
                                    </div>
                                  );
                                })
                              )}
                            </>
                          ) : null}

                          <div className="d-flex gap-5 mt-3">
                            <button variant="primary" disabled={isSubmitting} className="PurpulBtnClock w-30 btn btn-btn">
                              Submit
                            </button>
                            <button variant="primary" type="button" onClick={handleLeaderClose} className="PurpulBtnClock w-30 btn btn-btn">
                              Cancel
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </>
                </Modal.Body>
              </Modal>
            ) : null}

            {/*  Modal for worker */}
            {show ? (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title> Work Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p className="text-center">Are you sure you want to start work order?</p>
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
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
