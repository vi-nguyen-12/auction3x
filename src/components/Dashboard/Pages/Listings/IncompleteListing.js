import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import authService from "../../../../services/authServices";
import { useSelector } from "react-redux";
import "../../../../styles/DashBoardStyle.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsFillHouseFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";

function IncompleteListing() {
  const user = useSelector((state) => state.user);
  const [IncompleteListings, setIncompleteListings] = useState([]);

  const history = useHistory();
  console.log(history);
  useEffect(() => {
    const fetchIncompleteListings = async () => {
      await authService.getIncompleteProperty(user._id).then((res) => {
        setIncompleteListings(res.data);
        console.log(res.data);
      });
    };
    fetchIncompleteListings();
  }, []);
  return (
    <div>
      {IncompleteListings.length > 0 ? (
        <>
          <h1>Incomplete Listing</h1>
          <Table borderless hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Property ID</th>
                <th>Property Type</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {IncompleteListings.map((listing, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{listing._id}</td>
                  <td>{listing.type}</td>
                  <td className="progress-1">
                    <CircularProgressbar
                      value={listing.step}
                      text={`${(listing.step / 5) * 100}%`}
                      maxValue={5}
                      strokeWidth={20}
                    />
                  </td>
                  <td>{new Date(listing.updatedAt).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        window.open(
                          `/MultiSellForm/${listing._id}/${listing.step}`
                        );
                      }}
                      className="resume-btn"
                    >
                      Resume
                    </button>{" "}
                    <button className="del-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h1>No Incomplete Listing</h1>
      )}
    </div>
  );
}

export default IncompleteListing;
