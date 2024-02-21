import React from "react";
import Styles from "./style.module.css";

function Remarks() {
  return (
    <div>
      <div className={Styles.JobDetalTop}>
        <div className={Styles.TopSection}>
          <div className={Styles.backArrow}>
            <a href="/job-details">
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
                class="css-8mmkcg"
              >
                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
              </svg>
            </a>
          </div>
          <div className={Styles.Greetings}>
            <h5>Remarks for Works Order at </h5>
          </div>
        </div>

        <div>
          <div className={Styles.InnerInfo}>
            <div className={Styles.iconControl}>
              <img className="" src="/assets/Home_icon.png" />
            </div>
            <h3>
              John Wick
              <span>
                24, smomen road, Inner circle, Montana, Singapopore smomen road,
              </span>
            </h3>
          </div>
        </div>

        <div className={Styles.ControlMain}>
          <div className={Styles.RemarksBoxPink}>
            <h2>
              Aaron Monroe: <span>12 Oct 2022 at 10:08 am</span>
            </h2>
            <p>Hello administrator</p>
          </div>

          <div className={`${Styles.RemarksBoxPink} ${Styles.RemarksBoxGray}`}>
            <h2>
              Aaron Monroe: <span>12 Oct 2022 at 10:08 am</span>
            </h2>
            <p>Hello administrator</p>
          </div>

          <div className={Styles.RemarksBoxPink}>
            <h2>
              Aaron Monroe: <span>12 Oct 2022 at 10:08 am</span>
            </h2>
            <p>Hello administrator</p>
          </div>
          <div className={Styles.BottomChatFixed}>

          <div className={Styles.Chatsend}>
            <input type="text" placeholder="" />
            <button onClick={() => {}}>
              <img src="/assets/SendIcon.png" />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Remarks;
