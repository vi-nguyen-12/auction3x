import React, { useState, useEffect } from "react";

const ToastMessage = ({ type, message, duration = 5000 }) => {
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), duration);
  }, []);

  return (
    <>
      {showToast && (
        <div
          className="fixed-bottom d-flex justify-content-center"
          style={{ zIndex: "18" }}
        >
          <div
            className={`toast p-3  bg-${type}`}
            style={{ display: "block", justifyContent: "center" }}
          >
            {message}
          </div>
        </div>
      )}
    </>
  );
};

export default ToastMessage;
