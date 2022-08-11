import React, { useState } from "react";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../services/authServices";
import "../../styles/dashboard.css";

function DashHeader({ location, windowSize, setSearchBy, setSearch }) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [notifi, setNotifi] = useState(false);
  const [notifications, setNotifications] = useState(user.notifications);

  const handleDelete = async (id) => {
    const ids = {
      userId: user._id,
      notificationId: id,
    };
    setNotifications(notifications.filter((noti) => noti._id !== id));
    await authService
      .deleteNotification(ids)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

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
            {location === "/Dashboard/Messaging" ? (
              <h1 className="mx-5">Messaging</h1>
            ) : location === "/Dashboard/Profile" ? (
              <h1 className="mx-5">Profile</h1>
            ) : (
              <div className="d-flex">
                {location !== "/Dashboard" && (
                  <Form.Select
                    className="form-control mx-3"
                    style={{ width: "150px" }}
                    onChange={(e) => setSearchBy(e.target.value)}
                  >
                    <option value="id">ID</option>
                    <option value="propType">Property Type</option>
                    <option value="address">Address</option>
                  </Form.Select>
                )}
                <div
                  className="searchBar"
                  style={{
                    borderRadius: "45px",
                    paddingLeft: "8px",
                    width: "400px",
                  }}
                >
                  <input
                    type="text"
                    onInput={(e) =>
                      (e.target.value = e.target.value.toLowerCase())
                    }
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Here"
                  />
                  <FiSearch color="black" size={25} />
                </div>
              </div>
            )}
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
              <div
                className="notification"
                style={{
                  width: notifications.length > 10 && "1.8rem",
                  borderRadius: notifications.length > 10 && "0.8em",
                }}
              >
                {notifications.length > 10 ? "10+" : notifications.length}
              </div>
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
                    {notifications.map((notification, index) => (
                      <div key={index} className="notifi-dropdown-item">
                        {notification.message}
                        <span
                          onClick={() => handleDelete(notification._id)}
                          style={{ cursor: "pointer" }}
                        >
                          X
                        </span>
                      </div>
                    ))}
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
                    width: notifications.length > 10 && "1.8rem",
                    borderRadius: notifications.length > 10 && "0.8em",
                  }}
                >
                  {notifications.length > 10 ? "10+" : notifications.length}
                </div>
                <div
                  onMouseEnter={() => setNotifi(true)}
                  onMouseLeave={() => setNotifi(false)}
                  style={{
                    display: notifi ? "block" : "none",
                    marginLeft: "-50px",
                    marginTop: "380px",
                    paddingTop: "20px",
                  }}
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
                      {notifications.map((notification, index) => (
                        <div key={index} className="notifi-dropdown-item">
                          {notification.message}
                          <span
                            onClick={() => handleDelete(notification._id)}
                            style={{ cursor: "pointer" }}
                          >
                            X
                          </span>
                        </div>
                      ))}
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
              {location === "/Dashboard/Messaging" ? (
                <h1 className="mx-5">Messaging</h1>
              ) : location === "/Dashboard/Profile" ? (
                <h1 className="mx-5">Profile</h1>
              ) : (
                <div className="searchBar">
                  <input type="text" placeholder="Search Here" />
                  <FiSearch color="black" size={25} />
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default DashHeader;
