import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useInternetStatusCheck } from "../../utils/updation";

const FooterNav = () => {
  const online = useInternetStatusCheck();
  return (
    <div>
      <div className="bottomNav">
        <nav className="fixed-bottom bg-white BottomNavFix">
          <Link className="navbar-b" to="/dashboard">
            <img className="img-fluid" alt="img" src="/assets/Home_icon.png" />
          </Link>
          {/* <Link className="navbar-b" to="/history">
          <img className="img-fluid" alt="img" src="/assets/List-nav.png"/>
          </Link>          
          <Link className="navbar-b" to="/notification">
          <img className="img-fluid" alt="img" src="/assets/Notification-bell.png"/> 
          </Link> */}
          <Link className="navbar-b" to="/profile">
            <img className="img-fluid" alt="img" src="/assets/User-pro.png" />
          </Link>
        </nav>
        {!online ? <div className="bg-danger fixed-bottom d-flex justify-content-center mt-3">You are offline. Check your internet connection!</div> : null}
      </div>
    </div>
  );
};

export default FooterNav;
