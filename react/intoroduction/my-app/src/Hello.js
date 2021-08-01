import React from 'react';
// import ReactDOM from 'react-dom';

// Functional Component
// const Hello = (props) =>  {
//   return <div>こんにちは、{ props.name }さん</div>;
// };

// Class Component
export class Hello extends React.Component  {
  render() {
    return <div>こんにちは、{this.props.name}さん</div>;
  }
};

// Children
export class HelloChildren extends React.Component  {
  render() {
    return <div>こんにちは、{this.props.children}さん</div>;
    return <div>こんにちは、{this.props.children}さん</div>;
  }
};

// export default Hello;