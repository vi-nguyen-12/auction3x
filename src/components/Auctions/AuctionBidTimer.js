import React from "react";
import { useState, useEffect, useRef } from "react";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import "../../styles/timer.css";

function AuctionBidTimer({ time, windowSize }) {
  const params = useParams();
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  async function setWinner() {
    await authService.setWinner(params.id).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      }
    });
  }

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

      if (distance <= 0) {
        clearInterval(interval.current);
        setWinner();
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
    <div className="d-flex bid-timer">
      <div className="mx-1">{days}d</div>
      <div className="mx-1">{hours}h</div>
      <div className="mx-1">{minutes}m</div>
      <div>{seconds}s</div>
    </div>
  );
}

export default AuctionBidTimer;