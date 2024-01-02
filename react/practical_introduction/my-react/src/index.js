import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import SelectStyle from './Classnames/SelectStyle'
import StyledPanel from './Children/StyledPanel';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <SelectStyle mode='da' /> */}
    <StyledPanel title={
        <p>メンバー募集</p>
      }
      body={
        <>
          <p>ようこそおおおおおおお</p>
          <p>hoge</p>
        </>
      }>
    </StyledPanel>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
