import React from 'react'
import Styles from './style.module.css';

function FinalJobDetail() {
  return (
<div  className={Styles.JobDetalTop}>


    <div className={Styles.TopSection}>
<div className={Styles.backArrow}>
          <a href="/dashboard">
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
                  <p>Thank you</p>
          <h5>John, <span>kindly sign off below</span> </h5>
        </div>

        </div>

        <div className={Styles.BorderRadiusTop}>


        <div className={Styles.FinalMap}>
              <img  src="/assets/finalMap.png" />
            </div>

         <div className={Styles.AdressDetail}>
            <div className={Styles.MapImage}>
                <img src='/assets/location-iconRed.svg' alt="location-iconRed" />
            </div>
            <p>CX-3-Block, CX-3-Street, CX-3-Unit, Singapore, 1234567</p>
            </div>   


            <div className={Styles.AllJobDetails}>
<h5> Team Details: <span>Nitin Sharma (TL), </span> <span className={Styles.Span2}>Nitin FU</span></h5>


<div className={Styles.mainServiceDetail}>
    <h3>JOB DETAILS</h3>

    <div className={Styles.ItemDetail}>
    <table className="table">
 
  <tbody className={Styles.TbodyTable}>
    <tr>
      <th scope="row">C2-Service 2 :</th>
      <td>Price <span>(x1main package)</span> </td>
      <td>100.00</td>
      
    </tr>
    <tr>
      <th scope="row">Item <span>(Checked)</span></th>
      <td>C2 - Item 1<span>(x1)</span></td>
      <td>100.00</td>
      
    </tr>

    <tr>
      <th scope="row">Item <span>(Checked)</span></th>
      <td>C2 - Item 2 <span>(x1)</span> </td>
      <td>100.00</td>
      
    </tr>

    <tr>
      <th scope="row">Item <span>(Unchecked)</span></th>
      <td className={Styles.uncheckLine}>C2 - Item 3 <span>(x1)</span> </td>
      <td className={Styles.uncheckLine}>100.00</td>
      
    </tr>
   
  </tbody>
</table>


<div className={Styles.ItemTotalPrice}>
    <h4>Sub-Total: <span>SGD $112</span></h4>
    <h4>Tax@20%:  <span>SGD $21.96</span></h4>
    <h4>Discount:  <span>SGD $2.24</span></h4>
    <h4>Amount to collect :  <span>SGD $131.71</span></h4>

</div>


    </div>

</div>
            </div>

            <div className={Styles.CodAmount}>
                <input type='text' placeholder='Enter Collected Amount If COD?' />


            </div>

            <div className={Styles.CodButton}>
                    <a href='/signature-screen' className={Styles.Btn1}>Accept</a>
                    <a>Decline</a>

                </div>

                </div>




    </div>
  )
}

export default FinalJobDetail