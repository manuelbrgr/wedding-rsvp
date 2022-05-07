import React from 'react';

const Guest = (props) => {
  return (
    <div className="guest">
      <div className="guest__heading">
        <span className="guest__title">{props.personInfo.fullName}</span>
        <button className="form-btn form-btn--edit" type="button" onClick={e => props.handleEdit(e, props.personInfo, props.guestNum)}>
            Edit
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.54 3.74l.51.52-5.03 5.03h-.5v-.51l5.02-5.04zm2-3.34a.56.56 0 0 0-.39.16L7.14 1.58l2.08 2.08 1.02-1.02a.55.55 0 0 0 0-.78L8.94.56a.55.55 0 0 0-.4-.16zm-2 1.77L.4 8.32v2.08h2.08l6.15-6.14-2.09-2.09z" fill="#A2C3D4" fillRule="nonzero"/>
            </svg>
        </button>
      </div>
      <p className="guest__detail">{props.personInfo.dietaryRestrictions}</p>
      <div className="guest__attendance">
        { props.renderGuestChoice(props.personInfo.attendingCeremony) }
        <span className="guest__event">{props.personInfo.attendingCeremony ? 'Attending' : 'Not attending'}&nbsp;Ceremony & Brunch Reception</span>
      </div>

      <div className="guest__attendance">
        { props.renderGuestChoice(props.personInfo.attendingBanquet) }
        <span className="guest__event">{props.personInfo.attendingBanquet ? 'Attending' : 'Not attending'}&nbsp;Banquet Dinner</span>
      </div>
    </div>
  );
}

export default Guest;
