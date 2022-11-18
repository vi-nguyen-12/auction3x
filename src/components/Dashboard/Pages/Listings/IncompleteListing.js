import React, { useState, useEffect } from "react";
import { Table, Row, Col, Container, Button } from "react-bootstrap";
import authService from "../../../../services/authServices";
import { useSelector } from "react-redux";
import "../../../../styles/dashboard.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Paginations from "../../../Paginations";

function IncompleteListing({ windowSize, searchBy, search, setMessage }) {
  const user = useSelector((state) => state.user);
  const incompProperty = useSelector((state) => state.incompProperty);
  const [IncompleteListings, setIncompleteListings] = useState([]);
  const [newIncompleteListings, setNewIncompleteListings] = useState([]);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);

  useEffect(() => {
    const fetchIncompleteListings = async () => {
      await authService.getIncompleteProperty(user._id).then((res) => {
        if (res.data.error) {
          if (res.data.error === "Invalid Token") {
            window.location.reload();
          } else {
            setMessage("");
            setMessage(res.data.error);
          }
        } else {
          setIncompleteListings(res.data);
          setNewIncompleteListings(res.data);
        }
      });
    };
    fetchIncompleteListings();
  }, [incompProperty, setMessage, user._id]);

  useEffect(() => {
    if (search) {
      if (searchBy === "id") {
        setNewIncompleteListings(
          IncompleteListings.filter((listing) =>
            listing._id?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewIncompleteListings(
          IncompleteListings.filter((listing) =>
            listing.type?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        setNewIncompleteListings(
          IncompleteListings.filter((listing) =>
            listing.details?.property_address?.formatted_street_address
              ?.toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      }
    } else {
      setNewIncompleteListings(IncompleteListings);
    }
  }, [search, searchBy, IncompleteListings]);

  const handleDelete = async (id) => {
    await authService.deleteProperty(id).then((res) => {
      if (res.data.error) {
        if (res.data.error === "Invalid Token") {
          window.location.reload();
        } else {
          setMessage("");
          setMessage(res.data.error);
        }
      } else {
        setMessage("");
        setMessage("Property Deleted Successfully");
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
        <Table
          borderless
          hover
          style={{
            overflow: windowSize < 800 ? "auto" : "hidden",
            display: windowSize < 800 && "block",
            tableLayout: windowSize < 800 && "auto",
            padding: "0",
            boxShadow: "#d1dcee 0px 0px 20px 10px",
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
          {pageContent.length > 0 ? (
            pageContent[currentPageContent].map((listing, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>*****{listing._id.slice(listing._id.length - 5)}</td>
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
                    <Button
                      variant="primary"
                      className="rounded-0"
                      onClick={() => {
                        window.open(`/multiSellForm/${listing._id}`);
                      }}
                    >
                      Resume
                    </Button>{" "}
                    <Button
                      variant="danger"
                      className="rounded-0"
                      onClick={() => handleDelete(listing._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td colSpan={12}>No Incomplete Listings</td>
              </tr>
            </tbody>
          )}
        </Table>
      </Row>
      <Row className="d-flex justify-content-end">
        <Paginations
          data={newIncompleteListings}
          setPageContents={setPageContents}
          setCurrentPageContents={setCurrentPageContents}
        />
      </Row>
    </Container>
  );
}

export default IncompleteListing;
