import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Docusign = () => {
  const search = useLocation().search;
  const state = new URLSearchParams(search).get("state");
  const event = new URLSearchParams(search).get("event");

  const { envelopeId } = useParams();
  useEffect(() => {
    const postStatusDocusign = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/docusign/callback/${envelopeId}?state=${state}&event=${event}`
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
