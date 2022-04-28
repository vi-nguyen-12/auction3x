import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const Docusign = () => {
  const search = useLocation().search;
  const state = new URLSearchParams(search).get("state");
  const event = new URLSearchParams(search).get("event");

  const { envelopeId } = useParams();
  const handleOnClick = () => {
    window.close();
  };
  useEffect(() => {
    const postStatusDocusign = async () => {
      await axios
        .get(
          `https://auction3x-be.azurewebsites.net/api/docusign/callback/${envelopeId}?state=${state}&event=${event}`
        )
        .then((response) => {
          if (
            response.data === "signing_complete" ||
            response.data === "viewing_complete"
          ) {
            window.close();
          }
        });
    };
    postStatusDocusign();
  });
  return <></>;
};
export default Docusign;
