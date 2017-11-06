import axios from 'axios';
import { FETCH_USER } from './types';

//action creator, requires axios
// export  const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };
//This is the refactor

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  // dispatching payload of res.data because the data property
  // is all we care about, we don't want the other properties associated with it
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Send token to backend
// we make posts request when we want to send something to the backend
export const handleToken = token => async dispatch => {
  // send to stripe and then pass back the token we got from stripe
  const res = await axios.post('/api/stripe', token);

  // assuming we are returning user data, delivers that payload
  dispatch({ type: FETCH_USER, payload: res.data });
};
// this action creator will be called when a user submits a survey
export const submitSurvey = (values, history) => async dispatch => {
  // wait for a post request and dispatch values object
  // we'll pass back the information from the token and be able to use
  // it from our state store
  const res = await axios.post('/api/surveys', values);

  // this will take us to our surveys
  // Why do this instead of a res.redirect?
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
