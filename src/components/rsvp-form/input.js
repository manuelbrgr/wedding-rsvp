import { useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";
import FormFooter from "./form-footer";

const Input = (props) => {
  const { t } = useTranslation();

  return (
    <div className="form__body">
      <div className="form__controls">
        <div className="control__textbox-group">
          <label className="control__textbox-label" htmlFor="firstName">
            {props.guestNum === 0
              ? t("form.firstName")
              : t("form.guestReference", { number: props.guestNum })}
          </label>
          <input
            className="control__textbox-input"
            type="text"
            id="firstName"
            name="firstName"
            value={props.firstNameValue}
            onChange={props.handleChange}
          />
          {props.isInvalidFirstName && (
            <p className="is-error">{t("form.errors.firstNameRequired")}</p>
          )}
        </div>
        <div className="control__textbox-group">
          <label className="control__textbox-label" htmlFor="firstName">
            {props.guestNum === 0
              ? t("form.lastName")
              : t("form.guestReference", { number: props.guestNum })}
          </label>
          <input
            className="control__textbox-input"
            type="text"
            id="lastName"
            name="lastName"
            value={props.lastNameValue}
            onChange={props.handleChange}
          />
          {props.isInvalidLastName && (
            <p className="is-error">{t("form.errors.lastNameRequired")}</p>
          )}
        </div>
        <fieldset className="control__checkbox-fieldset">
          <legend className="control__checkbox-legend">
            Will you attend our wedding?
          </legend>

          <div className="control__checkbox-group">
            <div>
              <input
                className="control__checkbox-input"
                type="radio"
                id="attend-1"
                value="yes"
                name="attending"
                defaultChecked={props.attendingValue === "yes"}
                onClick={props.handleChange}
              />
              <label
                className="control__checkbox-description"
                htmlFor="attend-1"
              >
                <span className="control__checkbox-label">Yes</span>
              </label>
            </div>
            <div>
              <input
                className="control__checkbox-input"
                type="radio"
                id="attend-0"
                name="attending"
                value="no"
                defaultChecked={props.attendingValue === "no"}
                onClick={props.handleChange}
              />
              <label
                className="control__checkbox-description"
                htmlFor="attend-0"
              >
                <span className="control__checkbox-label">No</span>
              </label>
            </div>
          </div>
          {props.isInvalidAttending && (
            <p
              className="is-error"
              style={{ position: "relative", top: "-25px" }}
            >
              {t("form.errors.attendingRequired")}
            </p>
          )}
        </fieldset>

        <div
          style={{
            display: props.attendingValue === "no" ? "none" : "block",
          }}
        >
          <fieldset className="control__checkbox-fieldset">
            <legend className="control__checkbox-legend">
              Choose your food preference:
            </legend>

            <div className="control__checkbox-group">
              <div>
                <input
                  className="control__checkbox-input"
                  type="radio"
                  id="meat-1"
                  value="yes"
                  name="eatingMeat"
                  defaultChecked={props.eatingMeatValue === "yes"}
                  onClick={props.handleChange}
                />
                <label
                  className="control__checkbox-description"
                  htmlFor="meat-1"
                >
                  <span className="control__checkbox-label">Meat 🥩</span>
                </label>
              </div>
              <div>
                <input
                  className="control__checkbox-input"
                  type="radio"
                  id="meat-0"
                  value="no"
                  name="eatingMeat"
                  defaultChecked={props.eatingMeatValue === "no"}
                  onClick={props.handleChange}
                />
                <label
                  className="control__checkbox-description"
                  htmlFor="meat-0"
                >
                  <span className="control__checkbox-label">Veggie 🥦</span>
                </label>
              </div>
            </div>
            {props.isInvalidEatingMeat && (
              <p
                className="is-error"
                style={{ position: "relative", top: "-25px" }}
              >
                {t("form.errors.eatingMeatRequired")}
              </p>
            )}
          </fieldset>

          <div className="control__textbox-group">
            <label
              className="control__textbox-label"
              htmlFor="dietaryRestrictions"
            >
              Do you have any food allergies or intolerances?
            </label>
            <label
              className="control__textbox-caption"
              htmlFor="dietaryRestrictions"
            >
              (For example: nuts, gluten, seafood, etc.)
            </label>
            <input
              className="control__textbox-input"
              type="text"
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={props.dietaryRestrictionsValue}
              onChange={props.handleChange}
            />
          </div>
        </div>
        <div className="control__textbox-group">
          <label className="control__textbox-label" htmlFor="comment">
            Do you want to leave a short comment?
          </label>
          <textarea
            className="control__textbox-input"
            id="comment"
            name="comment"
            value={props.comment}
            onChange={props.handleChange}
          />
        </div>
      </div>

      <FormFooter renderFooter={props.renderFooter} />
    </div>
  );
};

export default Input;
