import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const ModalForAuthentication = ({ show }) => {
  const [modalShow, setModalShow] = useState(show);
  const navigate = useNavigate();
  const handleModalClose = () => {
    setModalShow(false);
    navigate("/");
  };
  useState(() => {
    setModalShow(true);
  }, []);
  return (
    <>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title> Hold on!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className="text-center">You are not Authenticated User. Please sign in First</p>
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
