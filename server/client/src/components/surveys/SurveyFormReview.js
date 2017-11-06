import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
// this is used to navigate using our backend
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

// submitSurvey is an action creator and we are adding it
// as a prop
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  // for each of the formFields, take field and return
  // we are pulling off the name and label from the field
  // each one is the same as saying field.label, etc.
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>
          {label}
        </label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>

      <button
        // The process of creating an action went like this: Create an action creator
        // in our index.js, import actions to this file
        // then add actions to our connect function
        // then have a function call that action creator

        // this will pass the values from the form into
        // our action creator
        // without () =>, submit survey would be called
        // automatically

        // history can be used to navigate around application
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  // you may want to console.log the state to check to see what's in there
  // form values are the state props from our surveyForm
  return { formValues: state.form.surveyForm.values };
}

// connect SurveyFormReview to our store
// with router adds a history object
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
