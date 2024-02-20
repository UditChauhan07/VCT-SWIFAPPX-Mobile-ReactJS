import React from 'react'
import Styles from './style.module.css'
import  FooterNav from '../footer/footerNav'


function Notification() {
  return (
    <div className={Styles.TopControler}>

<div className={Styles.TopSection}>
          <div className={Styles.userName}>
            <div className={Styles.UserProfile}>
              <div className={Styles.UserIcon}>
                <img className="img-fluid" src="/assets/UserIcon.png" />
              </div>
              <span> Hi, John</span>
            </div>

            <div className={Styles.CompanyIcon}>
              <img className="img-fluid" src="/assets/Swif-logo.png" />
            </div>
          </div>
        </div>

        <div className={Styles.OrderHistoryDetail}>

<div className={Styles.historyBox}>
    <div className={Styles.DateControlFlex}>
    <h3>New W.O. Assigned</h3>
    <p>22 Nov.21 - 11:53am</p>
    </div>

<div className={Styles.OrderDetailsInfo}>


<div className={Styles.InnerInfo}>
<div className={Styles.iconControl}>
  <img className="" src="/assets/Read-icon.png" />
  </div>

  <span>Penthouse cleaning with 3 additional Services</span>
</div>

</div>
</div>

<div className={Styles.historyBox}>
    <div className={Styles.DateControlFlex}>
    <h3>W.O. Updated by Admin</h3>
    <p>22 Nov.21 - 11:53am</p>
    </div>

<div className={Styles.OrderDetailsInfo}>


<div className={Styles.InnerInfo}>
<div className={Styles.iconControl}>
  <img className="" src="/assets/Read-icon.png" />
  </div>

  <span>Penthouse cleaning with 3 additional Services</span>
</div>

</div>
</div>

<div className={Styles.historyBox}>
    <div className={Styles.DateControlFlex}>
    <h3>Reschedule Req. Approved</h3>
    <p>22 Nov.21 - 11:53am</p>
    </div>

<div className={Styles.OrderDetailsInfo}>


<div className={Styles.InnerInfo}>
<div className={Styles.iconControl}>
  <img className="" src="/assets/Read-icon.png" />
  </div>

  <span>Penthouse cleaning with 3 additional Services</span>
</div>

</div>
</div>

<div className={Styles.historyBox}>
    <div className={Styles.DateControlFlex}>
    <h3>Cancellation Approved</h3>
    <p>22 Nov.21 - 11:53am</p>
    </div>

<div className={Styles.OrderDetailsInfo}>


<div className={Styles.InnerInfo}>
<div className={Styles.iconControl}>
  <img className="" src="/assets/Read-icon.png" />
  </div>

  <span>Penthouse cleaning with 3 additional Services</span>
</div>

</div>
</div>

</div>
<FooterNav></FooterNav>
    </div>
  )
}

export default Notification