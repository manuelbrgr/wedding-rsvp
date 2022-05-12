import React from "react";
import Input from "./input";
import Summary from "./summary";
import Result from "./result";

const uuid = require("uuid");
require("es6-promise").polyfill();
require("isomorphic-fetch");

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fullName: "",
    attendingCeremony: false,
    attendingBanquet: false,
    dietaryRestrictions: "",
    guestList: [],
    display: "showForm",
    isInvalidName: false,
    isSubmissionError: false,
    isLoading: false,
    isEdit: false,
    editGuestNum: 0,
  };

  /* Creates request to be sent to api */
  buildRequestBody = ({ guestList }) => {
    //Take out id of leader
    const [
      { fullName, attendingCeremony, attendingBanquet, dietaryRestrictions },
      ...guests
    ] = guestList;
    return {
      fullName,
      attendingCeremony,
      attendingBanquet,
      dietaryRestrictions,
      guests,
    };
  };

  /* Creates guest to be added to guest list */
  buildGuest = ({
    fullName,
    attendingCeremony,
    attendingBanquet,
    dietaryRestrictions,
  }) => {
    if (dietaryRestrictions === "") {
      dietaryRestrictions = "No dietary restrictions";
    }
    return {
      fullName,
      attendingCeremony,
      attendingBanquet,
      dietaryRestrictions,
      id: uuid.v1(),
    };
  };

  /* Submits form to api */
  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      isLoading: true,
    });

    const requestBody = this.buildRequestBody(this.state);
    try {
      //Test http errors - https://httpstat.us/500
      const response = await fetch(
        "https://511kh3csq8.execute-api.us-east-1.amazonaws.com/dev/responses/accept",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(requestBody),
        }
      );

      //In case of http errors
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);
      this.setState({
        isSubmissionError: false,
        isLoading: false,
        display: "showResult",
      });

      //In case of network errors
    } catch (err) {
      console.log(err);
      this.setState({
        isSubmissionError: true,
        isLoading: false,
      });
    }
  };

  /* Reset state for new guest */
  handleAddGuest = () => {
    this.setState({
      fullName: "",
      attendingCeremony: false,
      attendingBanquet: false,
      dietaryRestrictions: "",
      isEdit: false,
      editGuestNum: 0,
      display: "showForm",
    });
  };

  /* Remove guest from guest list */
  handleRemoveGuest = () => {
    const indexOfCurrentGuest = this.state.editGuestNum - 1;
    const guestListCopy = [...this.state.guestList];
    guestListCopy.splice(indexOfCurrentGuest, 1);

    this.setState({
      guestList: guestListCopy,
      isEdit: false,
      editGuestNum: 0,
      display: "showSummary",
    });
  };

  /* Validates fullName and puts guest in guest list*/
  handleNext = () => {
    const isInvalid = this.state.fullName.trim() === "";
    this.setState({
      isInvalidName: isInvalid,
    });

    switch (isInvalid) {
      case false:
        const newGuest = this.buildGuest(this.state);
        switch (this.state.isEdit) {
          case true:
            const indexOfCurrentGuest = this.state.editGuestNum - 1;
            const guestListCopy = [...this.state.guestList];
            guestListCopy.splice(indexOfCurrentGuest, 1, newGuest);

            this.setState((prevState) => ({
              guestList: guestListCopy,
              isEdit: false,
              editGuestNum: 0,
              display: "showSummary",
            }));
            break;
          case false:
            this.setState((prevState) => ({
              guestList: [...prevState.guestList, newGuest],
              isEdit: false,
              editGuestNum: 0,
              display: "showSummary",
            }));
            break;
        }
      default:
        return;
    }
  };

  /* Sets state for editing and keeps name */
  handleEdit = (e, personInfo, guestNum) => {
    let { fullName, attendingCeremony, attendingBanquet, dietaryRestrictions } =
      personInfo;

    if (dietaryRestrictions === "No dietary restrictions") {
      dietaryRestrictions = "";
    }

    console.dir(personInfo);
    console.warn(attendingCeremony);
    console.warn(attendingBanquet);
    console.warn(dietaryRestrictions);

    this.setState({
      fullName: fullName,
      attendingCeremony: attendingCeremony,
      attendingBanquet: attendingBanquet,
      dietaryRestrictions: dietaryRestrictions,
      isEdit: true,
      editGuestNum: guestNum,
      display: "showForm",
    });
  };

  /* Tracks state of input */
  handleChange = (e) => {
    let name = "";

    if (e.target.type === "checkbox") {
      name = e.target.name;
      console.warn("check");
      console.warn(name);
      this.setState((prevState) => {
        console.warn(prevState);
        return {
          [name]: !prevState[name],
        };
      });
    } else {
      name = e.target.name;
      this.setState({
        [name]: e.target.value,
      });
    }
  };

  /* Checks if party is attending */
  isAttending = () => {
    if (this.state.guestList.length) {
      const leader = this.state.guestList[0];
      return leader.attendingBanquet || leader.attendingCeremony;
    }
  };

  /* Renders subtitle of form header based on display, attendance, and # of guests */
  renderHeaderSubtitle = () => {
    const numGuests = this.state.guestList.length;
    const attending = this.isAttending();
    const currentGuest = this.state.editGuestNum;

    switch (this.state.display) {
      case "showSummary":
        switch (numGuests) {
          case 1:
            return "You've added 1 person to your party so far.";
          default:
            return `You've added ${numGuests} people to your party so far.`;
        }
      case "showResult":
        switch (attending) {
          case true:
            return "Hurray! Can't wait to see you on the big day!";
        }
      case "showForm":
        switch (this.state.isEdit) {
          case true:
            return `Guest ${currentGuest}`;
        }
      default:
        return "Angelika and Manuel's celebration on September 10th, 2022";
    }
  };

  /* Renders form footer based on display, isLoading, and guest # */
  renderFooter = () => {
    const isLeader = this.state.editGuestNum === 1;
    switch (this.state.display) {
      case "showForm":
        switch (this.state.isEdit) {
          case true:
            switch (isLeader) {
              //Only show remove when editing guest #2+
              case false:
                return (
                  <React.Fragment>
                    <button
                      className="form-btn form-btn--white form-btn__remove"
                      type="button"
                      onClick={this.handleRemoveGuest}
                    >
                      Remove this guest
                    </button>
                    <button
                      className="form-btn"
                      type="button"
                      onClick={this.handleNext}
                    >
                      Continue
                      <svg
                        width="16"
                        height="8"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon-arrow"
                      >
                        <path
                          d="M12.01 3.05H0v2h12.01v3l3.99-4-3.99-4v3z"
                          fill="#FFF"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </React.Fragment>
                );
            }
          default:
            return (
              <button
                className="form-btn"
                type="button"
                onClick={this.handleNext}
              >
                Continue
                <svg
                  width="16"
                  height="8"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-arrow"
                >
                  <path
                    d="M12.01 3.05H0v2h12.01v3l3.99-4-3.99-4v3z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
              </button>
            );
        }
      case "showSummary":
        switch (this.state.isLoading) {
          case true:
            return (
              <button className="form-btn is-loading" type="button">
                <svg width="31" height="5" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#FFF" fillRule="evenodd">
                    <circle cx="2.5" cy="2.5" r="2.5" />
                    <circle cx="15.5" cy="2.5" r="2.5" />
                    <circle cx="28.5" cy="2.5" r="2.5" />
                  </g>
                </svg>
              </button>
            );
            break;
          case false:
            return (
              <div>
                <div className="control__textbox-group">
                  <label
                    className="control__textbox-label"
                    htmlFor="dietaryRestrictions"
                  >
                    Since when are Angelika and Manuel together?
                  </label>
                  <label
                    className="control__textbox-caption"
                    htmlFor="dietaryRestrictions"
                  >
                    (Security Question: If you don't know the answer, send us a
                    message.)
                  </label>
                  <input
                    className="control__textbox-input"
                    type="date"
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                  />
                </div>
                <button className="form-btn" type="submit">
                  Send RSVP
                  <svg
                    width="16"
                    height="8"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-arrow"
                  >
                    <path
                      d="M12.01 3.05H0v2h12.01v3l3.99-4-3.99-4v3z"
                      fill="#FFF"
                      fillRule="nonzero"
                    />
                  </svg>
                </button>
              </div>
            );
        }
      case "showResult":
        return (
          <a className="result__link" href="/">
            <button className="form-btn" type="button">
              Wedding details
              <svg
                width="16"
                height="8"
                xmlns="http://www.w3.org/2000/svg"
                className="icon-arrow"
              >
                <path
                  d="M12.01 3.05H0v2h12.01v3l3.99-4-3.99-4v3z"
                  fill="#FFF"
                  fillRule="nonzero"
                />
              </svg>
            </button>
          </a>
        );
    }
  };

  renderGuestChoice = (attendingEvent) => {
    if (attendingEvent) {
      return (
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          className="guest__choice-icon"
        >
          <path
            d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8.01 8.01 0 0 1 0-16 8.01 8.01 0 0 1 0 16zm4.59-12.42L8 12.17 5.41 9.59 4 11l4 4 8-8-1.41-1.42z"
            fill="#A2C3D4"
            fillRule="nonzero"
          />
        </svg>
      );
    } else {
      return (
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          className="guest__choice-icon"
        >
          <path
            d="M10 0a10 10 0 1 0 0 20 10 10 0 1 0 0-20zm0 18a8.01 8.01 0 0 1 0-16 8.01 8.01 0 0 1 0 16zm3.59-13L10 8.59 6.41 5 5 6.41 8.59 10 5 13.59 6.41 15 10 11.41 13.59 15 15 13.59 11.41 10 15 6.41 13.59 5z"
            fill="#DE8787"
            fillRule="nonzero"
          />
        </svg>
      );
    }
  };

  /* Renders component based on display state */
  renderComponents = () => {
    switch (this.state.display) {
      case "showForm":
        return (
          <Input
            handleChange={this.handleChange}
            handleNext={this.handleNext}
            guestNameValue={this.state.fullName}
            dietaryRestrictionsValue={this.state.dietaryRestrictions}
            attendingCeremonyValue={this.state.attendingCeremony}
            attendingBanquetValue={this.state.attendingBanquet}
            guestNum={this.state.editGuestNum}
            isInvalidName={this.state.isInvalidName}
            renderFooter={this.renderFooter}
            formProps={this.props.formProps}
          />
        );
      case "showSummary":
        return (
          <Summary
            guestInfo={this.state.guestList}
            handleAddGuest={this.handleAddGuest}
            handleEdit={this.handleEdit}
            isSubmissionError={this.state.isSubmissionError}
            renderGuestChoice={this.renderGuestChoice}
            renderFooter={this.renderFooter}
          />
        );
      case "showResult":
        return (
          <Result
            guestInfo={this.state.guestList}
            renderFooter={this.renderFooter}
          />
        );
    }
  };

  render() {
    return (
      <div className="form-container">
        <div className="form__header">
          <h1 className="header__title">Rsvp</h1>
          <p className="header__subtitle">{this.renderHeaderSubtitle()}</p>
        </div>

        <form onSubmit={this.handleSubmit}>{this.renderComponents()}</form>
      </div>
    );
  }
}

export default FormContainer;
