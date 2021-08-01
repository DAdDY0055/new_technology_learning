import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { Hello, HelloChildren } from './Hello';
import reportWebVitals from './reportWebVitals';
import Profile from './Profile';

// const Hello = (props) =>  {
//   return <div>こんにちは、{ props.children }さん</div>;
// };

// class Hello extends React.Component {
//   render() {
//     return <div>こんにちは、{ this.props.name }さん</div>;
//   }
// }

const profile = {
  name: 'ひろし',
  birthDay: '2000/01/02'
};

ReactDOM.render(
  <React.StrictMode>
    <Hello name="坂本龍馬"/>
    {/* <App /> */}
    <Hello name="西郷隆盛"/>
    <Hello name="勝海舟"/>
    <Hello name="田中太郎" />
    <HelloChildren>
      私だ。
    </HelloChildren>
    <Profile name='たかし' birthDay='1836/01/03' />
    <Profile {...profile} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
