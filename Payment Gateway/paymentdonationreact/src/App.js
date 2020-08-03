import React from 'react';
// import logo from './logo.svg';
import './App.css';
import PaypalButton from './PaypalButton';
import './PayPal.css'
import Logo from './donation.jpg'
import {Navbar,Nav} from 'react-bootstrap'
// import { blockStatement } from '@babel/types';

const CLIENT = {
  sandbox: 'AQVbdYubk4FvsJWMCLXpMzTMN1hslfXP7BSnvHCoRD-mswfPMgVjKeVcyX9RbZcUuSefAL_gNFP0wFVR',
  production: 'EHI3rmmRTF9PvYRrHlW3AyRLLtYynXMqaycFbrmt1nPiZZFcowVcUziNgUzO_PCcRZQ-_Q2zBjI3Eqty',
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class App extends React.Component {
  render() {
    const onSuccess = function(payment) {
      console.log('Successful payment!', payment);
      fetch('https://paymentdonationnode.herokuapp.com/data',{
        method: 'POST',
        body: JSON.stringify({
          status : "Successful",
          name: JSON.stringify(payment)
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
        alert(payment)
      });
    }
    const onError = function(error) {
      console.log('Erroneous payment OR failed to load script!', error);
      fetch('https://paymentdonationnode.herokuapp.com/data',{
        method: 'POST',
        body: JSON.stringify({
          status : "Error",
          name: JSON.stringify(error)
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
        alert(error)
      });
    }
    const onCancel = function(data) {
      console.log('Cancelled payment!', data);
      fetch('https://paymentdonationnode.herokuapp.com/data',{
        method: 'POST',
        body: JSON.stringify({
          status : "Cancelled",
          name: JSON.stringify(data)
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
        alert(data)
      });
    }
      // var style = {
      //   display : "inline-block",
      //   textalign : "center"
      // };
    return ( 
      <div>
        <div>
          <a href="."><button id="donation">Home</button></a>
        </div>
      <div class="container" id="maincontent">
        <h1 id="heading">Donate for Good Cause</h1>
        <img id="img" src={Logo} alt="Donate the Needy"/>
        <p></p>
        <p></p>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={0.05}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
      </div>
    );
  }
}


export default App;
