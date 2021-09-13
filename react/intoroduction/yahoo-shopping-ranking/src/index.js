import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Profiler } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import App from './App';
import createStore from './createStore';

// historyインスタンスを作成 TODO: historyって何をするんだっけ？
const history = createBrowserHistory();

// Storeの生成
const store = createStore(history);

ReactDOM.render(
  <Profiler store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Profiler>,
  document.getElementById('root')
);