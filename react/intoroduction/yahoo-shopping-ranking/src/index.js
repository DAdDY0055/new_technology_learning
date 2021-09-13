import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { Profiler } from 'react';
import App from './App';
import * as reducers from './reducers'

// Storeの生成
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(logger)
)

ReactDOM.render(
  <Profiler store={store}>
    <App />
  </Profiler>,
  document.getElementById('root')
);