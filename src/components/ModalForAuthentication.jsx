import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const ModalForAuthentication = ({ show }) => {
    console.log("jdfdfhdefjehrfrehh");
    console.log(show);
  const [modalShow, setModalShow] = useState(show);
  const navigate = useNavigate();
  const handleModalClose = () => {
    setModalShow(false);
    navigate("/");
  };
  return (
    <>
      {/* Modal picture delete Successfully */}
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title> Hold on!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are not Authenticated User. Please sign in First
          <div className="d-flex gap-5 mt-3">
            <button variant="primary" onClick={handleModalClose} className="PurpulBtnClock w-30 btn btn-btn">
              OK
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalForAuthentication;
