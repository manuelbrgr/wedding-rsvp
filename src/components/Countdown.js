import React from "react";
import moment from "moment";

export const toCountdown = ({ from = moment(), until }) => {
  if (!until) return "";
  if (typeof from === "string") from = moment(from);
  const targetTime = moment(until);
  if (from.isAfter(until)) return "";
  const timeBetween = moment.duration(targetTime.diff(from));
  return `${timeBetween.months()} Months ${timeBetween.days()} Days ${timeBetween.hours()} Hours`;
};

const Countdown = (props) => {
  return (
    <>
      <h3
        className="counter has-text-centered"
        style={{ fontSize: "30px" }}
        {...props}
      >
        <span>{toCountdown({ until: "2022-09-10" })}</span>
      </h3>
    </>
  );
};

export default Countdown;
