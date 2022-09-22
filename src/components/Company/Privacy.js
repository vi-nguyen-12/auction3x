import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import authService from "../../services/authServices";
import parse from "html-react-parser";

function Privacy({ windowSize, setMessage }) {
  const location = useLocation();
  const [text, setText] = useState("");

  useEffect(() => {
    let queryParams = { name: "privacy_policy" };
    authService.getPageContents(queryParams).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setText(res.data[0]?.htmlText || "");
      }
    });
  }, []);
  return (
    <>
      <CompanyHeader location={location.pathname.split("/")[1]} />
      <Container
        style={{
          padding: windowSize < 600 ? "40px 10px" : "50px",
        }}
        fluid
      >
        <Container unselectable="on" className="unselectable">
          {parse(text)}
        </Container>
      </Container>
    </>
  );
}

export default Privacy;
