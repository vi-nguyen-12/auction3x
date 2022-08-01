import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Container,
  Pagination,
  Button,
} from "react-bootstrap";
import authService from "../../../../services/authServices";
import { useSelector } from "react-redux";
import "../../../../styles/dashboard.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function IncompleteListing({ windowSize }) {
  const user = useSelector((state) => state.user);
  const incompProperty = useSelector((state) => state.incompProperty);
  const [IncompleteListings, setIncompleteListings] = useState([]);
  const [pageContent, setPageContent] = useState([]);
  const [currentPageContent, setCurrentPageContent] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  let items = [];

  useEffect(() => {
    const fetchIncompleteListings = async () => {
      await authService.getIncompleteProperty(user._id).then((res) => {
        setIncompleteListings(res.data);
      });
    };
    fetchIncompleteListings();
  }, [incompProperty]);

  // seperate incomplete listings into pages
  useEffect(() => {
    if (IncompleteListings) {
      const pages = [];
      const reversed = IncompleteListings.slice().reverse();
      const totalPages = Math.ceil(reversed.length / 5);
      for (let i = 1; i <= totalPages; i++) {
        pages.push(reversed.slice((i - 1) * 5, i * 5));
      }
      setPageContent(pages);
      setTotalPages(totalPages);
    }
  }, [IncompleteListings]);

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
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        marginTop: "50px",
      }}
    >
      <Row>
        <h1>Incomplete Process</h1>
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
          {pageContent.length > 0 ? (
            pageContent[currentPageContent].map((listing, index) => (
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
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.open(`/multiSellForm/${listing._id}`);
                      }}
                    >
                      Resume
                    </Button>{" "}
                    <Button
                      variant="danger"
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

export default IncompleteListing;
