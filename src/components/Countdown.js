import React from "react";
import moment from "moment";
import { useTranslation } from "gatsby-plugin-react-i18next";

export const toCountdown = ({ from = moment(), until, t }) => {
  if (!until) return "";
  if (typeof from === "string") from = moment(from);
  const targetTime = moment(until);
  if (from.isAfter(until)) return "";
  const timeBetween = moment.duration(targetTime.diff(from));
  return `${timeBetween.months()} ${t(
    "countdown.months"
  )} ${timeBetween.days()} ${t("countdown.days")} ${timeBetween.hours()} ${t(
    "countdown.hours"
  )}`;
};

const Countdown = (props) => {
  const { t } = useTranslation();
  const browser = typeof window !== "undefined" && window;

  return (
    <>
      <h3
        className="counter has-text-centered"
        style={{ fontSize: "30px", visibility: browser ? "visible" : "hidden" }}
        {...props}
      >
        <span>{toCountdown({ until: "2022-09-10", t })}</span>
      </h3>
    </>
  );
};

export default Countdown;
