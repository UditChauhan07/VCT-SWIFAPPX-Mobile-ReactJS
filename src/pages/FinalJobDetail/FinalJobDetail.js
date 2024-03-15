import React, { useEffect, useRef, useState } from "react";
import Styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { WhiteBackArrow } from "../../utils/svg";
import { useSelector } from "react-redux";
import { capitalizeEachWord } from "../../utils/format";
import { getAdhocItemsList, workerOrderDetail } from "../../api/worker";
import Loading from "../../components/Loading";

function FinalJobDetail() {
  const navigate = useNavigate();
  const userGlobalState = useSelector((state) => state.userModule);
  const [loading, setLoading] = useState(false);
  const [adhocItemsList, setAdhocItemsList] = useState([]);
  const [originalApiWODetail, setOriginalApiWODetail] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // API Call for getting Adhoc Items List
  const getAdhocItemsListApiCall = async (id, token) => {
    setLoading(true);
    const result = await getAdhocItemsList(id, token);
    setLoading(false);
    if (result?.error) navigate("/");
    else setAdhocItemsList(result?.content);
  };
  // API Call for details
  const getWorkerOrderDetailApiCall = async (id, token) => {
    setLoading(true);
    const result = await workerOrderDetail(id, token);
    setLoading(false);
    if (result === 401) {
      setIsAuthModalOpen(true);
    } else {
      getAdhocItemsListApiCall(result?.detail?.ad_hoc_catid, userGlobalState?.details?.token);
      if (result?.detail?.workstatusname === "In Progress") {
      }
      setOriginalApiWODetail(result?.detail);
    }
  };
  console.log(originalApiWODetail);
  useEffect(() => {
    if (userGlobalState?.details?.token) {
      getWorkerOrderDetailApiCall(userGlobalState?.workerOrderId, userGlobalState?.details?.token);
    } else {
      // <ModalForAuthentication show={true} />;
    }
  }, []);
  let adjustmentValue = originalApiWODetail?.adjustment_type === "addition" ? +originalApiWODetail?.adjustment_value : -originalApiWODetail?.adjustment_value;
  const subTotal = useRef(0);
  const tax = useRef(0);
  const discount = useRef(0);
  const grandTotal = useRef(0);
  subTotal.current = Number(originalApiWODetail?.option_price + adjustmentValue);
  tax.current = subTotal.current * (originalApiWODetail?.companytax / 100);
  discount.current = ((subTotal.current + tax.current) * originalApiWODetail?.discount_value) / 100;
  grandTotal.current = subTotal.current + tax.current - discount.current;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={Styles.JobDetalTop}>
          <div className={Styles.TopSection}>
            <div className={Styles.backArrow}>
              <Link to="/job-details">
                <WhiteBackArrow />
              </Link>
            </div>
            <div className={Styles.Greetings}>
              <p>Thank you</p>
              <h5>
                {capitalizeEachWord(userGlobalState?.details?.name)}, <span>kindly sign off below</span>{" "}
              </h5>
            </div>
          </div>

          <div className={Styles.BorderRadiusTop}>
            <div className={Styles.FinalMap}>
              <img src="/assets/finalMap.png" alt="img" />
            </div>

            <div className={Styles.AdressDetail}>
              <div className={Styles.MapImage}>
                <img src="/assets/location-iconRed.svg" alt="location-iconRed" />
              </div>
              <p>
                <strong>Address: </strong>
                {userGlobalState?.address}
              </p>
            </div>

            <div className={Styles.AllJobDetails}>
              <h5>
                Team Details: <span> {originalApiWODetail?.leader?.name ? `${originalApiWODetail?.leader?.name} (TL)` : null} </span>{" "}
                <span className={Styles.Span2}>{originalApiWODetail?.workers?.length ? originalApiWODetail?.workers?.map((ele) => `, ${ele?.name}`) : null}</span>
              </h5>

              <div className={Styles.mainServiceDetail}>
                <h3>JOB DETAILS</h3>

                <div className={Styles.ItemDetail}>
                  <table className="table">
                    <tbody className={Styles.TbodyTable}>
                      <tr>
                        <th scope="row">{originalApiWODetail?.service_name}</th>
                        <td>
                          <span>(x1 Main Package)</span>{" "}
                        </td>
                        <td>₹{Number(originalApiWODetail?.noption_price).toFixed(2)}</td>
                      </tr>
                      {originalApiWODetail?.task_list?.task?.map((ele) => {
                        if (ele?.checked) {
                          subTotal.current += ele?.amount * ele?.quantity;
                          tax.current = subTotal.current * (originalApiWODetail?.companytax / 100);
                          discount.current = ((subTotal.current + tax.current) * originalApiWODetail?.discount_value) / 100;
                          grandTotal.current = subTotal.current + tax.current - discount.current;
                        }
                        return (
                          <tr>
                            <th scope="row">
                              Item <span>{ele?.checked ? "(Checked)" : "(Unchecked)"}</span>
                            </th>
                            <td className={ele?.checked ? "" : `${Styles.uncheckLine}`}>
                              {ele?.name}
                              <span> ({ele?.quantity})</span>
                            </td>
                            <td className={ele?.checked ? "" : `${Styles.uncheckLine}`}>₹{Number(ele?.amount * ele?.quantity).toFixed(2)}</td>
                          </tr>
                        );
                      })}
                      {originalApiWODetail?.ad_hoc_items?.sub_items?.map((ele) => {
                        subTotal.current = +subTotal.current + ele?.amount * ele?.quantity;
                        tax.current = subTotal.current * (originalApiWODetail?.companytax / 100);
                        discount.current = ((subTotal.current + tax.current) * originalApiWODetail?.discount_value) / 100;
                        grandTotal.current = subTotal.current + tax.current - discount.current;
                        return (
                          <tr>
                            <th scope="row">
                              Item <span>{ele?.checked ? "(Checked)" : "(Unchecked)"}</span>
                            </th>
                            <td className={ele?.checked ? "" : `${Styles.uncheckLine}`}>
                              {ele?.name}
                              <span> ({ele?.quantity})</span>
                            </td>
                            <td className={ele?.checked ? "" : `${Styles.uncheckLine}`}>₹{Number(ele?.amount * ele?.quantity).toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className={Styles.ItemTotalPrice}>
                    <h4>
                      Sub-Total: <span>SGD ₹{Number(subTotal.current).toFixed(2)}</span>
                    </h4>
                    <h4>
                      TAX @ {originalApiWODetail?.companytax}%: <span>SGD ₹{Number(tax.current).toFixed(2)}</span>{" "}
                    </h4>
                    <h4>
                      Discount @ {originalApiWODetail?.discount_value ?? 0}%: <span>SGD ₹{Number(discount.current).toFixed(2)}</span>{" "}
                    </h4>
                    <h4>
                      Amount to Collect: <span>SGD ₹{Number(grandTotal.current).toFixed(2)}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className={Styles.CodAmount}>
              <input type="number" placeholder="Enter Collected Amount If COD?" />
            </div>

            <div className={Styles.CodButton}>
              <Link to="/signature-screen" className={Styles.Btn1}>
                Accept
              </Link>
              <Link to="/job-details">Decline</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FinalJobDetail;
