import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";

function TermsCondition() {
  const location = useLocation();
  return (
    <>
      <CompanyHeader location={location.pathname.split("/")[1]} />
      <Container>
        <Row>
          <Col md={10} className="pt-5">
            <img
              src="/images/termscondition.png"
              alt=""
              style={{
                marginBottom: "20px",
                maxWidth: "250px",
                maxHeight: "150px",
              }}
            />
          </Col>
        </Row>
        <Row style={{ padding: "0 50px" }}>
          <Col md={10} className="pt-5">
            <h1 style={{ fontSize: "35px", color: "black" }}>
              Terms & Conditions
            </h1>
            <p style={{ fontSize: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo quam
              nunc id diam. Aenean ut orci nec nibh cursus accumsan. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae; Mauris sollicitudin tincidunt eros nec gravida. Ut
              varius auctor accumsan.
            </p>
          </Col>
        </Row>
        <Row style={{ padding: "0 50px" }}>
          <Col md={10} className="pt-5">
            <h1 style={{ fontSize: "35px", color: "black" }}>Privacy Policy</h1>
            <p style={{ fontSize: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo quam
              nunc id diam. Aenean ut orci nec nibh cursus accumsan. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae; Mauris sollicitudin tincidunt eros nec gravida. Ut
              varius auctor accumsan.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TermsCondition;
