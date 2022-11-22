import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal, CloseButton } from "react-bootstrap";
import IFrame from "./IFrame";

const DocusignModal = ({ docuUrl, toggleDocu, showDocu, windowSize }) => {
  console.log(showDocu);
  console.log("hello from docusign modal");
  const search = useLocation().search;
  const [dcsState, setDcsState] = useState(
    new URLSearchParams(search).get("state")
  );
  const [title, setTitle] = useState();

  const { envelopeId } = useParams();
  useEffect(() => {
    if (title?.includes("Auction3")) {
      window.close();
    }
  }, [title]);
  return (
    <Modal
      size="xl"
      backdrop="static"
      keyboard={false}
      show={showDocu}
      onHide={toggleDocu}
      centered
      style={{ border: "1px solid red" }}
    >
      <Modal.Body className="vh-100">
        <div
          style={{
            position: "absolute",
            top: windowSize < 600 ? "0" : "25px",
            right: windowSize < 600 ? "0" : "25px",
            zIndex: "999",
          }}
        >
          <CloseButton
            className="modal-close"
            style={{ backgroundColor: "white" }}
            onClick={() => {
              toggleDocu();
            }}
          />
        </div>
        <IFrame src={docuUrl} setTitle={setTitle} />
      </Modal.Body>
    </Modal>
  );
};
export default DocusignModal;
