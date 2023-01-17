import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import bgImg from "../../images/allProperty.png";
import avatar from "../../images/User-avatar.png";
import authService from "../../services/authServices";
import { useHistory } from "react-router-dom";

function BrokerPage() {
  const history = useHistory();
  const [brokers, setBrokers] = useState([]);
  const urlSearchParams = new URLSearchParams(history.location.search);
  const url = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    if (!history.location.search && !url.isBroker) {
      history.push({
        pathname: "/Brokers",
        search: `?isBroker=true`,
      });
    }
    authService.getBrokers(history.location.search).then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
        alert(res.data.error);
      } else {
        setBrokers(res.data);
        console.log(res.data);
        // setSearchParams(searchParams);
      }
    });
  }, [history.location.search]);

  return (
    <>
      <Row
        className="m-0 p-0"
        style={{
          background: `url(${bgImg})`,
          height: "357px",
        }}
      >
        <Col className="m-0 p-0 d-flex justify-content-center align-items-end pb-5 mb-4">
          <h1 className="text-white display-2">Find Brokers</h1>
        </Col>
      </Row>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
          gridGap: "1rem",
          placeItems: "center",
          margin: "1rem",
        }}
      >
        {[...Array(10)].map((e, i) => (
          <Card className="m-0 p-0 rounded-0" style={{ width: "300px" }}>
            <Card.Img
              variant="top"
              className="rounded-0"
              width={300}
              height={250}
              style={{
                background: `url(${avatar})`,
                backgroundSize: "auto",
                backgroundPosition: "center",
                backgroundColor: "#A5A5A5",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Card.Body>
              <Card.Title
                className="fw-bold"
                style={{ fontFamily: "Interstate", color: "#08080A" }}
              >
                Josh Mehlberger
              </Card.Title>
              <Card.Text>
                <h1 style={{ fontSize: "14px" }}>
                  Auction Tree - Asset Manager
                </h1>
              </Card.Text>
              <Card.Text>
                <p className="text-muted p-0 m-0" style={{ fontSize: "14px" }}>
                  josh@auctiontree.com
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default BrokerPage;
