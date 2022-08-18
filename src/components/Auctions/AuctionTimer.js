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
    <Table className="timerTable" style={{ padding: "0" }} borderless>
      <thead>
        <tr className="timerHead">
          <th>{days} :</th>
          <th>{hours} :</th>
          <th>{minutes} :</th>
          <th>{seconds}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="timerName">
          <td>D</td>
          <td>HR</td>
          <td>
            {/* {windowSize > 800 ? "Minutes" : "Min"} */}
            MIN
          </td>
          <td>
            {/* {windowSize > 800 ? "Seconds" : "Sec"} */}
            SEC
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default AuctionTimer;
