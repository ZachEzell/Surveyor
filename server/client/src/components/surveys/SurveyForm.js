import _ from 'lodash';
import React, { Component } from 'react';
// reduxForm allows us to communicate through our store
// calls actions creators and connects
// Field is a helper to render any type of any html element
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
// To prevent repetition  of fields

class SurveyForm extends Component {
  // a helper function to determine which field you want to show
  // Using the FIELDS array, for every field we have, return something
  // provide a key for lists. the name property of the FIELDS array
  // is always going to be unique
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    // name property tells redux store the content of the input
    // component "input" tells reduxForm that it wants to be an input tag
    // or you can replace it with a component
    // type is just text
    // onSubmit handleSubmit is a built in method that
    // handles submits by calling a function when a user submits
    // a form

    // since handleSubmit runs when user submits, use that to set to true
    // instead of passing in a full function for onSurveySubmit, you can condense
    // onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
    // to <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
    // Why is this not calling a function? Because...
    // it does not need to be called immediately upon startup

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// values is any props in the form
function validate(values) {
  const errors = {};

  // this will return errors associated with the emails
  // or return undefined if no errors occurred and our errors object does not care
  // about undefined, only props

  // validate automatically runs on startup
  // so provide an empty string on startup
  errors.recipients = validateEmails(values.recipients || '');

  // we are going to use a forEach function here
  // because we are not providing some component
  // we are modifying an object
  // look at lecture 154 for more details on customizing this
  _.each(formFields, ({ name }) => {
    // attemping to find the value of the name, not the name itself
    // if no value in the name property
    if (!values[name]) {
      // add to the errors message based on the name
      errors[name] = 'You must provide a value';
    }
  });
  return errors;
  // if it catches any invalid inputs, it will stop the code
  // it will also pass that error to the props(called meta) of the input Field
}
// reduxForm helper
// Similarities between reduxForm and connect ends here
export default reduxForm({
  // validate keyword is built-in and runs every time a user submits a form
  validate,
  // add a javascript object
  // destroyOnUnmount will persist the data between forms
  // it is true by default
  // form: 'surveyForm' is how to label the props for this form
  // to access from other files as state
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
