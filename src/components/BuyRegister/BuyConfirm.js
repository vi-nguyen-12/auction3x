import React from "react";
import { Modal } from "react-bootstrap";

const BuyConfirm = ({ toogleStep, step }) => {
  return (
    <>
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentClassName="custom-modal-title"
        >
          Enter your Bid
        </Modal.Title>
      </Modal.Header>
      <form>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            facilisis, erat a euismod aliquam, nisi nunc pretium nunc, eget
          </p>
          <div className="auction-info">
            <tr>
              <td
                style={{
                  position: "relative",

                  padding: "15px",
                }}
              >
                Auction Ends import
              </td>
            </tr>
            <tr>
              <td
                style={{
                  position: "relative",

                  padding: "15px",
                }}
              >
                Leading Bid
              </td>
            </tr>
            <tr>
              <td
                style={{
                  position: "relative",

                  padding: "15px",
                }}
              >
                Minimal Bid
              </td>
            </tr>
            <tr>
              <td
                style={{
                  position: "relative",

                  padding: "15px",
                }}
              >
                Your Bid
              </td>
            </tr>
          </div>

          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              margin: "auto",
            }}
          >
            <input
              style={{ padding: "10px", width: "100%" }}
              type="text"
              placeholder="Your Bid"
            />
            <button
              style={{ padding: "10px", width: "100%" }}
              className="nxt-btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BuyConfirm;
