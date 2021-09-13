import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import App from './App';
import createStore from './createStore';

// historyインスタンスを作成 TODO: historyって何をするんだっけ？
const history = createBrowserHistory();

// Storeの生成
const store = createStore(history);
// const StoreContext = React.createContext(null);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);