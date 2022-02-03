import React from "react";
import { useState, useEffect, useRef } from "react";

const AuctionTimer = ({ auctionEndDate, toogleAuction }) => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  let interval = useRef();
  const startTimer = () => {
    interval.current = setInterval(() => {
      const countDownDate = new Date(auctionEndDate).getTime();
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
        toogleAuction();
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(interval.current);
  }, []);

  return (
    <div
      className="auction-timer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        fontWeight: "700",
        fontSize: "20px",
      }}
    >
      <div className="auction-timer__days">
        <span> {days} </span>
        <span>days</span>
      </div>
      <div className="auction-timer__hours">
        <span style={{ marginLeft: "10px" }}> {hours} </span>
        <span>hrs</span>
      </div>
      <div className="auction-timer__minutes">
        <span style={{ marginLeft: "10px" }}> {minutes} </span>
        <span>min</span>
      </div>
      <div className="auction-timer__seconds">
        <span style={{ marginLeft: "10px" }}> {seconds} </span>
        <span>sec</span>
      </div>
    </div>
  );
};

export default AuctionTimer;
