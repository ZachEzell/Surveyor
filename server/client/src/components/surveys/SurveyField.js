import React from 'react';

// in order to use reduxForm, use inputs only when you are exporting
// a component

// input is the same as props.input

// ...input means pass all of the props from input

// { label } is here because when we render this, we are going
// to render multiple labels, each with their own label
// we are going to pass it as props

//meta is the error handler managed by the SurveyForm's validate
// function

// meta: {error, touched} means go into the meta object
// and pull off the error and touched objects

// {touched && error} means if touched and error is true
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>
        {label}
      </label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
