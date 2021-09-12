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

// storeを生成
const store = createStore(
  tasksReduser,
  applyMiddleware(logger)
);

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
