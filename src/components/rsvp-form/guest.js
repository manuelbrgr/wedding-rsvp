import React from "react";
import { withTranslation } from "react-i18next";

const Guest = (props) => {
  return (
    <div className="guest">
      <div className="guest__heading">
        <span className="guest__title">
          {props.personInfo.firstName} {props.personInfo.lastName}
        </span>
        <button
          className="form-btn form-btn--edit"
          type="button"
          onClick={(e) => props.handleEdit(e, props.personInfo, props.guestNum)}
        >
          {props.t("form.cta.edit")}
          <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.54 3.74l.51.52-5.03 5.03h-.5v-.51l5.02-5.04zm2-3.34a.56.56 0 0 0-.39.16L7.14 1.58l2.08 2.08 1.02-1.02a.55.55 0 0 0 0-.78L8.94.56a.55.55 0 0 0-.4-.16zm-2 1.77L.4 8.32v2.08h2.08l6.15-6.14-2.09-2.09z"
              fill="#A2C3D4"
              fillRule="nonzero"
            />
          </svg>
        </button>
      </div>

      <div className="guest__attendance mt-4">
        {props.renderGuestChoice(props.personInfo.attending === "yes")}
        <span className="guest__event">
          {props.personInfo.attending ? "Attending" : "Not attending"}
        </span>
      </div>
      {props.personInfo.attending === "yes" && (
        <div className="guest__food">
          <span className="guest__choice">
            {props.t("form.foodPreference")}:&nbsp;
            {props.personInfo.eatingMeat === "yes"
              ? props.t("form.meat")
              : props.t("form.veggie")}
            <p className="guest__detail">
              {props.t("form.dietaryRestrictions")}:{" "}
              {props.personInfo.dietaryRestrictions}
            </p>
          </span>
        </div>
      )}
      {props.personInfo.message && (
        <p className="guest__detail">
          {props.t("form.comment")}: {props.personInfo.message}
        </p>
      )}
    </div>
  );
};

export default withTranslation()(Guest);
