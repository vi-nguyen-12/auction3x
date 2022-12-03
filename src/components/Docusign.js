import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_NODE_ENV === "test"
    ? process.env.REACT_APP_TEST_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const Docusign = ({ toggleDocu, showDocu, setMessage }) => {
  const search = useLocation().search;
  const state = new URLSearchParams(search).get("state");
  const event = new URLSearchParams(search).get("event");

  const { envelopeId } = useParams();
  useEffect(() => {
    const postStatusDocusign = async () => {
      await axios
        .get(
          `${apiUrl}/api/docusign/callback/${envelopeId}?state=${state}&event=${event}`
        )
        .then((response) => {
          if (
            response.data === "signing_complete" ||
            response.data === "viewing_complete"
          ) {
            setMessage("");
            setTimeout(() => {
              setMessage(
                "Thanks for signing selling agreement with us. This tab will close in 10 seconds and back to main page to continue process!"
              );
            }, 100);
            window.close();
          }
        });
    };
    postStatusDocusign();
    // const frame = document.getElementById("the_frame");
    // frame.parentNode.removeChild(frame);
  }, []);
  return <></>;
};
export default Docusign;
