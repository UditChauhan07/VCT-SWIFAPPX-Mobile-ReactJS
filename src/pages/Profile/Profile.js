import React, { useEffect, useState } from "react";
import Styles from "./style.module.css";
import FooterNav from "../footer/footerNav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { persistor } from "../../redux/store";
import { getUserDetails, logout } from "../../redux/user/user.actions";
import ModalForAuthentication from "../../components/ModalForAuthentication";
import { companyLogout } from "../../redux/company/company.actions";
import { getWorkerProfile } from "../../api/worker";

function Profile() {
  const userGlobalState = useSelector((state) => state.userModule);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const handleLogout = () => {
    persistor.purge();
    dispatch(logout());
    dispatch(companyLogout());
    navigate("/");
  };
  const apiCallForProfile = async () => {
    const result = await getWorkerProfile(userGlobalState?.details?.token);
    dispatch(getUserDetails(result.details));
    console.log(result?.details?.contact);
  };
  useEffect(() => {
    if (!userGlobalState?.details?.token) {
      setAuthenticated(true);
    }
    apiCallForProfile();
  }, []);
  return (
    <div>
      {authenticated ? (
        <ModalForAuthentication show={authenticated} />
      ) : (
        <>
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
                    <span className={Styles.ProfileEmail}>{userGlobalState?.details?.email}</span>
                    {/* <br />
                <span className={Styles.ProfilePoints}> 208 Points</span> */}
                  </div>
                </div>
              </div>
            </div>

            <div className={Styles.PersonalDetail}>
              <h3>PERSONAL</h3>

              <div className={Styles.PersonalInfo}>
                <p> {userGlobalState?.details?.name}</p>
                <p> {userGlobalState?.details?.gender}</p>
                <p> {userGlobalState?.details?.address}</p>
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
                    <button>Edit Login Details</button>
                  </Link>
                </div>
                <hr></hr>

                <div className={`${Styles.EditProile} mb-5 `}>
                  <div className={Styles.EditImg}>
                    <img src="/assets/Sign_out_squre.svg" alt="img" />
                  </div>

                  <button onClick={handleLogout}> Logout</button>
                </div>
              </div>
            </div>
          </div>
          <FooterNav></FooterNav>
        </>
      )}
    </div>
  );
}

export default Profile;
