import React, { useState } from "react";

// function Pagination({ cardPerPage, totalCard, paginate }) {
// const pageNumber = [];

// for (let i = 1; i <= Math.ceil(totalCard / cardPerPage); i++) {
//   pageNumber.push(i);
// }

// return (
//   <nav style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
//     <ul className="pagination">
//       {pageNumber.map((number) => (
//         <li key={number} className="page-item">
//           <a onClick={() => paginate(number)} href="" className="page-link">
//             {number}
//           </a>
//         </li>
//       ))}
//     </ul>
//   </nav>
// );
function Pagination({ totalCount, currentPage, pageSize, onPageChange, siblingCount }) {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

}

export default Pagination;
