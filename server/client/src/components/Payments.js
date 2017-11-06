import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="Buy 5 email credits"
        amount={500}
        // We will get a token back from Stripe that represents
        // the entire charge to the user
        // call our action creator
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

// in order to change the style of the button, add a child component
// to the StripeCheckout component

// This statement allows handleToken action creator to be called
export default connect(null, actions)(Payments);
