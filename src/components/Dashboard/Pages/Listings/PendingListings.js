import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "../Auctions/SavedAuctionsCard";
import authService from "../../../../services/authServices";

function PendingListings() {
  const user = useSelector((state) => state.user);
  const [pendingListings, setPendingListings] = useState([]);

  useEffect(() => {
    const fetchPendingListings = async () => {
      const id = user._id;
      await authService.sellerPendingAuctions(id).then((res) => {
        setPendingListings(res.data);
      });
    };
    fetchPendingListings();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Owner Name</th>
          <th>Property Type</th>
          <th>Status</th>
          <th>Images</th>
          <th>Documents</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      {pendingListings.length > 0 ? (
        pendingListings.map((auction, index) => (
          <tbody>
            <tr>
              <td>{index}</td>
              <td>{auction.details.owner_name}</td>
              {auction.type === "real-estate" ? (
                <td>Real Estate</td>
              ) : auction.type === "car" ? (
                <td>Car</td>
              ) : null}
              {auction.isApproved === "pending" ? (
                <td>Pending</td>
              ) : auction.isApproved === "success" ? (
                <td>Approved</td>
              ) : auction.isApproved === "fail" ? (
                <td>Rejected</td>
              ) : null}
              <td>
                <div
                  style={{
                    width: "100%",
                    alignItems: "right",
                    cursor: "pointer",
                  }}
                >
                  <img
                    width="100px"
                    height="50px"
                    src={auction.images[0].url}
                  />
                </div>
              </td>
              <td>
                <Button variant="primary">View</Button>
              </td>
              <td>{new Date(auction.updatedAt).toLocaleString()}</td>
            </tr>
          </tbody>
        ))
      ) : (
        <h1>No Pending Approval</h1>
      )}
    </Table>
  );
}

export default PendingListings;
