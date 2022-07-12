import React, { useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "../../styles/dashboard.css";

function DashHeader({ location, windowSize }) {
  const history = useHistory();
  const [notifi, setNotifi] = useState(false);
  return (
    <Container
      style={{
        width: "100vw",
        padding: windowSize < 800 && "0",
        margin: windowSize < 800 && "0",
      }}
    >
      {windowSize > 768 ? (
        <Row style={{ marginBottom: "30px" }}>
          <Col>
            <div
              className="searchBar"
              style={{
                borderRadius: "45px",
                paddingLeft: "8px",
                width: "400px",
              }}
            >
              <input type="text" placeholder="Search Here" />
              <FiSearch color="black" size={25} />
            </div>
          </Col>
          <Col>
            <div className="search">
              <Button
                onClick={() => setNotifi(!notifi)}
                onMouseLeave={() => setNotifi(false)}
                className="bell"
              >
                <BsBellFill color="#737b8b" size={23} />
              </Button>
              <div className="notification">0</div>
              <div
                onMouseEnter={() => setNotifi(true)}
                onMouseLeave={() => setNotifi(false)}
                style={{ display: notifi ? "block" : "none" }}
                className="notifi-drop-down"
              >
                <div className="notifi-drop-down-content">
                  <header
                    style={{
                      width: "100%",
                      height: "40px",
                      background: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 0",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Notification
                  </header>
                  <div
                    style={{
                      width: "100%",
                      background: "#e8eff2",
                      height: "260px",
                      overflowY: "scroll",
                    }}
                    className="notifi-drop-down-body"
                  >
                    <div className="notifi-dropdown-item">Something here</div>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => history.push("/Dashboard/Messaging")}
                className="message"
              >
                <AiFillMessage color="#737b8b" size={23} />
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row style={{ marginBottom: "30px", width: "100%" }}>
            <Col>
              <div className="search" style={{ justifyContent: "center" }}>
                <Button
                  onClick={() => setNotifi(!notifi)}
                  onMouseLeave={() => setNotifi(false)}
                  className="bell"
                >
                  <BsBellFill color="#737b8b" size={23} />
                </Button>
                <div
                  className="notification"
                  style={{
                    marginBottom: "30px",
                    marginLeft: "-20px",
                    marginRight: "0",
                  }}
                >
                  0
                </div>
                <div
                  onMouseEnter={() => setNotifi(true)}
                  onMouseLeave={() => setNotifi(false)}
                  style={{ display: notifi ? "block" : "none" }}
                  // style={{
                  //   position: "absolute",
                  //   width: "100px",
                  //   height: "100px",
                  //   background: "white",
                  // }}
                  className="notifi-drop-down"
                >
                  <div className="notifi-drop-down-content">
                    <header
                      style={{
                        width: "100%",
                        height: "40px",
                        background: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 0",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Notification
                    </header>
                    <div
                      style={{
                        width: "100%",
                        background: "#e8eff2",
                        height: "260px",
                        overflowY: "scroll",
                      }}
                      className="notifi-drop-down-body"
                    >
                      <div className="notifi-dropdown-item">Something here</div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => history.push("/Dashboard/Messaging")}
                  className="message"
                >
                  <AiFillMessage color="#737b8b" size={23} />
                </Button>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: "30px" }}>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <div className="searchBar">
                <input type="text" placeholder="Search Here" />
                <FiSearch color="black" size={25} />
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default DashHeader;
