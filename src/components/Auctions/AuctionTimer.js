import React from "react";
import { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import "../../styles/timer.css";

const AuctionTimer = ({ time, windowSize }) => {
  // console.log(windowSize);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  let interval = useRef();
  const startTimer = () => {
    interval.current = setInterval(() => {
      const countDownDate = new Date(time).getTime();
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
      } else {
        setDays(days.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
        setHours(hours.toLocaleString(undefined, { minimumIntegerDigits: 2 }));
        setMinutes(
          minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })
        );
        setSeconds(
          seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })
        );
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(interval.current);
  }, []);

  return (
    // <ul className="d-flex p-0 m-0 timer">
    //   <li
    //     style={{
    //       listStyle: "none",
    //       marginRight: "30px",
    //     }}
    //   >
    //     {days}d
    //   </li>
    //   <li
    //     style={{
    //       marginRight: "35px",
    //     }}
    //   >
    //     {hours}h
    //   </li>
    //   <li
    //     style={{
    //       marginRight: "35px",
    //     }}
    //   >
    //     {minutes}m
    //   </li>
    //   <li
    //     style={{
    //       marginRight: "35px",
    //     }}
    //   >
    //     {seconds}s
    //   </li>
    // </ul>
    <Table className="timerTable" style={{ padding: "0" }} borderless>
      <thead>
        <tr className="timerHead">
          <th>{days}d •</th>
          <th>{hours}h •</th>
          <th>{minutes}m •</th>
          <th>{seconds}s</th>
        </tr>
      </thead>
    </Table>
  );
};

export default AuctionTimer;
