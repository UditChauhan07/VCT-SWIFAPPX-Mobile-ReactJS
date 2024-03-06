import React, { useEffect, useState } from "react";
import Styles from "./style.module.css";
import FooterNav from "../footer/footerNav";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import Loading from "../../components/Loading";
import { getAdhocItemsList, workerOrderDetail } from "../../api/worker";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { additionOfServiceItems, getAddress, removalOfAdhocItems, selectedAdhocItems, updationOfAdhocItems } from "../../redux/user/user.actions";
import { capitalizeEachWord, formatDateString } from "../../utils/format";
import { WhiteBackArrow } from "../../utils/svg";

const JobDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userGlobalState = useSelector((state) => state.userModule);
  const companyGlobalState = useSelector((state) => state.companyModule);
  console.log(userGlobalState);
  const [loading, setLoading] = useState(false);
  const [originalApiWODetail, setOriginalApiWODetail] = useState([]);
  const [show, setShow] = useState(false);
  const [taskCounting, setTaskCounting] = useState(0);
  // const [serviceNames, setServiceNames] = useState([]);
  const [adhocItemsList, setAdhocItemsList] = useState([]);
  const [selectedAdhocItemList, setSelectedAdhocItemList] = useState([]);
  const [adhocModalShow, setAdhocModalShow] = useState(false);
  const [quantityModalShow, setQuantityModalShow] = useState(false);
  const [quantitySelector, setQuantitySelector] = useState(false);
  const [alertForSameItem, setAlertForSameItem] = useState(false);
  const [activeAdhocItem, setActiveAdhocItem] = useState();
  // const [activeServiceItem, setActiveServiceItem] = useState();
  const [itemRemoveModal, setItemRemoveModal] = useState(false);
  // modals show/hide
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleItemRemoveModal = () => setItemRemoveModal(false);
  const handleAdhocModalClose = () => setAdhocModalShow(false);
  const handleAlertForSameItem = () => setAlertForSameItem(false);
  const handleQuantityModalShow = () => setQuantityModalShow(false);
  const handleQuantitySelectorClose = () => setQuantitySelector(false);

  // API Call for details
  const getWorkerOrderDetailApiCall = async (id, token) => {
    setLoading(true);
    const result = await workerOrderDetail(id, token);
    console.log("result", result);
    setLoading(false);
    if (result === 401) navigate("/");
    else {
      setOriginalApiWODetail(result.detail);
      getAdhocItemsListApiCall(result.detail.ad_hoc_catid, userGlobalState.details.token);
      const address = `${result.detail?.block}${result.detail?.street ? `, ${result.detail?.street}` : ""}${result.detail?.unit ? `, ${result.detail?.unit}` : ""}${
        result.detail?.country ? `, ${result.detail?.country}` : ""
      }${result.detail?.zip ? `, ${result.detail?.zip}` : ""}`;
      if (result.detail?.workstatusname === "In Progress") {
        setTaskCounting(taskCounting + 1 + userGlobalState?.adhocItems?.length + userGlobalState?.serviceItems?.length);
      }
      dispatch(getAddress(address));
      setSelectedAdhocItemList(userGlobalState?.adhocItems?.map((ele) => ele.id));
    }
  };
  // API Call for geuserGlobalStatetting Adhoc Items List
  const getAdhocItemsListApiCall = async (id, token) => {
    setLoading(true);
    const result = await getAdhocItemsList(id, token);
    setLoading(false);
    if (result.error) navigate("/");
    else setAdhocItemsList(result.content);
  };

  useEffect(() => {
    if (userGlobalState?.details?.token) {
      getWorkerOrderDetailApiCall(userGlobalState.workerOrderId, userGlobalState.details.token);
    } else {
      navigate("/");
    }
  }, []);

  console.log("originalApiWODetail", originalApiWODetail);
  const arrayOf20numbers = Array.from({ length: 20 }, (_, index) => index + 1);
  // const handleServiceQuantityChange = (e) => {
  //   setServiceNames((prev) => [...prev, { [e.target.name]: e.target.value }]);
  // };
  // const handleServiceFix = () => {
  //   console.log(activeServiceItem);
  // };
  const handleAdhocItemChange = (option) => {
    // console.log(option);
    setSelectedAdhocItemList((prev) => {
      if (selectedAdhocItemList.includes(option.value)) {
        setAlertForSameItem(true);
        setShow(false);
        return [...prev];
      } else {
        dispatch(selectedAdhocItems(option.value, 1));
        setTimeout(() => {
          setShow(false);
          setAdhocModalShow(true);
          setTaskCounting(taskCounting + 1);
        }, 200);
        return [...prev, option.value];
      }
    });
  };
  const handleRemoveSelectedAdhocItem = () => {
    setTaskCounting(taskCounting - 1);
    setSelectedAdhocItemList(selectedAdhocItemList.filter((item) => item !== activeAdhocItem));
    dispatch(removalOfAdhocItems(activeAdhocItem));
    setItemRemoveModal(false);
  };
  const handleQuantitySelectorChange = (option) => {
    setTimeout(() => {
      setQuantitySelector(false);
      setQuantityModalShow(true);
    }, 200);
    dispatch(updationOfAdhocItems(activeAdhocItem, option.value));
  };
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
              <img class="img-fluid" alt="img" src="/assets/User-pro.png" />
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
                <p className="m-0">${Number(originalApiWODetail?.option_price).toFixed(2)}</p>
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
            {/* tasklist */}
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
                                  style={selectedFilteredServiceItem?.length ? { cursor: "auto" } : null}
                                  id={index}
                                  checked={selectedFilteredServiceItem?.length ? true : false}
                                  onChange={() => {
                                    if (selectedFilteredServiceItem?.length) {
                                    } else {
                                      setAdhocModalShow(true);
                                      setTaskCounting(taskCounting + 1);
                                      dispatch(additionOfServiceItems(ele?.id, ele?.quantity));
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
                        <div className={` ${Styles.IconPlusCleaning} `}>
                          <div className="form-group">
                            {originalApiWODetail?.is_leader && originalApiWODetail?.workstatusname === "In Progress" && !selectedFilteredServiceItem?.length ? (
                              <select
                                className="form-control"
                                value={selectedFilteredServiceItem?.length ? selectedFilteredServiceItem?.length?.[0]?.quantity : ele?.quantity}
                                onChange={(e) => {
                                  setAdhocModalShow(true);
                                  setTaskCounting(taskCounting + 1);
                                  dispatch(additionOfServiceItems(ele?.id, Number(e.target.value)));
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
                          <p className="m-0">${Number(Number(ele?.amount) * Number(selectedFilteredServiceItem?.[0]?.quantity ?? ele?.quantity)).toFixed(2)}</p>
                        </div>
                      </div>
                      <hr></hr>
                    </>
                  );
                })
              : null}
            <br></br>
            {/* Ad-Hoc Service Items as Requested */}
            <div className={` ${Styles.InnerInfo} `}>
              <img className="img-fluid" alt="img" src="/assets/Three-list.png" />
              <h2>Ad-Hoc Service Items as Requested</h2>
            </div>
            {/* selected adhoc items */}
            {selectedAdhocItemList?.length ? (
              <>
                {selectedAdhocItemList?.map((ele) => {
                  const filteredData = adhocItemsList.filter((item) => item.id === ele)[0];
                  return (
                    <>
                      <div className={` ${Styles.RegularCleaning} `}>
                        <div className={` ${Styles.IconPlusCleaning} `}>
                          <img
                            className="img-fluid"
                            style={{ cursor: "pointer" }}
                            alt="img"
                            src="/assets/x-circle.png"
                            onClick={
                              () => {
                                setActiveAdhocItem(ele);
                                setItemRemoveModal(true);
                              }
                              // handleRemoveSelectedAdhocItem(ele)
                            }
                          />
                          <p className="m-0">{filteredData?.name}</p>
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
                              {userGlobalState.adhocItems.filter((item) => item.id === ele)?.[0]?.["quantity"]}
                            </button>
                          </div>
                          <p className="m-0">${Number(filteredData?.price * 1).toFixed(2)}</p>
                        </div>
                      </div>
                      <hr></hr>
                    </>
                  );
                })}
              </>
            ) : null}
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
            <div className={` ${Styles.InnerInfo} `}>
              <img className="img-fluid" alt="img" src="/assets/picture.png" />
              <h2>Pictures for the Work Order</h2>
            </div>
            <div className={` ${Styles.PictureShow} `}>
              <div className={` ${Styles.PictureStyleInner} `}>
                <img className="img-fluid" alt="img" src="/assets/click01.png" />
                <div className={` ${Styles.picturText} `}>
                  03:35pm on 26 may 2024
                  <span>
                    <button className="btn btn-btn p-0">
                      <img className="img-fluid w-100 h-100" src="/assets/Close-pic.png" />
                    </button>
                  </span>
                </div>
              </div>
              <div className={` ${Styles.PictureStyleInner} `}>
                <img className="img-fluid" alt="img" src="/assets/click01.png" />
                <div className={` ${Styles.picturText} `}>
                  03:35pm on 26 may 2024
                  <span>
                    <button className="btn btn-btn p-0">
                      <img className="img-fluid w-100 h-100" src="/assets/Close-pic.png" />
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <div className={`  ${Styles.RegularCleaning} `}>
              <div className={` ${Styles.IconPlusCleaning} `}>
                <a href="#">
                  <img className="img-fluid" alt="img" src="/assets/plus-circle-fill.png" />
                  <p className={`m-0 ${Styles.AdHocText} `}>Add picture for work Order</p>
                </a>
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
                      <img className="img-fluid " src="/assets/hand-cru.png" />
                      <div className={` ${Styles.Totalpay} `}>
                        <p className="mb-1">
                          Sub-Total: <strong>SGD $520.25</strong>{" "}
                        </p>
                        <p className="mb-1">
                          TAX @ 20%: <strong>SGD $34.25</strong>{" "}
                        </p>
                        <p className="mb-1">
                          Discount: <strong>SGD $150.00</strong>{" "}
                        </p>
                        <p className="mb-1">
                          Amount to Collect: <strong>SGD $404.67</strong>{" "}
                        </p>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={` ${Styles.ExpendSectionTop} `}>
                      <div className={` ${Styles.StartExAC} `}>
                        <p className={`mb-0  ${Styles.Ex} `}>
                          Expected Start: <strong> 02:30pm</strong>
                        </p>
                        <p className={`mb-0  ${Styles.Ac} `}>
                          Actual Start: <strong> 02:30pm</strong>
                        </p>
                      </div>
                      <div className={` ${Styles.ButtonTimeClock} `}>
                        <button className="btn btn-btn">
                          <div className={` ${Styles.ButtonInnerIconText} `}>
                            <img className="img-fluid " alt="img" src="/assets/Stop-icon.png" />
                            01:37:45
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className={` ${Styles.TakePicturebutton} `}>
                      <button className="btn btn-btn">Take Pictures for Work Order</button>
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

      {/* Modal Items Removed Successfully */}
      <Modal show={itemRemoveModal} onHide={handleItemRemoveModal}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, You want to remove Adhoc Item?
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
            onChange={handleQuantitySelectorChange}
            // menuIsOpen={true}
          />
          {/* <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleQuantitySelectorClose} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JobDetails;
