import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "../Toast";
import authServices from "../../services/authServices";
import Loading from "../Loading";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "../../styles/modal.css";
require("react-bootstrap/ModalHeader");

const SessionExpired = ({ toggleSignIn, toggleSessionTimedOut }) => {
  const handleSignIn = () => {
    toggleSessionTimedOut();
    toggleSignIn();
  };
  const handleCancel = () => {
    toggleSessionTimedOut();
  };
  return (
    <>
      <Modal.Header contentclassname="modal-head-login" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "35px", fontWeight: "bold" }}
          contentclassname="custom-modal-title"
        >
          SESSION TIMEOUT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your session has expired due to inactivity. Click OK to return to login
        page.
      </Modal.Body>
      <Modal.Footer>
        <div className="col text-center mb-2">
          <Button variant="primary" onClick={handleSignIn}>
            OK
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};
export default SessionExpired;
