import React from 'react';

const FormFooter = (props) => {
  return (
    <div className="form__footer">
      { props.renderFooter() }
    </div>
  )
}

export default FormFooter;
