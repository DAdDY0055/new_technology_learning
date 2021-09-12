import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import tasksReduser from './reducers/tasks';
import TodoApp from './containers/TodoApp';
import { createLogger } from 'redux-logger'

const loggerSetting = {
  predicate: (getState, action) => action.type !== 'HIGH_FREQUENCY_ACTION'
};

const logger = createLogger(loggerSetting);

const storegeMiddleware = store => next => action => {
  const result = next(action);
  window.localStorage.setItem('app-state', JSON.stringify(store.getState()));
  return result;
}

const savedState = JSON.parse(localStorage.getItem('app-state'));

// storeを生成
const store = createStore(
  tasksReduser,
  savedState ? savedState : tasksReduser(undefined, {type: 'INIT'}),
  applyMiddleware(logger, storegeMiddleware)
);


render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
