import React from "react";
import { Col, Pagination } from "react-bootstrap";

function PropPagePagination({ searchParams, setSearchParams, totalPages }) {
  const items = [];

  const setCurrentPage = (page) => () => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        active={number === parseInt(searchParams.get("page"))}
        key={number}
      >
        {number}
      </Pagination.Item>
    );
  }
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
          {" "}
          <Pagination
            style={{
              background: "transparent",
              margin: "0 2px",
              borderRadius: "5px",
            }}
            onClick={setCurrentPage(parseInt(item.key))}
          >
            {item}
          </Pagination>
        </Col>
      ))}
    </>
  );
}

export default PropPagePagination;
