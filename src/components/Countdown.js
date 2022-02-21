import React, { useEffect, useState } from "react";
import moment from "moment";

const targetTime = moment("2022-09-10");

const Countdown = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h3 className="counter has-text-centered" style={{ fontSize: "30px" }}>
        <span>{timeBetween.months()} Months </span>
        <span>{timeBetween.days()} Days </span>
        <span>{timeBetween.hours()} Hours </span>
      </h3>
    </>
  );
};

export default Countdown;
