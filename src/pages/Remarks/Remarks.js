import React, { useEffect, useState } from "react";
import Styles from "./style.module.css";
import { Form, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCommentList } from "../../api/worker";
import Loading from "../../components/Loading";
import { formatDateString } from "../../utils/format";
import { Field, Formik } from "formik";

function Remarks() {
  const navigate = useNavigate();
  const userGlobalState = useSelector((state) => state.userModule);
  const companyGlobalState = useSelector((state) => state.companyModule);
  console.log(userGlobalState, companyGlobalState);
  const [loading, setLoading] = useState(false);
  const [originalApiCommentDetails, setOriginalApiCommentDetails] = useState([]);
  
  // API Call for details
  const getCommentListAPICall = async (id, token) => {
    setLoading(true);
    const result = await getCommentList(id, token);
    console.log("result", result);
    setLoading(false);
    if (result.error) alert(result.message);
    else {
      setOriginalApiCommentDetails(result.Commentlist);
    }
  };
  useEffect(() => {
    if (userGlobalState.details.token) {
      getCommentListAPICall(userGlobalState.workerOrderId, userGlobalState.details.token);
    } else {
      navigate("/");
    }
  }, []);
  console.log(originalApiCommentDetails);

  // Example usage:
  // const inputDateString = "2024-03-01 13:02:40";
  // const formattedDateString = formatDateString(inputDateString);
  // console.log(formattedDateString); // Output: 1 Mar 2024 at 1:02 pm

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={Styles.JobDetalTop}>
          <div className={Styles.TopSection}>
            <div className={Styles.backArrow}>
              <a href="/job-details">
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-8mmkcg">
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
              </a>
            </div>
            <div className={Styles.Greetings}>
              <h5>Remarks for Works Order at </h5>
            </div>
          </div>

          <div>
            <div className={Styles.InnerInfo}>
              <div className={Styles.iconControl}>
                <img className="" alt="img" src="/assets/Home_icon.png" />
              </div>
              <h3>
                {userGlobalState.workerOrderId}
                <span>: 24, smomen road, Inner circle, Montana, Singapopore smomen road,</span>
              </h3>
            </div>
          </div>

          <div className={Styles.ControlMain}>
            {originalApiCommentDetails.length
              ? originalApiCommentDetails.map((ele) => {
                  return (
                    <>
                      {ele?.commenter_type === "Admin" ? (
                        <div className={`${Styles.RemarksBoxPink} ${Styles.RemarksBoxGray}`}>
                          <h2>
                            {ele?.commenter}: <span>{formatDateString(ele?.created)}</span>
                          </h2>
                          <p>{ele?.description}</p>
                        </div>
                      ) : (
                        <div className={Styles.RemarksBoxPink}>
                          <h2>
                            {ele?.commenter}: <span>{formatDateString(ele?.created)}</span>
                          </h2>
                          <p>{ele?.description}</p>
                        </div>
                      )}
                    </>
                  );
                })
              : null}

            <div className={Styles.BottomChatFixed}>
              <div className={Styles.Chatsend}>
                {/* <Formik>
                  <Form>
                <Field type="text" placeholder="Message" />
                    
                  </Form>
                </Formik> */}
                <input type="text" placeholder="Message" />
                <button onClick={() => {}}>
                  <img src="/assets/SendIcon.png" alt="img" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Remarks;
