import { FETCH_USER } from '../actions/types';

// Null states that when the application runs, there is nothing initially
// happening, no user is logged in
export default function(state = null, action) {
  switch (action.type) {
    // Action type
    case FETCH_USER:
      // If action.payload is an empty string, return false (not logged in)
      return action.payload || false;
    default:
      return state;
  }
}
