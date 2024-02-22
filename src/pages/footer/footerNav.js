import React from "react";
import "./style.css";

const FooterNav = () => {
  return (
    <div>
      <div className="bottomNav">
        <nav className="fixed-bottom bg-white BottomNavFix">
          <a className="navbar-b" href="/dashboard">
          <img className="img-fluid" src="/assets/Home_icon.png"/>
          </a>
          <a className="navbar-b" href="/history">
          <img className="img-fluid" src="/assets/List-nav.png"/>
          </a>          
          <a className="navbar-b" href="/notification">
          <img className="img-fluid" src="/assets/Notification-bell.png"/> 
          </a>
          <a className="navbar-b" href="/profile">
          <img className="img-fluid" src="/assets/User-pro.png"/> 
          </a>          
        </nav>
      </div>
    </div>
  );
};

export default FooterNav;
