import React from "react";
import Guest from "./guest";
import FormFooter from "./form-footer";
import { useTranslation } from "gatsby-plugin-react-i18next";

const Summary = (props) => {
  const { t } = useTranslation();

  return (
    <div className="form__body">
      <div className="form__guest-summary">
        {props.guestInfo.map((guest, i) => {
          return (
            <Guest
              key={guest.id}
              personInfo={guest}
              handleEdit={props.handleEdit}
              renderGuestChoice={props.renderGuestChoice}
              guestNum={i + 1}
            />
          );
        })}

        <button
          className="form-btn form-btn--white form-btn__add-guest"
          type="button"
          onClick={props.handleAddGuest}
        >
          <div className="form-btn__body">
            <svg width="22" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H8zm-3-3V8h3V6H5V3H3v3H0v2h3v3h2z"
                fill="#153048"
                fillRule="nonzero"
              />
            </svg>
            {t("form.addMore")}
          </div>
        </button>
        {props.isSubmissionError && (
          <p className="is-error">{t("form.errors.serverRequestFailed")}</p>
        )}
      </div>

      <FormFooter renderFooter={props.renderFooter} />
    </div>
  );
};

export default Summary;
