import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Toast from "../Toast";
import Login from "../Login";
import Modal from "react-bootstrap/Modal";
import Confirm from "../EmailConfirm";
import ForgotPass from "../ForgotPass";
import ChangePass from "../ChangePass";
import SignUp from "../SignUp";
import NumberFormat from "react-number-format";
const AuctionCard = () => {
  const auction = useSelector((state) => state.auction);
  const id = auction._id;

  const auctionProperty = auction.property;
  console.log(auctionProperty);

  const user = useSelector((state) => state.user);
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showButton, popButton] = useState(false);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const toggleImage = () => setFavorite(!favorite);
  const [kycUrl, setKycUrl] = useState("");
  const toogleChangePass = () => popChangePass(!changePass);
  const toogleForgotPass = () => popForgotPass(!forgotPass);
  const toogleButton = () => popButton(!showButton);
  const toogleSignIn = () => popSignIn(!showSignIn);
  const toogleSignUp = () => popUpSignUp(!showSignUp);
  const toogleConfirmModal = () => popupConfirm(!showConfirm);

  const history = useHistory();

  const handleBid = () => {
    if (!user._id) {
      return toogleSignIn();
    }
    if (user.KYC) {
      history.push(`/DisplayAuction/${id}`);
    } else {
      setShowKYC(true);
    }
  };

  const handleDisplay = () => {
    history.push(`/DisplayAuction/${id}`);
    window.location.reload();
  };

  return (
    <div>
      <Card
        // onClick={async () => {const estateData = await authService.sendProperty(id); console.log(estateData)}}
        //move to next page
        className="text-left m-auto"
        style={{
          width: "18rem",
          background: "white",
          padding: "5px",
          width: "450px",
          borderRadius: "10px",
          border: "1px solid lightgrey",
        }}
      >
        {showKYC && <Toast type="warning" message="Please complete your KYC" />}
        <Card.Img
          onClick={handleDisplay}
          variant="top"
          src={auctionProperty.images[0].url}
          className="img-fluid"
          style={{ width: "100%", height: "300px", borderRadius: "10px", cursor: "pointer" }}
        />
        <button
          onClick={toggleImage}
          // icon={favorite ? "/images/star-before.png" : "/images/star.png"}
          style={{
            border: "none",
            position: "absolute",
            display: "flex",
            marginLeft: "90%",
            top: "10px",
            background: "none",
          }}
        >
          {favorite ? (
            <img src="/images/hearted.png" />
          ) : (
            <img src="/images/heart.png" />
          )}
        </button>
        <Card.Body style={{ paddingLeft: "13px" }}>
          <Card.Text>
            <div>
              <div>
                <span className="golden-text">
                  {auctionProperty.details.address.formatted_street_address},{" "}
                  {auctionProperty.details.address.state}
                </span>
                <h4 style={{ marginTop: "5px" }}>Property Address</h4>
              </div>
              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <div>
                  <tr>
                    <td>
                      <p style={{ fontSize: "15px", width: "100px" }}>
                        Online Auction
                      </p>
                    </td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    ></td>
                    <td>
                      <p
                        style={{
                          fontSize: "15px",
                          width: "100px",
                          marginRight: "10px",
                        }}
                      >
                        Additional Info
                      </p>
                    </td>
                  </tr>

                  <td>
                    <p style={{ fontSize: "12px", width: "100px" }}>
                      Feb 09 - 23, 2021
                    </p>
                  </td>

                  <td>
                    <p
                      style={{
                        fontSize: "12px",
                        marginLeft: "150px",
                        width: "100%",
                      }}
                    >
                      {auctionProperty.details.structure.beds_count}BD |{" "}
                      {auctionProperty.details.structure.baths}BA |{" "}
                      {auctionProperty.details.structure.total_area_sq_ft} sq.ft
                    </p>
                  </td>
                </div>
              </div>
            </div>
          </Card.Text>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <p className="grey-small">Starting Bid</p>
              <NumberFormat
                className="black-bold"
                value={auction.startingBid}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              {/* <p className="black-bold">$256, 000, 000</p> */}
            </div>
            <div
              style={{
                alignItems: "flex-end",
                display: "flex",
                marginRight: "6px",
              }}
            >
              <Button
                onClick={handleBid}
                className="black-button text-white"
                variant="dark"
              >
                Place Bid
              </Button>
            </div>
          </div>
        </Card.Body>
        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showConfirm}
          onHide={toogleConfirmModal}
          centered
          contentClassName="confirm"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ color: "#D58F5C" }}
            >
              Confirm Email
            </Modal.Title>
            <Modal.Title
              className="pt-4"
              style={{
                fontSize: "12px",
                color: "#D58F5C",
                position: "absolute",
                marginright: "10px",
                marginTop: "8px",
              }}
            ></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Confirm
              toogleConfirmModal={toogleConfirmModal}
              toogleSignIn={toogleSignIn}
            />
          </Modal.Body>
        </Modal>

        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={forgotPass}
          onHide={toogleForgotPass}
          centered
          contentClassName="forgotPass"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{
                color: "#D58F5C",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              Forgot Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ForgotPass
              toogleForgotPass={toogleForgotPass}
              toogleChangePass={toogleChangePass}
            />
          </Modal.Body>
        </Modal>

        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={changePass}
          onHide={toogleChangePass}
          centered
          contentClassName="forgotPass"
        >
          <Modal.Body>
            <ChangePass toogleChangePass={toogleChangePass} />
          </Modal.Body>
        </Modal>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSignIn}
          onHide={toogleSignIn}
          contentClassName="login"
        >
          <Modal.Body>
            <Login
              toogleSignUp={toogleSignUp}
              toogleSignIn={toogleSignIn}
              toogleButton={toogleButton}
              toogleForgotPass={toogleForgotPass}
            />
          </Modal.Body>
        </Modal>

        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSignUp}
          onHide={toogleSignUp}
          contentClassName="custom-modal-style"
        >
          <Modal.Body>
            <SignUp
              toogleSignUp={toogleSignUp}
              toogleConfirmModal={toogleConfirmModal}
              toogleSignIn={toogleSignIn}
            />
          </Modal.Body>
        </Modal>
      </Card>
    </div>
  );
};

export default AuctionCard;
