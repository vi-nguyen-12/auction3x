import React from "react";
import { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";

const RegistrationTimer = ({ time, toggleRegistEnded, windowSize }) => {
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
        toggleRegistEnded();
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
          <th>{days}d •</th>
          <th>{hours}h •</th>
          <th>{minutes}m •</th>
          <th>{seconds}s</th>
        </tr>
      </thead>
    </Table>
  );
};

export default RegistrationTimer;
