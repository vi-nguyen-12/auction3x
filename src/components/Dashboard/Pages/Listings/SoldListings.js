import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import authService from "../../../../services/authServices";
import { useSelector } from "react-redux";

function SoldListings() {
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [showPic, setShowPic] = useState(false);
  const toogleShowPic = () => setShowPic(!showPic);
  const [soldListings, setSoldListings] = useState([]);

  useEffect(() => {
    authService.getSellerSoldListings(user._id).then((res) => {
      console.log(res);
      setSoldListings(res.data);
    });
  }, []);

  return (
    <>
      <h1>Sold Properties</h1>
      <Table
        striped
        borderless
        hover
        style={{
          overflow: "hidden",
          borderRadius: "5px",
          boxShadow: "#d7c4c4 0px 0px 20px 16px",
          marginTop: "50px",
          width: "70vw",
        }}
      >
        <thead style={{ background: "black", color: "white" }}>
          <tr>
            <th>#</th>
            <th>Auction ID</th>
            <th>Property Type</th>
            <th>Property Address</th>
            <th>Bid Amount</th>
            <th>View</th>
          </tr>
        </thead>
        {soldListings.length > 0 &&
          soldListings.map((auction, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>
                  {auction._id}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      width="100px"
                      height="50px"
                      onClick={() => {
                        setImages(auction.property.images);
                        toogleShowPic();
                      }}
                      src={
                        auction.property.images.length > 0
                          ? auction.property.images[0]
                          : ""
                      }
                    />
                  </div>
                </td>
                <td>{auction.property.type}</td>
                <td>{auction.property.address}</td>
                <td>{auction.bidAmount}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setImages(auction.property.images);
                      toogleShowPic();
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </>
  );
}

export default SoldListings;
