import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import 'index.css';

import { App } from 'feature/App';
import combineReducers from './reducer';

const store = createStore(
  combineReducers,
  compose(
    applyMiddleware(thunk), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
