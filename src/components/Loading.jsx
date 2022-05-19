import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const spinnerAnimation = keyframes`
0% {
    transform: rotate(0deg);
    visibility: hidden;
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation-name: ${spinnerAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;
const Loading = () => {
  return (
    <>
      <Loader>
        <Spinner />
      </Loader>
    </>
  );
};

export default Loading;
