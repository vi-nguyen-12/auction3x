import React from "react";
import Dash from "./Dash";
import DashHeader from "../DashHeader";
import { useLocation } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

function DashPages() {
  const location = useLocation();
  return (
    <div>
      <Row>
        <DashHeader location={location.pathname.split("/")[1]} />
      </Row>
    </div>
  );
}

export default DashPages;
