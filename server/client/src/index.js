// Data layer
// Root component
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
// just used for testing
import axios from 'axios';
window.axios = axios;
//Arguments is all reducers, second is init state, third is middleWare
// redux thunk is used for?
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Takes two arguments,
// One is our root component, second is where we want to render it
ReactDOM.render(
  // Provider knows to look for data changes on the store
  // When store updates, <App/> and all its children will update
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
