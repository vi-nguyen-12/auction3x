import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useLocation } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import authService from "../../services/authServices";

function FAQ() {
  const location = useLocation();
  const [faqs, setFaqs] = useState([]);
  const [query, setQuery] = useState([]);

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
      <CompanyHeader
        location={location.pathname.split("/")[1]}
        setQuery={setQuery}
        faqs={faqs}
      />
      <Container style={{ padding: "50px" }} fluid>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="primary"
              style={{ marginBottom: "20px", padding: "10px 20px" }}
            >
              General
            </Button>
            <Button
              variant="primary"
              style={{ marginBottom: "20px", padding: "10px 20px" }}
            >
              Payment
            </Button>
            <Button
              variant="primary"
              style={{ marginBottom: "20px", padding: "10px 20px" }}
            >
              Properties
            </Button>
            <Button
              variant="primary"
              style={{ marginBottom: "20px", padding: "10px 20px" }}
            >
              Account
            </Button>
          </Col>
        </Row>
        {/* question and answer */}
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col md={10}>
            <Accordion>
              {query.length > 0
                ? query.map((faq, index) => (
                    <Accordion.Item eventKey={index} key={index}>
                      <Accordion.Header>
                        <h5>{faq.question}</h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p style={{ justifyContent: "left" }}>{faq.answer}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))
                : faqs.map((faq, index) => (
                    <Accordion.Item eventKey={index} key={index}>
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
