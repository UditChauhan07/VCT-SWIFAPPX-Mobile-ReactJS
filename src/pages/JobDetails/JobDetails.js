import React, { useEffect, useState } from "react";
import Styles from "./style.module.css";
import FooterNav from "../footer/footerNav";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import Loading from "../../components/Loading";
import { getAdhocItemsList, removePicture, uploadPicture, workerOrderDetail } from "../../api/worker";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAddress } from "../../redux/user/user.actions";
import { capitalizeEachWord, convertTimeInAMPM, formatDateString, formatTimestamp } from "../../utils/format";
import { WhiteBackArrow } from "../../utils/svg";
import { removeServiceSubItem, toAddAdhocItem, toCheckServiceSubItem, updateQuantityOfServiceSubItem } from "../../api/leader";
import ModalForAuthentication from "../../components/ModalForAuthentication";

const JobDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userGlobalState = useSelector((state) => state.userModule);
  console.log(userGlobalState);
  const [loading, setLoading] = useState(false);
  const [originalApiWODetail, setOriginalApiWODetail] = useState([]);
  const [show, setShow] = useState(false);
  const [taskCounting, setTaskCounting] = useState(0);
  const [activeService, setActiveService] = useState();
  const [adhocItemsList, setAdhocItemsList] = useState([]);
  const [adhocModalShow, setAdhocModalShow] = useState(false);
  const [quantityModalShow, setQuantityModalShow] = useState(false);
  const [quantitySelector, setQuantitySelector] = useState(false);
  const [alertForSameItem, setAlertForSameItem] = useState(false);
  const [activeAdhocItem, setActiveAdhocItem] = useState();
  const [confirmServiceItem, setConfirmServiceItem] = useState(false);
  const [itemRemoveModal, setItemRemoveModal] = useState(false);
  const [pictureUpload, setPictureUpload] = useState(false);
  const [pictureDelete, setPictureDelete] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // modals show/hide
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleItemRemoveModal = () => setItemRemoveModal(false);
  const handleAdhocModalClose = () => setAdhocModalShow(false);
  const handleAlertForSameItem = () => setAlertForSameItem(false);
  const handleQuantityModalShow = () => setQuantityModalShow(false);
  const handleQuantitySelectorClose = () => setQuantitySelector(false);
  const handleConfirmServiceModalShow = () => setConfirmServiceItem(false);
  const handlePictureUpload = () => setPictureUpload(false);
  const handlePictureDelete = () => setPictureDelete(false);
  const handleSuccessfully = () => setSuccessfully(false);

  // API Call for details
  const getWorkerOrderDetailApiCall = async (id, token) => {
    setLoading(true);
    const result = await workerOrderDetail(id, token);
    console.log("result", result);
    setLoading(false);
    if (result === 401) {
      console.log("4777");
      setIsAuthModalOpen(true);
    } else {
      getAdhocItemsListApiCall(result.detail.ad_hoc_catid, userGlobalState.details.token);
      const address = `${result.detail?.block}${result.detail?.street ? `, ${result.detail?.street}` : ""}${result.detail?.unit ? `, ${result.detail?.unit}` : ""}${
        result.detail?.country ? `, ${result.detail?.country}` : ""
      }${result.detail?.zip ? `, ${result.detail?.zip}` : ""}`;
      if (result.detail?.workstatusname === "In Progress") {
        setTaskCounting(taskCounting + 1);
      }
      setOriginalApiWODetail(result.detail);
      dispatch(getAddress(address));
    }
  };
  // // to update added adhoc items list
  // useEffect(() => {
  //   setSelectedAdhocItemList(originalApiWODetail?.ad_hoc_items?.sub_items?.map((ele) => ele));
  // }, [originalApiWODetail]);

  // API Call for getting Adhoc Items List
  const getAdhocItemsListApiCall = async (id, token) => {
    setLoading(true);
    const result = await getAdhocItemsList(id, token);
    setLoading(false);
    if (result.error) navigate("/");
    else setAdhocItemsList(result.content);
  };
  // API Call for update quantity of service sub Item
  const updateQuantityOfServiceSubItemAPICall = async (id, quantity, token) => {
    setLoading(true);
    const result = await updateQuantityOfServiceSubItem(id, quantity, token);
    if (result.error) navigate("/");
    else setOriginalApiWODetail(result.data);
    setLoading(false);
  };
  // API Call to check/ finalize service sub Item
  const toCheckServiceSubItemAPICall = async (id, quantity, type, token) => {
    setLoading(true);
    const result = await toCheckServiceSubItem(id, quantity, type, token);
    setLoading(false);
    if (result.error) navigate("/");
    else setOriginalApiWODetail(result.data);
  };
  // API Call to add adhoc Item
  const toAddAdhocItemAPICall = async (workorder_id, category_id, item_id, quantity, accessToken) => {
    console.log("apai");
    setLoading(true);
    const result = await toAddAdhocItem(workorder_id, category_id, item_id, quantity, accessToken);
    console.log("qq", result);
    setLoading(false);
    if (result.error) navigate("/");
    else setOriginalApiWODetail(result.data);
  };
  // API Call to remove adhoc Item
  const toRemoveAdhocItemAPICall = async (item_id, accessToken) => {
    setLoading(true);
    const result = await removeServiceSubItem(item_id, accessToken);
    setLoading(false);
    if (result.error) navigate("/");
    else setOriginalApiWODetail(result.data);
  };
  // API Call to Upload Picture
  const toUploadPictureAPICall = async (item_id, file, accessToken) => {
    setLoading(true);
    const result = await uploadPicture(item_id, file, accessToken);
    setLoading(false);
    if (result.error) navigate("/");
    else if (result.status === 400) {
      setSuccessfully(true);
    } else {
      getWorkerOrderDetailApiCall(userGlobalState.workerOrderId, userGlobalState.details.token);
      setPictureUpload(true);
    }
  };
  // API Call to remove Picture
  const toRemovePictureAPICall = async (image_id, accessToken) => {
    console.log("apai");
    setLoading(true);
    const result = await removePicture(image_id, accessToken);
    console.log("qq", result);
    setLoading(false);
    if (result.error) navigate("/");
    // else if (result.status === 400) {
    //   setSuccessfully(true);
    // }
    else {
      getWorkerOrderDetailApiCall(userGlobalState.workerOrderId, userGlobalState.details.token);
      setPictureDelete(true);
    }
  };

  useEffect(() => {
    if (userGlobalState?.details?.token) {
      getWorkerOrderDetailApiCall(userGlobalState.workerOrderId, userGlobalState.details.token);
    } else {
      <ModalForAuthentication show={true} />;
    }
  }, []);

  console.log("originalApiWODetail", originalApiWODetail);
  const arrayOf20numbers = Array.from({ length: 20 }, (_, index) => index + 1);

  const handleAdhocItemChange = (option) => {
    const filteredData = originalApiWODetail?.ad_hoc_items?.sub_items?.filter((ele) => ele?.name === option.label);
    console.log(filteredData);
    if (filteredData?.length) {
      setAlertForSameItem(true);
      setShow(false);
    } else {
      toAddAdhocItemAPICall(userGlobalState?.workerOrderId, adhocItemsList.filter((ele) => ele.id === option.value)?.[0]?.category_id, option.value, 1, userGlobalState.details.token);
      setTimeout(() => {
        setShow(false);
        setAdhocModalShow(true);
        setTaskCounting(taskCounting + 1);
      }, 200);
    }
  };
  const handleRemoveSelectedAdhocItem = () => {
    setTaskCounting(taskCounting - 1);
    console.log(activeAdhocItem);
    toRemoveAdhocItemAPICall(activeAdhocItem?.id, userGlobalState.details.token);
    setItemRemoveModal(false);
  };
  const handleQuantitySelectorChangeForAdhocItems = (option) => {
    console.log("option", option);
    console.log("activeAdhocItem", activeAdhocItem);
    updateQuantityOfServiceSubItemAPICall(activeAdhocItem?.id, option.value, userGlobalState.details.token);
    setTimeout(() => {
      setQuantitySelector(false);
      setQuantityModalShow(true);
    }, 200);
  };
  const handleConfirmedServiceItem = () => {
    toCheckServiceSubItemAPICall(activeService?.id, activeService?.quantity, activeService?.type, activeService?.token);
    setTaskCounting(taskCounting + 1);
    setConfirmServiceItem(false);
  };
  // Function to handle file selection
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    toUploadPictureAPICall(userGlobalState.workerOrderId, event.target.files[0], userGlobalState.details.token);
  };
  // Function to remove file
  const removeImage = async (id) => {
    await toRemovePictureAPICall(id, userGlobalState.details.token);
    return null;
  };

  let adjustmentValue = originalApiWODetail?.adjustment_type === "addition" ? +originalApiWODetail?.adjustment_value : -originalApiWODetail?.adjustment_value;
  let subTotal = Number(originalApiWODetail?.option_price + adjustmentValue);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={` ${Styles.ddnone} ${Styles.ddblock}`}>
          <div className={` ${Styles.TopSection} `}>
            <div className={` ${Styles.backArrow} `}>
              <Link to="/dashboard">
                <WhiteBackArrow />
              </Link>
            </div>
            {/* <div className="CompanyLogo">
          <img className="img-fluid" alt="img" src="/assets/Swif-logo.png" alt="logo" />
        </div> */}
          </div>
          {/* name and tASk counting */}
          <section className={` ${Styles.JobHolder} `}>
            <div className={` ${Styles.NameWithTasks} `}>
              <h1>{originalApiWODetail?.customer_name ? capitalizeEachWord(originalApiWODetail?.customer_name) : "N/A"}</h1>
              <div className={` ${Styles.TaskCompleted} `}>
                <div className={` ${Styles.Completed} `}>{taskCounting} Tasks Completed</div>
                <div className={` ${Styles.PicTaken} `}>{originalApiWODetail?.gallery?.length ?? "0"} Picture Taken</div>
              </div>
            </div>
            {/* customer_contact_number */}
            <div>
              <div className={` ${Styles.InnerInfo} `}>
                <img className="img-fluid" alt="img" src="/assets/call-mess.png" />
                <span>{originalApiWODetail?.customer_contact_number ?? "N/A"}</span>
              </div>
            </div>
            {/* customer_contact_ address */}
            <div className={` ${Styles.InnerInfo} `}>
              <img className="img-fluid" alt="img" src="/assets/Home_icon.png" />
              <span>
                {originalApiWODetail?.block}
                {originalApiWODetail?.street ? `, ${originalApiWODetail?.street}` : null}
                {originalApiWODetail?.unit ? `, ${originalApiWODetail?.unit}` : null}
                {originalApiWODetail?.country ? `, ${originalApiWODetail?.country}` : null}
                {originalApiWODetail?.zip ? `, ${originalApiWODetail?.zip}` : null}
              </span>
            </div>
            {/* leader and worker */}
            <div className={` ${Styles.InnerInfo} `}>
              <img className="img-fluid" alt="img" src="/assets/User-pro.png" />
              <span>
                {originalApiWODetail?.leader?.name ? <strong>{`${originalApiWODetail?.leader?.name} (TL)`}</strong> : null}
                {originalApiWODetail?.workers?.length ? originalApiWODetail?.workers?.map((ele) => `, ${ele?.name}`) : null}
              </span>
            </div>
          </section>
          {/* service name */}
          <section className={` ${Styles.GrayBg} `}>
            <div className={` ${Styles.InnerInfo} `}>
              <img className="img-fluid" alt="img" src="/assets/Read-icon.png" />
              <h2>{originalApiWODetail?.service_name ?? ""}</h2>
            </div>
            <hr></hr>
            {/* option_name (lawn care) */}
            <div className={` ${Styles.RegularCleaning} `}>
              <div className={` ${Styles.IconPlusCleaning} `}>
                <img className="img-fluid" alt="img" src="/assets/check-circle.png" />
                <p className="m-0">{originalApiWODetail?.option_name ?? ""}</p>
              </div>
              <div className={` ${Styles.IconPlusCleaning} `}>
                <p className="m-0">₹{Number(originalApiWODetail?.option_price).toFixed(2)}</p>
              </div>
            </div>
            {/* adjustment */}
            {originalApiWODetail?.adjustment_value ? (
              <>
                <hr></hr>

                <div className={` ${Styles.RegularCleaning} `}>
                  <div className={` ${Styles.IconPlusCleaning} `}>
                    <img className="img-fluid" alt="img" src="/assets/check-circle.png" />
                    <p className="m-0">Adjustment</p>
                  </div>
                  <div className={` ${Styles.IconPlusCleaning} `}>
                    <p className="m-0">
                      {originalApiWODetail?.adjustment_type === "addition" ? "+ " : "- "}
                      {Number(originalApiWODetail?.adjustment_value).toFixed(2) ?? "0"}
                    </p>
                  </div>
                </div>
              </>
            ) : null}
            {/* tasklist- service sub items */}
            <hr></hr>
            {originalApiWODetail?.task_list?.task?.length
              ? originalApiWODetail?.task_list?.task?.map((ele, index) => {
                  const selectedFilteredServiceItem = userGlobalState?.serviceItems?.filter((element) => element?.id === ele?.id);
                  return (
                    <>
                      <div className={` ${Styles.RegularCleaning} `} key={index}>
                        <div className={` ${Styles.IconPlusCleaning} `}>
                          {/* service names with checkboxes */}
                          <div className={` ${Styles.formCheck} `}>
                            {originalApiWODetail?.is_leader && originalApiWODetail?.workstatusname === "In Progress" ? (
                              <>
                                <input
                                  className={`${Styles.formCheckInput}`}
                                  type="checkbox"
                                  value={`${ele?.name}`}
                                  style={ele?.checked?.length ? { cursor: "auto" } : null}
                                  id={index}
                                  checked={ele?.checked ? true : false}
                                  onChange={() => {
                                    if (ele?.checked) {
                                    } else {
                                      setActiveService({ id: ele?.id, name: ele?.name, quantity: ele?.quantity, type: ele?.type, token: userGlobalState.details.token });

                                      setConfirmServiceItem(true);
                                    }
                                  }}
                                />
                              </>
                            ) : null}
                            <label className="form-check-label" htmlFor={index}>
                              {ele?.name ?? "NA"}
                            </label>
                          </div>
                        </div>
                        {/* quantity selection */}
                        <div className={` ${Styles.IconPlusCleaning} `}>
                          <div className="form-group">
                            {originalApiWODetail?.is_leader && originalApiWODetail?.workstatusname === "In Progress" && !ele?.checked ? (
                              <select
                                className="form-control"
                                value={ele?.quantity}
                                onChange={(e) => {
                                  updateQuantityOfServiceSubItemAPICall(ele?.id, e.target.value, userGlobalState.details.token);
                                  setTaskCounting(taskCounting + 1);
                                  setQuantityModalShow(true);
                                }}
                                name={ele?.id}
                              >
                                {arrayOf20numbers?.map((number) => (
                                  <option value={number} name={ele?.id}>
                                    {number}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <p className="m-0 me-4">{selectedFilteredServiceItem?.[0]?.quantity ?? ele?.quantity}</p>
                            )}
                          </div>
                          <p className="m-0">₹{Number(Number(ele?.amount) * Number(selectedFilteredServiceItem?.[0]?.quantity ?? ele?.quantity)).toFixed(2)}</p>
                        </div>
                      </div>
                      <hr></hr>
                    </>
                  );
                })
              : null}
            <br></br>
            {/* Ad-Hoc Service Items as Requested Heading */}
            <div className={` ${Styles.InnerInfo} `}>
              <img className="img-fluid" alt="img" src="/assets/Three-list.png" />
              <h2>Ad-Hoc Service Items as Requested</h2>
            </div>
            {/* selected adhoc items */}
            {originalApiWODetail?.ad_hoc_items?.sub_items?.length ? (
              <>
                {originalApiWODetail?.ad_hoc_items?.sub_items?.map((ele) => {
                  // console.log(originalApiWODetail?.ad_hoc_items?.sub_items?.map(ele=>ele));
                  subTotal = +subTotal + ele?.amount * ele?.quantity;
                  console.log(subTotal);

                  return (
                    <>
                      <div className={` ${Styles.RegularCleaning} `}>
                        <div className={` ${Styles.IconPlusCleaning} `}>
                          <img
                            className="img-fluid"
                            style={{ cursor: "pointer" }}
                            alt="img"
                            src="/assets/x-circle.png"
                            onClick={() => {
                              setActiveAdhocItem(ele);
                              setItemRemoveModal(true);
                            }}
                          />
                          <p className="m-0">{ele?.name}</p>
                        </div>
                        <div className={` ${Styles.IconPlusCleaning} `}>
                          <div className="form-group">
                            <button
                              className="btn btn-light bg-white"
                              onClick={() => {
                                setActiveAdhocItem(ele);
                                setQuantitySelector(true);
                              }}
                            >
                              {ele?.["quantity"]}
                            </button>
                          </div>
                          <p className="m-0">₹{Number(ele?.amount * ele?.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <hr></hr>
                    </>
                  );
                })}
              </>
            ) : null}
            {/*  Add an Ad-hoc items for Above Service */}
            {originalApiWODetail?.is_leader && originalApiWODetail?.workstatusname === "In Progress" ? (
              <div className={` ${Styles.RegularCleaning} `}>
                <div className={` ${Styles.IconPlusCleaning} `}>
                  <div variant="primary" onClick={handleShow}>
                    <p className={`m-0 ${Styles.AdHocText} `}>
                      <img className="img-fluid" alt="img" src="/assets/plus-circle-fill.png" />
                      Add an Ad-hoc items for Above Service
                    </p>
                  </div>
                </div>
                <br></br>
              </div>
            ) : null}
            <hr></hr>
            {/* picture heading */}
            <div className={` ${Styles.InnerInfo} `}>
              <img className="img-fluid" alt="img" src="/assets/picture.png" />
              <h2>Pictures for the Work Order</h2>
            </div>
            {/* pictures */}

            {originalApiWODetail?.gallery?.map((ele) => {
              return (
                <div className={` ${Styles.PictureShow} `}>
                  <div className={` ${Styles.PictureStyleInner} `}>
                    <img className="img-fluid" alt="img" src={ele?.name} />
                    <div className={` ${Styles.picturText} `}>
                      {formatTimestamp(ele?.timestamp)}
                      <span>
                        <button className="btn btn-btn p-0" onClick={() => removeImage(ele?.id)}>
                          <img className="img-fluid w-100 h-100" src="/assets/Close-pic.png" alt="pic" />
                        </button>
                      </span>
                    </div>
                  </div>
                  {/* <div className={` ${Styles.PictureStyleInner} `}>
                <img className="img-fluid" alt="img" src="/assets/click01.png" />
                <div className={` ${Styles.picturText} `}>
                  03:35pm on 26 may 2024
                  <span>
                    <button className="btn btn-btn p-0">
                      <img className="img-fluid w-100 h-100" src="/assets/Close-pic.png" />
                    </button>
                  </span>
                </div>
              </div> */}
                </div>
              );
            })}
            {/* Add picture for work Order */}
            <div className={`  ${Styles.RegularCleaning} `}>
              <div className={` ${Styles.IconPlusCleaning} `}>
                <img className="img-fluid" alt="img" src="/assets/plus-circle-fill.png" />
                <div className={`m-0 ${Styles.AdHocText} `}>
                  <label htmlFor="fileInput" style={{ cursor: "pointer" }} onClick={()=>navigate("/imageCapture")}>
                    Add picture for Work Order
                    {/* <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} /> */}
                  </label>
                </div>
              </div>
            </div>
            <div className={`mb-5 mt-2 ${Styles.AddCommnet} `}>
              <Link to="/remark">
                {originalApiWODetail?.workordercommentlist?.length ? (
                  originalApiWODetail?.workordercommentlist?.map((ele) => {
                    return (
                      <div className={Styles.RemarksBoxPink}>
                        <h6>
                          {ele?.commenter}: <span>{formatDateString(ele?.created)}</span>
                        </h6>
                        <p style={{ fontWeight: "400" }}>{ele?.description}</p>
                      </div>
                    );
                  })
                ) : (
                  <div>Add Comment</div>
                )}
              </Link>
            </div>
          </section>
          {/* for total, subtotal, tax */}
          <section className={` ${Styles.bottomFixedSection} `}>
            <div className="accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  ></button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <div className={` ${Styles.ExpendSectionTop} `}>
                      <img className="img-fluid " src="/assets/hand-cru.png" alt="img" />
                      <div className={` ${Styles.Totalpay} `}>
                        <p className="mb-1">
                          Sub-Total: <strong>SGD ₹{Number(subTotal).toFixed(2)}</strong>
                        </p>
                        <p className="mb-1">
                          TAX @ {originalApiWODetail?.companytax}%: <strong>SGD ₹{Number(subTotal * (originalApiWODetail?.companytax / 100)).toFixed(2)}</strong>{" "}
                        </p>
                        <p className="mb-1">
                          Discount: <strong>SGD ₹{Number(originalApiWODetail?.discount_value ?? 0).toFixed(2)}</strong>{" "}
                        </p>
                        <p className="mb-1">
                          Amount to Collect: <strong>SGD ₹{Number(subTotal + subTotal * (originalApiWODetail?.companytax / 100)).toFixed(2)}</strong>{" "}
                        </p>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={` ${Styles.ExpendSectionTop} `}>
                      <div className={` ${Styles.StartExAC} `}>
                        <p className={`mb-0  ${Styles.Ex} `}>
                          Date: <strong> {originalApiWODetail?.start_date ?? ""}</strong>
                        </p>{" "}
                        <p className={`mb-0  ${Styles.Ex} `}>
                          Expected Start: <strong> {convertTimeInAMPM(originalApiWODetail?.actual_start_time) ?? ""}</strong>
                        </p>
                        <p className={`mb-0  ${Styles.Ac} `}>
                          Actual Start: <strong>{originalApiWODetail?.ground_start_time ? convertTimeInAMPM(originalApiWODetail?.ground_start_time) : null}</strong>
                        </p>
                      </div>
                      <div className={` ${Styles.ButtonTimeClock} `}>
                        <button className="btn btn-btn" onClick={() => navigate("/final-job-detail")}>
                          <div className={` ${Styles.ButtonInnerIconText} `}>
                            <img className="img-fluid " alt="img" src="/assets/Stop-icon.png" />
                            {originalApiWODetail?.workstatusname === "In Progress" ? (originalApiWODetail?.is_leader ? "Stop" : "Check Out") : null}
                            {originalApiWODetail?.workstatusname === "Pending" ? (originalApiWODetail?.is_leader ? "Start" : "Check In") : null}
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className={` ${Styles.TakePicturebutton} `}>
                      <div className="btn btn-btn">
                        <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                          Take Pictures for Work Order
                          <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <FooterNav></FooterNav>
          {/* modal for Add Ad-hoc items to work Order */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Ad-hoc items to Work Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Select
                className={` ${Styles.SearchBorder} `}
                placeholder="Search items"
                options={adhocItemsList.map((ele) => ({
                  value: ele?.id,
                  label: ele?.name,
                }))}
                onChange={handleAdhocItemChange}
                // menuIsOpen={true}
              />
            </Modal.Body>
          </Modal>
        </div>
      )}
      {/* Modal For Authentication */}
      {isAuthModalOpen && <ModalForAuthentication show={isAuthModalOpen} />}
      {/* Modal Items Added Successfully */}
      <Modal show={adhocModalShow} onHide={handleAdhocModalClose}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Items Added Successfully.
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleAdhocModalClose} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for confirmation to add service sub item Successfully */}
      <Modal show={confirmServiceItem} onHide={handleConfirmServiceModalShow}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong> {capitalizeEachWord(activeService?.name)}</strong> service will be <strong>locked</strong> and cannot be changed. Do you want to continue?
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleConfirmedServiceItem} className="PurpulBtnClock w-30 btn btn-btn">
              Yes
            </button>
            <button variant="primary" onClick={handleConfirmServiceModalShow} className="PurpulBtnClock w-30 btn btn-btn">
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal Items Removed Successfully */}
      <Modal show={itemRemoveModal} onHide={handleItemRemoveModal}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to remove Adhoc Item?
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleRemoveSelectedAdhocItem} className="PurpulBtnClock w-30 btn btn-btn">
              Yes
            </button>
            <button variant="primary" onClick={handleItemRemoveModal} className="PurpulBtnClock w-30 btn btn-btn">
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Quantity updated successfully. */}
      <Modal show={quantityModalShow} onHide={handleQuantityModalShow}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Quantity updated successfully.
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleQuantityModalShow} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* alert for already added item */}
      <Modal show={alertForSameItem} onHide={handleAlertForSameItem}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Already Selected Item. Please Update Quantity if you want to add again.
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleAlertForSameItem} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* alert for quantity selection */}
      <Modal show={quantitySelector} onHide={handleQuantitySelectorClose}>
        <Modal.Header closeButton>
          <Modal.Title> Select Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            className={` ${Styles.SearchBorder} `}
            placeholder="Search Quantity"
            options={arrayOf20numbers.map((number) => ({
              value: number,
              label: number,
            }))}
            onChange={handleQuantitySelectorChangeForAdhocItems}
            // menuIsOpen={true}
          />
          {/* <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleQuantitySelectorClose} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div> */}
        </Modal.Body>
      </Modal>

      {/* Modal picture Upload Successfully */}
      <Modal show={pictureUpload} onHide={handlePictureUpload}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          File uploaded Successfully.
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handlePictureUpload} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal picture delete Successfully */}
      <Modal show={pictureDelete} onHide={handlePictureDelete}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Image deleted Successfully.
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handlePictureDelete} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for Successfully something*/}
      <Modal show={successfully} onHide={handleSuccessfully}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Something went wrong. Try Again!
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleSuccessfully} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JobDetails;
