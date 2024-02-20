import React from 'react'
import Styles from './style.module.css'
import  FooterNav from '../footer/footerNav'





function HistoryDetail() {
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



        <div className={Styles.WorkHisto}>
            <p>work order histiory</p>

            <div className={Styles.ControlDropDown}>
            <form className={` ${Styles.FormAll} ${Styles.Formline}`} action="/action_page.php">
 
  <select name="cars" id="cars">
    <option value="volvo">Show All</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>

  </form>


  <form className={Styles.FormAll} action="/action_page.php">
 
 <select name="cars" id="cars">
   <option value="volvo">Current Month</option>
   <option value="saab">Saab</option>
   <option value="opel">Opel</option>
   <option value="audi">Audi</option>
 </select>

 </form>


 

            </div>

            <div className={Styles.OrderHistoryDetail}>

                <div className={Styles.historyBox}>
                    <div className={Styles.DateControlFlex}>
                    <h3>Xavier Smith</h3>
                    <p>22 November, 2021</p>
                    </div>

                <div className={Styles.OrderDetailsInfo}>
                <div className={Styles.InnerInfo}>

                <div className={Styles.iconControl}>
                  <img className="" src="/assets/call-mess.png" />
                  </div>
                  <span>985 3625 25, 785 3625 58</span>
                </div>
                <div className={Styles.InnerInfo}>

                    <div className={Styles.iconControl}>
                  <img className="" src="/assets/Home_icon.png" />
                  </div>

                  <span>
                   24, smomen road, Inner circle, Montana, Singapopore smomen road, Inner circle, Montana, Singapore
                  </span>
                </div>
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
                    <h3>Xavier Smith</h3>
                    <p>22 November, 2021</p>
                    </div>

                <div className={Styles.OrderDetailsInfo}>
                <div className={Styles.InnerInfo}>

                <div className={Styles.iconControl}>
                  <img className="" src="/assets/call-mess.png" />
                  </div>
                  <span>985 3625 25, 785 3625 58</span>
                </div>
                <div className={Styles.InnerInfo}>

                    <div className={Styles.iconControl}>
                  <img className="" src="/assets/Home_icon.png" />
                  </div>

                  <span>
                   24, smomen road, Inner circle, Montana, Singapopore smomen road, Inner circle, Montana, Singapore
                  </span>
                </div>
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
                    <h3>Xavier Smith</h3>
                    <p>22 November, 2021</p>
                    </div>

                <div className={Styles.OrderDetailsInfo}>
                <div className={Styles.InnerInfo}>

                <div className={Styles.iconControl}>
                  <img className="" src="/assets/call-mess.png" />
                  </div>
                  <span>985 3625 25, 785 3625 58</span>
                </div>
                <div className={Styles.InnerInfo}>

                    <div className={Styles.iconControl}>
                  <img className="" src="/assets/Home_icon.png" />
                  </div>

                  <span>
                   24, smomen road, Inner circle, Montana, Singapopore smomen road, Inner circle, Montana, Singapore
                  </span>
                </div>
                <div className={Styles.InnerInfo}>
                <div className={Styles.iconControl}>
                  <img className="" src="/assets/Read-icon.png" />
                  </div>

                  <span>Penthouse cleaning with 3 additional Services</span>
                </div>
              
              </div>
              </div>

            </div>

        </div>

        <FooterNav></FooterNav>
    </div>
  )
}

export default HistoryDetail