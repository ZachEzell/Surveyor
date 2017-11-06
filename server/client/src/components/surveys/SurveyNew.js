import React, { Component } from 'react';
// Step 1 of Clearing Form on Cancel
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  //using component level state to toggle between SurveyForm and SurveyFormReview
  // create-react-app has a different state init
  //this is = to the constructor function with super props
  // don't show by default
  state = { showFormReview: false };

  renderContent() {
    // we are going to need to be able to set this to true
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    // the callback function will set showFormReview when called
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

// Step 2 of Clearing Form, adding the reduxForm
// This allows to dump all data from form when it's unmounted
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
