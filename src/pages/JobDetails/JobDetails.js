import React, { useState } from "react";
import Styles from "./style.module.css";
import FooterNav from "../footer/footerNav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Select from "react-select";

const JobDetails = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className={` ${Styles.ddnone} ${Styles.ddblock}`}>
        <div className={` ${Styles.TopSection} `}>
          <div className={` ${Styles.backArrow} `}>
            <a href="/dashboard">
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
                className="css-8mmkcg"
              >
                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
              </svg>
            </a>
          </div>
          {/* <div className="CompanyLogo">
            <img className="img-fluid" src="/assets/Swif-logo.png" alt="logo" />
          </div> */}
        </div>
        <section className={` ${Styles.JobHolder} `}>
          <div className={` ${Styles.NameWithTasks} `}>
            <h1>Xavier Smith</h1>
            <div className={` ${Styles.TaskCompleted} `}>
              <div className={` ${Styles.Completed} `}>9 Tasks Completed</div>
              <div className={` ${Styles.PicTaken} `}>3 Picture Taken</div>
            </div>
          </div>

          <div>
            <div className={` ${Styles.InnerInfo} `}>
              <img className="img-fluid" src="/assets/call-mess.png" />
              <span>985362525, 785485412</span>
            </div>
          </div>
          <div className={` ${Styles.InnerInfo} `}>
            <img className="img-fluid" src="/assets/Home_icon.png" />
            <span>24, smomen road,inner circle, Montana street singapore</span>
          </div>
        </section>
        <section className={` ${Styles.GrayBg} `}>
          <div className={` ${Styles.InnerInfo} `}>
            <img className="img-fluid" src="/assets/Read-icon.png" />
            <h2>Penthouse Cleaning</h2>
          </div>
          <hr></hr>
          <div className={` ${Styles.RegularCleaning} `}>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <img className="img-fluid" src="/assets/check-circle.png" />
              <p className="m-0">Regular Cleaning</p>
            </div>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <div className="form-group">
                <select className="form-control" id="sel1">
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
          <div className={` ${Styles.RegularCleaning} `}>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <div className={` ${Styles.formCheck} `}>
                <input
                  className={` ${Styles.formCheckInput} `}
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Fan Cleaning
                </label>
              </div>
            </div>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <div className="form-group">
                <select className="form-control" id="sel1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <p className="m-0">$312.00</p>
            </div>
          </div>
          <hr></hr>
          <div className={` ${Styles.RegularCleaning} `}>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <div className={` ${Styles.formCheck} `}>
                <input
                  className={` ${Styles.formCheckInput} `}
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Window Cleaning
                </label>
              </div>
            </div>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <div className="form-group">
                <select className="form-control" id="sel1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <p className="m-0">$33.50</p>
            </div>
          </div>
          <br></br>

          <div className={` ${Styles.InnerInfo} `}>
            <img className="img-fluid" src="/assets/Three-list.png" />
            <h2>Ad-Hoc Service Items as Requested</h2>
          </div>
          <hr></hr>
          <div className={` ${Styles.RegularCleaning} `}>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <img className="img-fluid" src="/assets/x-circle.png" />
              <p className="m-0">Utensil Cleaning</p>
            </div>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <div className="form-group">
                <select className="form-control" id="sel1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <p className="m-0">$35.00</p>
            </div>
          </div>
          <hr></hr>
          <div className={` ${Styles.RegularCleaning} `}>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <a variant="primary" onClick={handleShow}>
                <img className="img-fluid" src="/assets/plus-circle-fill.png" />
                <p className={`m-0 ${Styles.AdHocText} `}>
                  Add an Ad-hoc items for Above Service
                </p>
              </a>
            </div>
          </div>
          <br></br>
          <hr></hr>
          <div className={` ${Styles.InnerInfo} `}>
            <img className="img-fluid" src="/assets/picture.png" />
            <h2>Pictures for the Work Order</h2>
          </div>
          <div className={` ${Styles.PictureShow} `}>
            <div className={` ${Styles.PictureStyleInner} `}>
              <img className="img-fluid" src="/assets/click01.png" />
              <div className={` ${Styles.picturText} `}>
                03:35pm on 26 may 2024
                <span>
                  <button className="btn btn-btn p-0">
                    <img
                      className="img-fluid w-100 h-100"
                      src="/assets/Close-pic.png"
                    />
                  </button>
                </span>
              </div>
            </div>
            <div className={` ${Styles.PictureStyleInner} `}>
              <img className="img-fluid" src="/assets/click01.png" />
              <div className={` ${Styles.picturText} `}>
                03:35pm on 26 may 2024
                <span>
                  <button className="btn btn-btn p-0">
                    <img
                      className="img-fluid w-100 h-100"
                      src="/assets/Close-pic.png"
                    />
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div className={`  ${Styles.RegularCleaning} `}>
            <div className={` ${Styles.IconPlusCleaning} `}>
              <a href="#">
                <img className="img-fluid" src="/assets/plus-circle-fill.png" />
                <p className={`m-0 ${Styles.AdHocText} `}>
                  Add picture for work Order
                </p>
              </a>
            </div>
          </div>
          <div className={`mb-5 mt-2 ${Styles.AddCommnet} `}>
                    <a href="/remark">
                      <div >Add Comment</div>

                    </a>
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
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className={` ${Styles.ExpendSectionTop} `}>
                    <img className="img-fluid " src="/assets/hand-cru.png" />
                    <div className={` ${Styles.Totalpay} `}>
                      <p className="mb-1">
                        Sub-Total: <strong>SGD $520.25</strong>{" "}
                      </p>
                      <p className="mb-1">
                        TAX @ 7%: <strong>SGD $34.25</strong>{" "}
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
                          <img
                            className="img-fluid "
                            src="/assets/Stop-icon.png"
                          />
                          01:37:45
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className={` ${Styles.TakePicturebutton} `}>
                    <button className="btn btn-btn">
                      Take Pictures for Work Order
                    </button>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </section>
        <FooterNav></FooterNav>
        {/* modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Ad-hoc items to work Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Select
              className={` ${Styles.SearchBorder} `}
              placeholder="Search items"
              options={[]}
            />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default JobDetails;
