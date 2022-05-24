import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../styles/modal.css";
require("react-bootstrap/ModalHeader");

const SessionExpired = ({ toggleSignIn, toggleSessionTimedOut }) => {
  const history = useHistory();
  const handleSignIn = () => {
    toggleSessionTimedOut();
    toggleSignIn();
  };
  const handleCancel = () => {
    toggleSessionTimedOut();
    history.push("/");
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
