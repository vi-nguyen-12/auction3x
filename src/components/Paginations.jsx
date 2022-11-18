import React, { useState, useEffect } from "react";
import { Pagination, Col } from "react-bootstrap";

function Paginations({ data, setPageContents, setCurrentPageContents }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  let items = [];

  useEffect(() => {
    if (data) {
      const pages = [];
      const reversed = data.slice().reverse();
      const totalPages = Math.ceil(reversed.length / 5);
      for (let i = 1; i <= totalPages; i++) {
        pages.push(reversed.slice((i - 1) * 5, i * 5));
      }
      setPageContents(pages);
      setTotalPages(totalPages);
    }
  }, [data, currentPage]);

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        style={{ borderRadius: "0" }}
        active={number === currentPage}
        key={number}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handlePageChange = (key) => {
    setCurrentPage(key);
    setCurrentPageContents(key - 1);
  };
  return (
    <>
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
              borderRadius: "0",
            }}
            onClick={() => handlePageChange(parseInt(item.key))}
          >
            {item}
          </Pagination>
        </Col>
      ))}
    </>
  );
}

export default Paginations;
