import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
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
          `https://auction10x-be.azurewebsites.net/api/docusign/callback/${envelopeId}?state=${state}&event=${event}`
        )
        .then((response) => {
          console.log(response);
        });
    };
    postStatusDocusign();
  });
  return (
    <>
      <h1>Docusign is {event}</h1>
      <button onClick={handleOnClick}>Click to close this page</button>
    </>
  );
};
export default Docusign;
