import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import authService from "../../services/authServices";

function FAQ() {
  const location = useLocation();
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const getFaqs = async () => {
      authService.getFAQs().then((res) => {
        setFaqs(res.data);
      });
    };
    getFaqs();
  }, []);

  return (
    <>
      <CompanyHeader location={location.pathname.split("/")[1]} />
      <Container style={{ padding: "50px" }} fluid>
        {/* question and answer */}
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col md={10}>
            <Accordion>
              {faqs.map((faq, index) => (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    <h5>{faq.question}</h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p style={{ justifyContent: "left" }}>{faq.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FAQ;
