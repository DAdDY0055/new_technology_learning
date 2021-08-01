import React from 'react';
import PropTypes from 'prop-types';

// Functional Component
// export const Hello = (props) =>  {
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
  }
};

Hello.propTypes = {
  name: PropTypes.string
};

Hello.defaultProps = {
  name: 'hogehoge'
};
// export default Hello;