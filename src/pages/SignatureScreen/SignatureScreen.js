import React from 'react'
import Styles from './styles.module.css'
import SignaturePad from './SignaturePad'

function SignatureScreen() {
  return (
    <div>

<div  className={Styles.JobDetalTop}>


    <div className={Styles.TopSection}>
<div className={Styles.backArrow}>
          <a href="/final-job-detail">
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="css-8mmkcg"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </a>
        </div>
        <div className={Styles.Greetings}>
                  <p className='m-0'>Thank you</p>
          <h5>John, <span>kindly sign off below</span> </h5>
        </div>

        </div>


        <div className={Styles.BorderRadiusTop}>

        <div className={Styles.CodAmount}>
            <label> Sign off by</label>
                <input type='text' placeholder='Enter your name' />


                <label> Add Remarks</label>
                <input type='text' placeholder='Enter your remarks/comment' />

                <label> Signature</label>
                <SignaturePad/>

            </div>

{/* 
            <div className={Styles.CodButton}>
                    <a href='/signature-screen' className={Styles.Btn1}>Clear</a>
                    <a>Confirm</a>

                </div> */}


                </div>

    </div>

    </div>
  )
}

export default SignatureScreen