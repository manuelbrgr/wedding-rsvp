import React from "react";
import FormFooter from "./form-footer";

const Result = (props) => {
  return (
    <div className="form__body">
      <div className="form__result">
        <span className="result__emoji">🎉</span>
        <p className="result__title">We've received your RSVP for</p>
        <ul className="result__guest-list">
          {props.guestInfo.map((guest) => {
            return (
              <li className="result__guest-item" key={guest.id}>
                <div className="result__guest-item-body">
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2zm0 10c2.7 0 5.8 1.29 6 2H2c.23-.72 3.31-2 6-2zM8 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      fill="#000"
                      fillRule="nonzero"
                    />
                  </svg>
                  {guest.firstName}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <FormFooter renderFooter={props.renderFooter} />
    </div>
  );
};

export default Result;
