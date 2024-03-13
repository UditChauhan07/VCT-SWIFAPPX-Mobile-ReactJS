import React, { useState } from "react";
import Styles from "./style.module.css";
import FooterNav from "../footer/footerNav";
import { useSelector } from "react-redux";
import { capitalizeEachWord } from "../../utils/format";
import { Link } from "react-router-dom";

function Profile() {
  const userGlobalState = useSelector((state) => state.userModule);
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <div className={Styles.TopControler}>
        <div className={Styles.TopSection}>
          <div className={Styles.userName}>
            <div className={Styles.UserProfile}>
              <div className={Styles.UserIcon}>
                {/* <img className="img-fluid" src="/assets/UserIcon.png" alt="img" /> */}
                <img
                  className="img-fluid"
                  src={userGlobalState?.details?.profile_image}
                  alt="img"
                  style={{
                    borderRadius: "50%",
                    height: "70px",
                    width: "70px",
                  }}
                />
              </div>
              <div>
                <span className={Styles.ProfileEmail}>
                  {userGlobalState?.details?.email}
                </span>
                {/* <br />
                <span className={Styles.ProfilePoints}> 208 Points</span> */}
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.PersonalDetail}>
          <h3>PERSONAL</h3>

          <div className={Styles.PersonalInfo}>
            <p> {capitalizeEachWord(userGlobalState?.details?.name)}</p>
            <p> {capitalizeEachWord(userGlobalState?.details?.gender)}</p>
            <p> {capitalizeEachWord(userGlobalState?.details?.address)}</p>
            <p> {userGlobalState?.details?.contact}</p>
          </div>
        </div>

        <div className={`${Styles.PersonalDetail} mt-3 mb-5`}>
          <h3>SETTINGS</h3>

          <div className={`${Styles.PersonalInfo}  `}>
            <div className={Styles.EditProile}>
              <div className={Styles.EditImg}>
                <img src="/assets/Edit_fill.svg" alt="img" />
              </div>
              <Link to="/edit-details">              
                <button onClick={() => setEdit(true)}>
                  Edit Login Details
                </button>
              </Link>
            </div>
            <hr></hr>

            <div className={`${Styles.EditProile} mb-5 `}>
              <div className={Styles.EditImg}>
                <img src="/assets/Sign_out_squre.svg" alt="img" />
              </div>

              <button> Logout</button>
            </div>
          </div>
        </div>
      </div>
      <FooterNav></FooterNav>
    </div>
  );
}

export default Profile;
