import { combineReducers } from 'redux';
// reducer is a immutable name unless you import AS
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
  // The auth key represents the authReducer
  auth: authReducer,
  form: reduxForm
});
