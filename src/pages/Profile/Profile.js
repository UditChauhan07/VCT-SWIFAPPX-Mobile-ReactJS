import React from "react";
import Styles from "./style.module.css";
import FooterNav from "../footer/footerNav";

function Profile() {
  return (
    <div>
      <div className={Styles.TopControler}>
        <div className={Styles.TopSection}>
          <div className={Styles.userName}>
            <div className={Styles.UserProfile}>
              <div className={Styles.UserIcon}>
                <img className="img-fluid" src="/assets/UserIcon.png" />
              </div>
              <div>
                <span className={Styles.ProfileEmail}>
                  Khaan@mailinator.com
                </span>
                <br />
                <span className={Styles.ProfilePoints}> 208 Points</span>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.PersonalDetail}>
          <h3>PERSONAL</h3>

          <div className={Styles.PersonalInfo}>
            <p>Khan Saab</p>
            <p>Male</p>
            <p>address,SG,65</p>
          </div>
        </div>

        <div className={`${Styles.PersonalDetail} mt-5`}>
          <h3>SETTINGS</h3>

          <div className={Styles.PersonalInfo}>
            <div className={Styles.EditProile}>
              <div className={Styles.EditImg}>
                <img src="/assets/Edit_fill.svg" />
              </div>

              <a href="#">Edit Login Details</a>
            </div>
            <hr></hr>

            <div className={Styles.EditProile}>
              <div className={Styles.EditImg}>
                <img src="/assets/Sign_out_squre.svg" />
              </div>
              <a href="#"> Logout</a>
            </div>
          </div>
        </div>
      </div>
      <FooterNav></FooterNav>
    </div>
  );
}

export default Profile;
