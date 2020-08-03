import React from 'react';

class Car extends React.Component {
    render() {
      return <h2>I am a {this.props.brand}!</h2>;
    }
  }
  
 export default class Garage extends React.Component {
    render() {
      const carname = "Ford";
      return (
        <div>
        <h1>Who lives in my garage?</h1>
        <Car brand={carname} />
        </div>
      );
    }
  }
  
  