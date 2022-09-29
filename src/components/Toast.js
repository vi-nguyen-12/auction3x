import React, { useState, useEffect } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";

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
          className="d-flex justify-content-center align-items-center position-fixed bg-white"
          id={showToast ? "toast-container" : "toast-container-hide"}
          style={{
            zIndex: "10000",
            right: "20px",
            top: "60px",
            boxShadow: "0px 15px 55px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className={`toast p-3  bg-${type}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "0",
              border: "none",
            }}
          >
            <div className="toast-message px-2">
              <IoNotificationsCircleOutline
                style={{ marginRight: "1rem" }}
                size={35}
              />
              {message}
            </div>
            <div className="d-flex align-items-center">
              <button
                onClick={() => setShowToast(false)}
                className="toast-close-btn"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastMessage;
