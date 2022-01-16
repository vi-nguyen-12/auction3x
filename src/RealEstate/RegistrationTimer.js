import React from "react";
import { useState, useEffect, useRef } from "react";

const RegistrationTimer = ({ RegistrationEndDate }) => {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    let interval = useRef();
    const startTimer = () => {
        interval.current = setInterval(() => {
            const countDownDate = new Date(RegistrationEndDate).getTime();
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
        <section
            style={{
                display: "flex",
                flex: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                padding: "0",
            }}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontSize: "18px" }}>
                <section>
                    <p>{days}</p>
                    <p style={{ marginTop: "-18px" }}>
                        <small>Days</small>
                    </p>
                </section>
                <span> : </span>
                <section>
                    <p>{hours}</p>
                    <p style={{ marginTop: "-18px" }}>
                        <small>Hours</small>
                    </p>
                </section>
                <span> : </span>
                <section>
                    <p>{minutes}</p>
                    <p style={{ marginTop: "-18px" }}>
                        <small>Minutes</small>
                    </p>
                </section>
                <span> : </span>
                <section>
                    <p>{seconds}</p>
                    <p style={{ marginTop: "-18px" }}>
                        <small>Seconds</small>
                    </p>
                </section>
            </div>
        </section>
    );
};

export default RegistrationTimer;
