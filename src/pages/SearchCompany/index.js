import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/actions";
import Select from 'react-select'

const Index = () => {
  const myState = useSelector((state) => state.companyReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  console.log("myState", myState)
  // const options = myState?.data?.companyData.details.map((ele)=>({
  //   value:ele.id,
  //   label:ele.name
  // }))

  return (
    <div className="dd-none dd-block p20">
      <div className="vCenter">
        <div className="w-100">
          <div className="logo ">
            <img className="img-fluid" src="/assets/Swif-logo.png" />
          </div>
          <p className="SearchCompanyText">Search Company Name</p>
          <div className="input-group rounded">
            {/* <input type="search" className="form-control rounded" placeholder="Company Name" aria-label="Search" aria-describedby="search-addon" /> */}
            <Select className="form-control rounded" placeholder="Company Name" options={[]} />

            <span className="input-group-text border-0" id="search-addon">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path>
              </svg>
            </span>
          </div>
          <div className="SubmitButton mt-20">
            {/* <a href="/BusinessDetail" className="btn btn-btn SubmitBtnStyle">Submit</a> */}
            <button className="btn btn-btn SubmitBtnStyle" onClick={() => dispatch(fetchData())}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
