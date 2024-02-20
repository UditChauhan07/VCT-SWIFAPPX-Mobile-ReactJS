import React from "react";
import "./style.css";

const FooterNav = () => {
  return (
    <div>
      <div className="bottomNav">
        <nav class="fixed-bottom bg-white BottomNavFix">
          <a class="navbar-b" href="/dashboard">
          <img class="img-fluid" src="/assets/Home_icon.png"/>
          </a>
          <a class="navbar-b" href="/history">
          <img class="img-fluid" src="/assets/List-nav.png"/>
          </a>          
          <a class="navbar-b" href="/notification">
          <img class="img-fluid" src="/assets/Notification-bell.png"/> 
          </a>
          <a class="navbar-b" href="/profile">
          <img class="img-fluid" src="/assets/User-pro.png"/> 
          </a>          
        </nav>
      </div>
    </div>
  );
};

export default FooterNav;
