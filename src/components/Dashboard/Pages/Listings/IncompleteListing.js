import React, { useState, useEffect } from "react";
import { Table, Row, Container } from "react-bootstrap";
import authService from "../../../../services/authServices";
import { useSelector } from "react-redux";
import "../../../../styles/dashboard.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function IncompleteListing({ windowSize }) {
  const user = useSelector((state) => state.user);
  const incompProperty = useSelector((state) => state.incompProperty);
  const [IncompleteListings, setIncompleteListings] = useState([]);

  useEffect(() => {
    const fetchIncompleteListings = async () => {
      await authService.getIncompleteProperty(user._id).then((res) => {
        setIncompleteListings(res.data);
      });
    };
    fetchIncompleteListings();
  }, [incompProperty]);

  const handleDelete = async (id) => {
    await authService.deleteProperty(id).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Property Deleted Successfully");
        window.location.reload();
      }
    });
  };
  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        marginTop: "50px",
      }}
    >
      <Row>
        <h1>Incomplete Listing</h1>
        <Table
          borderless
          hover
          style={{
            overflow: windowSize < 800 ? "auto" : "hidden",
            display: windowSize < 800 && "block",
            tableLayout: windowSize < 800 && "auto",
            padding: "0",
            borderRadius: "5px",
            boxShadow: "#d7c4c4 0px 0px 20px 16px",
            marginTop: "50px",
          }}
        >
          <thead style={{ background: "black", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Property ID</th>
              <th>Property Type</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          {IncompleteListings.length > 0 ? (
            IncompleteListings.slice()
              .reverse()
              .map((listing, index) => (
                <tbody key={index}>
                  <tr>
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
                            `/MultiSellForm/${user._id}/${listing._id}/${listing.step}`
                          );
                        }}
                        className="resume-btn"
                      >
                        Resume
                      </button>{" "}
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="del-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))
          ) : (
            <tbody>
              <tr>
                <td colSpan="6">No Incomplete Listings</td>
              </tr>
            </tbody>
          )}
        </Table>
      </Row>
    </Container>
  );
}

export default IncompleteListing;
