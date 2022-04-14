import React from "react";
import moment from "moment";

export const toCountdown = ({ from = moment(), until }) => {
  if (!until) return "";
  const targetTime = moment(until);
  const timeBetween = moment.duration(targetTime.diff(from));
  return `${timeBetween.months()} Months ${timeBetween.days()} Days ${timeBetween.hours()} Hours`;
};

const Countdown = () => {
  return (
    <>
      <h3 className="counter has-text-centered" style={{ fontSize: "30px" }}>
        <span>{toCountdown("2022-09-10")}</span>
      </h3>
    </>
  );
};

export default Countdown;
