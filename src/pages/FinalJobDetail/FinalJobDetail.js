import React from "react";
import Styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { WhiteBackArrow } from "../../utils/svg";
import { useSelector } from "react-redux";
import { capitalizeEachWord } from "../../utils/format";

function FinalJobDetail() {
  const navigate = useNavigate();
  const userGlobalState = useSelector((state) => state.userModule);

  return (
    <div className={Styles.JobDetalTop}>
      <div className={Styles.TopSection}>
        <div className={Styles.backArrow}>
          <Link to="/job-details">
            <WhiteBackArrow/>
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
          <p>{userGlobalState?.address}</p>
        </div>

        <div className={Styles.AllJobDetails}>
          {/* <h5>
            {" "}
            Team Details: <span>Nitin Sharma (TL), </span> <span className={Styles.Span2}>Nitin FU</span>
          </h5> */}
          <span>
                {/* {originalApiWODetail?.leader?.name ? <strong>{`${originalApiWODetail?.leader?.name} (TL)`}</strong> : null}
                {originalApiWODetail?.workers?.length ? originalApiWODetail?.workers?.map((ele) => `, ${ele?.name}`) : null} */}
              </span>

          <div className={Styles.mainServiceDetail}>
            <h3>JOB DETAILS</h3>

            <div className={Styles.ItemDetail}>
              <table className="table">
                <tbody className={Styles.TbodyTable}>
                  <tr>
                    <th scope="row">C2-Service 2 :</th>
                    <td>
                      Price <span>(x1main package)</span>{" "}
                    </td>
                    <td>100.00</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Item <span>(Checked)</span>
                    </th>
                    <td>
                      C2 - Item 1<span>(x1)</span>
                    </td>
                    <td>100.00</td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Item <span>(Checked)</span>
                    </th>
                    <td>
                      C2 - Item 2 <span>(x1)</span>{" "}
                    </td>
                    <td>100.00</td>
                  </tr>

                  <tr>
                    <th scope="row">
                      Item <span>(Unchecked)</span>
                    </th>
                    <td className={Styles.uncheckLine}>
                      C2 - Item 3 <span>(x1)</span>{" "}
                    </td>
                    <td className={Styles.uncheckLine}>100.00</td>
                  </tr>
                </tbody>
              </table>

              <div className={Styles.ItemTotalPrice}>
                <h4>
                  Sub-Total: <span>SGD $112</span>
                </h4>
                <h4>
                  Tax@20%: <span>SGD $21.96</span>
                </h4>
                <h4>
                  Discount: <span>SGD $2.24</span>
                </h4>
                <h4>
                  Amount to collect : <span>SGD $131.71</span>
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.CodAmount}>
          <input type="text" placeholder="Enter Collected Amount If COD?" />
        </div>

        <div className={Styles.CodButton}>
          <a href="/signature-screen" className={Styles.Btn1}>
            Accept
          </a>
          <a>Decline</a>
        </div>
      </div>
    </div>
  );
}

export default FinalJobDetail;
