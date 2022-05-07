import React from "react";
import FormFooter from "./form-footer";

const Input = (props) => {
  return (
    <div className="form__body">
      <div className="form__controls">
        <div className="control__textbox-group">
          <label className="control__textbox-label" htmlFor="fullName">
            {props.guestNum === 0
              ? "First Name"
              : `Guest ${props.guestNum}'s name`}
          </label>
          <input
            className="control__textbox-input"
            type="text"
            id="fullName"
            name="fullName"
            value={props.guestNameValue}
            onChange={props.handleChange}
          />
          {props.isInvalidName && (
            <p className="is-error">Guest name is required.</p>
          )}
        </div>

        <div className="control__textbox-group">
          <label className="control__textbox-label" htmlFor="fullName">
            {props.guestNum === 0
              ? "Family Name"
              : `Guest ${props.guestNum}'s name`}
          </label>
          <input
            className="control__textbox-input"
            type="text"
            id="fullName"
            name="fullName"
            value={props.guestNameValue}
            onChange={props.handleChange}
          />
          {props.isInvalidName && (
            <p className="is-error">Guest name is required.</p>
          )}
        </div>

        <fieldset className="control__checkbox-fieldset">
          <legend className="control__checkbox-legend">
            Will you attend our wedding?
          </legend>

          <div className="control__checkbox-group">
            <input
              className="control__checkbox-input"
              type="radio"
              id="attend-1"
              name="attendingCeremony"
              defaultChecked={props.attendingCeremonyValue}
              onChange={props.handleChange}
            />
            <label className="control__checkbox-description" htmlFor="attend-1">
              <span className="control__checkbox-label">Yes</span>
            </label>

            <input
              className="control__checkbox-input"
              type="radio"
              id="attend-1"
              name="attendingCeremony"
              defaultChecked={props.attendingCeremonyValue}
              onChange={props.handleChange}
            />
            <label className="control__checkbox-description" htmlFor="attend-1">
              <span className="control__checkbox-label">No</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="control__checkbox-fieldset">
          <legend className="control__checkbox-legend">
            Choose your food preference:
          </legend>

          <div className="control__checkbox-group">
            <input
              className="control__checkbox-input"
              type="radio"
              id="attend-1"
              name="attendingCeremony"
              defaultChecked={props.attendingCeremonyValue}
              onChange={props.handleChange}
            />
            <label className="control__checkbox-description" htmlFor="attend-1">
              <span className="control__checkbox-label">Meat 🥩</span>
            </label>

            <input
              className="control__checkbox-input"
              type="radio"
              id="attend-1"
              name="attendingCeremony"
              defaultChecked={props.attendingCeremonyValue}
              onChange={props.handleChange}
            />
            <label className="control__checkbox-description" htmlFor="attend-1">
              <span className="control__checkbox-label">Veggie 🥦</span>
            </label>
          </div>
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

        <div className="control__textbox-group">
          <label
            className="control__textbox-label"
            htmlFor="dietaryRestrictions"
          >
            Do you want to leave a short comment?
          </label>
          <textarea
            className="control__textbox-input"
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            value={props.dietaryRestrictionsValue}
            onChange={props.handleChange}
          />
        </div>
      </div>

      <FormFooter renderFooter={props.renderFooter} />
    </div>
  );
};

export default Input;
