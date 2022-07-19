import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import authService from "../../services/authServices";
import parse from "html-react-parser";

function TermsCondition({ windowSize }) {
  const [text, setText] = useState("");
  const location = useLocation();

  useEffect(() => {
    let queryParams = { officialName: "terms_of_use" };
    authService.getPageContents(queryParams).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
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

export default TermsCondition;
