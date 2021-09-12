import React from 'react';
import { render } from 'react-dom';
import tasksReduser from './reducers/tasks';
import TodoApp from './components/TodoApp';
import { createStore } from 'redux';

// storeを生成
const store = createStore(tasksReduser);

function renderApp(store) {
  render(
    <TodoApp store={store} />,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store));
renderApp(store);
