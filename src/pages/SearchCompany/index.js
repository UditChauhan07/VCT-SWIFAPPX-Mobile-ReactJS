import React, { useEffect, useState } from "react";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCompaniesList } from "../../api/company";
import {
  getCompanyDetails,
  getCompanyId,
  getCompanyName,
  getLogoCompany,
  taxValueOfCompany,
  topBarPermission,
} from "../../redux/company/company.actions";
import { useNavigate } from "react-router-dom";
import { useInternetStatusCheck } from "../../utils/updation";
import { SearchIcon } from "../../utils/svg";
const Index = () => {
  const online = useInternetStatusCheck();
  const globalState = useSelector((state) => state.companyModule);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companiesList, setCompaniesList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [noCompanyModalShow, setNoCompanyModalShow] = useState(false);
  const companiesListApiCall = async () => {
    const result = await getCompaniesList();
    if (result.error) alert("You are offline. Reconnecting...");
    else setCompaniesList(result.details);
  };

  useEffect(() => {
    if (online) companiesListApiCall();
  }, []);
  useEffect(() => {
    if (online) companiesListApiCall();
  }, [online]);

  console.log("globalState", globalState);
  const handleCompanySubmit = () => {
    // if (globalState.company_id) {
    if (selectedCompany) {
      dispatch(getCompanyId(selectedCompany.value));
      dispatch(getCompanyName(selectedCompany.label));
      dispatch(
        topBarPermission(
          companiesList.filter((ele) => ele.id === selectedCompany.value)[0]
            .topBarPermission
        )
      );
      dispatch(
        taxValueOfCompany(
          companiesList.filter((ele) => ele.id === selectedCompany.value)[0].tax
        )
      );
      dispatch(
        getLogoCompany(
          companiesList.filter((ele) => ele.id === selectedCompany.value)[0]
            .company_logo
        )
      );
      dispatch(
        getCompanyDetails(
          companiesList.filter((ele) => ele.id === selectedCompany.value)[0]
        )
      );
      navigate("/BusinessDetail");
    } else setNoCompanyModalShow(true);
  };

  const handleNoCompanySelected = () => setNoCompanyModalShow(false);
  return (
    <>
      <div className="dd-none dd-block p20">
        <div className="vCenter">
          <div className="w-100">
            <div className="logo ">
              <img
                className="img-fluid"
                src="/assets/Swif-logo.png"
                alt="img"
              />
            </div>
            <p className="SearchCompanyText">Search Company Name</p>
            <div className="input-group rounded">
              <Select
                className="form-control p-0 rounded"
                placeholder="Company Name"
                options={companiesList.map((ele) => ({
                  value: ele.id,
                  label: ele.name,
                }))}
                // defaultValue={
                //   online
                //     ? null
                //     : {
                //         value: globalState.company_id,
                //         label: globalState.company_name,
                //       }
                // }
                onChange={(option) => {
                  setSelectedCompany(option);
                  console.log(option);
                  // dispatch(getCompanyId(option.value));
                  // dispatch(getCompanyName(option.label));
                  // dispatch(topBarPermission(companiesList.filter((ele) => ele.id === option.value)[0].topBarPermission));
                  // dispatch(taxValueOfCompany(companiesList.filter((ele) => ele.id === option.value)[0].tax));
                  // dispatch(getLogoCompany(companiesList.filter((ele) => ele.id === option.value)[0].company_logo));
                  // dispatch(getCompanyDetails(companiesList.filter((ele) => ele.id === option.value)[0]));
                }}
              />

              <span className="input-group-text border-0" id="search-addon">
                <SearchIcon />
              </span>
            </div>
            {/* {globalState.company_id ? ( */}
            {/* {selectedCompany ? ( */}
            <div className="SubmitButton mt-20">
              <button
                className="btn btn-btn SubmitBtnStyle"
                onClick={handleCompanySubmit}
              >
                Submit
              </button>
            </div>
            {/* ) : null} */}
          </div>
        </div>
      </div>
      {!online ? (
        <div className="bg-danger fixed-bottom d-flex justify-content-center mt-3">
          You are offline. Check your internet connection!
        </div>
      ) : null}
      {/* Modal for no company selected */}
      <Modal show={noCompanyModalShow} onHide={handleNoCompanySelected}>
        <Modal.Header closeButton>
          <Modal.Title> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Please pick one company from list to proceed
          <div className="d-flex gap-5 mt-3">
            <button
              variant="primary"
              onClick={handleNoCompanySelected}
              className="PurpulBtnClock w-30 btn btn-btn"
            >
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Index;
