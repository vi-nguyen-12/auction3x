import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Container,
  Pagination,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import CloseButton from "react-bootstrap/CloseButton";
import PropertyDetails from "../../PropertyDetails";

function PendingListings({
  windowSize,
  toggleShowDocu,
  toggleShowProperty,
  setProperty,
  setDocuments,
  setImages,
  setVideos,
  setRefresh,
  refresh,
  searchBy,
  search,
}) {
  const user = useSelector((state) => state.user);
  const [pendingListings, setPendingListings] = useState([]);
  const [newPendingListings, setNewPendingListings] = useState([]);
  const [pageContent, setPageContent] = useState([]);
  const [currentPageContent, setCurrentPageContent] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  let items = [];

  // seperate incomplete listings into pages
  useEffect(() => {
    if (newPendingListings) {
      const pages = [];
      const reversed = newPendingListings.slice().reverse();
      const totalPages = Math.ceil(reversed.length / 5);
      for (let i = 1; i <= totalPages; i++) {
        pages.push(reversed.slice((i - 1) * 5, i * 5));
      }
      setPageContent(pages);
      setTotalPages(totalPages);
    }
  }, [newPendingListings]);

  useEffect(() => {
    const fetchPendingListings = async () => {
      const id = user._id;
      await authService.sellerPendingAuctions(id).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setPendingListings(res.data);
          setNewPendingListings(res.data);
        }
      });
    };
    fetchPendingListings();
  }, [refresh]);

  useEffect(() => {
    if (search !== undefined || search !== "") {
      if (searchBy === "id") {
        setNewPendingListings(
          pendingListings.filter((listing) =>
            listing._id.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewPendingListings(
          pendingListings.filter((listing) =>
            listing.type.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        setNewPendingListings(
          pendingListings.filter((listing) =>
            listing.details.property_address.formatted_street_address
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      }
    } else {
      setNewPendingListings(pendingListings);
    }
  }, [search]);

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item active={number === currentPage} key={number}>
        {number}
      </Pagination.Item>
    );
  }

  const handlePageChange = (key) => {
    setCurrentPage(key);
    setCurrentPageContent(key - 1);
  };

  return (
    <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
      <Row>
        <Table
          striped
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
              <th>Property</th>
              <th>Edit Property Details</th>
              <th>Documents/Media</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          {pageContent.length > 0 ? (
            pageContent[currentPageContent].map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>*****{auction._id.slice(auction._id.length - 5)}</td>
                  <td>
                    {auction.details.property_address.formatted_street_address}
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
                    <Button
                      variant="primary"
                      onClick={() => {
                        setProperty(auction);
                        toggleShowProperty();
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setDocuments(auction.documents);
                        setImages(auction.images);
                        setVideos(auction.videos);
                        setProperty(auction);
                        toggleShowDocu();
                      }}
                      className="btn btn-primary"
                    >
                      View Documents
                    </button>
                  </td>
                  {auction.isApproved === "pending" ? (
                    <td>
                      <span
                        style={{
                          background: "orange",
                          color: "white",
                          padding: "10px",
                          fontWeight: "bold",
                          borderRadius: "5px",
                        }}
                      >
                        Pending
                      </span>
                    </td>
                  ) : auction.isApproved === "success" ? (
                    <td>Approved</td>
                  ) : auction.isApproved === "fail" ? (
                    <td>Rejected</td>
                  ) : null}
                  <td>{new Date(auction.updatedAt).toLocaleString()}</td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td colSpan={12}>No Pending Approval</td>
              </tr>
            </tbody>
          )}
        </Table>
      </Row>

      <Row>
        {items.map((item, index) => (
          <Col
            style={{
              display: "flex",
              flex: "0",
              padding: "0",
            }}
            key={index}
          >
            <Pagination
              style={{
                background: "transparent",
                margin: "0 2px",
                borderRadius: "5px",
              }}
              onClick={() => handlePageChange(parseInt(item.key))}
            >
              {item}
            </Pagination>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PendingListings;
