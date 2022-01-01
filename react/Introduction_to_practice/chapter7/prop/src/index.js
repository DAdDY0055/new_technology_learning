import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AdminFlagProvider } from "./components/providers/AdminFlagProvider";

ReactDOM.render(
  // 参照したいコンポーネントを囲む
  <AdminFlagProvider>
    <App />
  </AdminFlagProvider>,
  document.getElementById('root')
);
