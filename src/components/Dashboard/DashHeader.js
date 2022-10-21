import React, { useState } from "react";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../services/authServices";
import Loading from "../Loading";
import "../../styles/dashboard.css";

function DashHeader({
  location,
  windowSize,
  setSearchBy,
  setSearch,
  suggest,
  setSuggest,
  setMessage,
}) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [notifi, setNotifi] = useState(false);
  const [loader, setLoader] = useState(false);
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
          setMessage("");
          setMessage(res.data.error);
        }
      })
      .catch((err) => {
        setMessage("");
        setMessage(err.message);
      });
  };

  return (
    <Container
      style={{
        width: "100vw",
        padding: windowSize < 800 ? "0" : "0 5%",
        margin: windowSize < 800 && "0",
      }}
    >
      {loader && <Loading />}
      {windowSize > 768 ? (
        <Row style={{ marginBottom: "30px" }}>
          <Col>
            {location === "/Dashboard/Listings/YourListings" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Your Listings
              </h1>
            ) : location === "/Dashboard/Messaging" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Messaging
              </h1>
            ) : location === "/Dashboard/Profile" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Profile
              </h1>
            ) : location === "/Dashboard" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Dashboard
              </h1>
            ) : location === "/Dashboard/Auctions/SavedAuctions" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Saved Auctions
              </h1>
            ) : location === "/Dashboard/Auctions/BuyerApproval" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Buyer Approval
              </h1>
            ) : location === "/Dashboard/Auctions/BidAuctions" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Bid Auctions
              </h1>
            ) : location === "/Dashboard/Auctions/WinAuctions" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Won Auctions
              </h1>
            ) : location === "/Dashboard/Listings/PendingApproval" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Pending Approval
              </h1>
            ) : location === "/Dashboard/Listings/SoldListings" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Sold Listings
              </h1>
            ) : location === "/Dashboard/Listings/IncompleteListing" ? (
              <h1
                style={{
                  fontFamily: "Interstate",
                  fontWeight: "600",
                  color: "#273240",
                }}
              >
                Incomplete Listings
              </h1>
            ) : null}
          </Col>
          <Col>
            <div className="search">
              {location === "/Dashboard/Messaging" ? (
                <></>
              ) : location === "/Dashboard/Profile" ? (
                <></>
              ) : (
                <div className="d-flex">
                  {location !== "/Dashboard" && (
                    <Form.Select
                      className="form-control mx-3 border-0"
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
                      marginRight: "1rem",
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

                  {location === "/Dashboard" && suggest?.length > 0 && (
                    <div
                      className="position-absolute bg-white shadow"
                      style={{
                        width: "25rem",
                        height: "8rem",
                        marginTop: "50px",
                        borderRadius: "0 0 5px 5px",
                        overflow: "auto",
                      }}
                    >
                      {suggest.map((suggestion, index) => (
                        <div
                          className="suggest w-100 p-2 px-3"
                          style={{
                            cursor: "pointer",
                            borderBottom: "1px solid #e9ecef",
                          }}
                          onClick={() => {
                            setLoader(true);
                            history.push(suggestion.value);
                            // setSuggest([]);
                            window.location.reload();
                            setLoader(false);
                          }}
                        >
                          {suggestion.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
                  width: notifications?.length > 10 && "1.8rem",
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
                    {notifications
                      .slice()
                      .reverse()
                      .map((notification, index) => (
                        <div key={index} className="notifi-dropdown-item">
                          <span
                            onClick={() =>
                              notification.auctionId.length > 0
                                ? window.open(
                                    `/DisplayAuctions/${notification.auctionId}`
                                  )
                                : notification.buyerId.length > 0 &&
                                  history.push(
                                    `/Dashboard/Auctions/BuyerApproval`
                                  )
                            }
                          >
                            {notification.message}
                          </span>
                          <span
                            onClick={() => handleDelete(notification._id)}
                            style={{ cursor: "pointer", color: "red" }}
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
                    marginBottom: "40px",
                    marginLeft: "-20px",
                    marginRight: "0",
                    width: notifications.length > 10 && "1.8rem",
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
                <h1
                  style={{
                    fontFamily: "Interstate",
                    fontWeight: "600",
                    color: "#273240",
                  }}
                >
                  Messaging
                </h1>
              ) : location === "/Dashboard/Profile" ? (
                <h1
                  style={{
                    fontFamily: "Interstate",
                    fontWeight: "600",
                    color: "#273240",
                  }}
                >
                  Profile
                </h1>
              ) : (
                <div className="d-grid">
                  <div className="d-flex">
                    {location !== "/Dashboard" && (
                      <Form.Select
                        className="form-control mx-3 border-0"
                        style={{ width: "150px" }}
                        onChange={(e) => setSearchBy(e.target.value)}
                      >
                        <option value="id">ID</option>
                        <option value="propType">Property Type</option>
                        <option value="address">Address</option>
                      </Form.Select>
                    )}
                    <div className="searchBar">
                      <input
                        type="text"
                        placeholder="Search Here"
                        onInput={(e) =>
                          (e.target.value = e.target.value.toLowerCase())
                        }
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <FiSearch color="black" size={25} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    {location === "/Dashboard/Listings/AuctionListings" ? (
                      <h1
                        style={{
                          fontFamily: "Interstate",
                          fontWeight: "600",
                          color: "#273240",
                        }}
                      >
                        Your Listings
                      </h1>
                    ) : location === "/Dashboard" ? (
                      <h1
                        style={{
                          fontFamily: "Interstate",
                          fontWeight: "600",
                          color: "#273240",
                        }}
                      >
                        Dashboard
                      </h1>
                    ) : location === "/Dashboard/Auctions/SavedAuctions" ? (
                      <h1
                        style={{
                          fontFamily: "Interstate",
                          fontWeight: "600",
                          color: "#273240",
                        }}
                      >
                        Saved Auctions
                      </h1>
                    ) : location === "/Dashboard/Auctions/BuyerApproval" ? (
                      <h1
                        style={{
                          fontFamily: "Interstate",
                          fontWeight: "600",
                          color: "#273240",
                        }}
                      >
                        Buyer Approval
                      </h1>
                    ) : location === "/Dashboard/Auctions/BidAuctions" ? (
                      <h1
                        style={{
                          fontFamily: "Interstate",
                          fontWeight: "600",
                          color: "#273240",
                        }}
                      >
                        Bid Auctions
                      </h1>
                    ) : location === "/Dashboard/Auctions/WinAuctions" ? (
                      <h1
                        style={{
                          fontFamily: "Interstate",
                          fontWeight: "600",
                          color: "#273240",
                        }}
                      >
                        Won Auctions
                      </h1>
                    ) : location === "/Dashboard/Listings/PendingApproval" ? (
                      <h1
                        style={{
                          fontFamily: "Interstate",
                          fontWeight: "600",
                          color: "#273240",
                        }}
                      >
                        Pending Approval
                      </h1>
                    ) : location === "/Dashboard/Listings/SoldListings" ? (
                      <h1
                        style={{
                          fontFamily: "Interstate",
                          fontWeight: "600",
                          color: "#273240",
                        }}
                      >
                        Sold Listings
                      </h1>
                    ) : location === "/Dashboard/Listings/IncompleteListing" ? (
                      <h1
                        style={{
                          fontFamily: "Interstate",
                          fontWeight: "600",
                          color: "#273240",
                        }}
                      >
                        Incomplete Listings
                      </h1>
                    ) : null}
                  </div>
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
