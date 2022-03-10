import React, { useState } from "react";

function Pagination({ cardPerPage, totalCard, paginate }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalCard / cardPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
