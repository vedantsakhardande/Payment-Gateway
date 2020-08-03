import React from 'react';
// import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import PaypalButton from './PaypalButton';
import './PayPal.css'
import Logo from './donation.jpg'
import {Navbar,Nav} from 'react-bootstrap'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Status from './Status.js'
import { Redirect } from 'react-router';
import HomePage from './homepage';
// import { blockStatement } from '@babel/types';

const CLIENT = {
  sandbox: 'AQVbdYubk4FvsJWMCLXpMzTMN1hslfXP7BSnvHCoRD-mswfPMgVjKeVcyX9RbZcUuSefAL_gNFP0wFVR',
  production: 'EHI3rmmRTF9PvYRrHlW3AyRLLtYynXMqaycFbrmt1nPiZZFcowVcUziNgUzO_PCcRZQ-_Q2zBjI3Eqty',
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    console.log(props);
    this.state = {
      amount : 0.05
    };
    // console.log("The Name in App.js is :",this.props.params.personname);
    // console.log("The Email in App.js is :",this.props.params.email);
    this.handleAmountChange=this.handleAmountChange.bind(this);
  }
  handleAmountChange(event){
    this.setState({amount: event.target.value});
  }
  render() {
    // if (this.state.redirect) {
    //     console.log("I m Here");
    //   return <Redirect push to={{ pathname: '/status', state: this.state }} />;
    // }




    console.log("PROPS",this.props.location.state);
    var personname=this.props.location.state.personname;
    var email=this.props.location.state.email;
    console.log("PERSON NAME is :",this.props.location.state.personname)
    const onSuccess = function(payment) {
      console.log('Successful payment!', payment);
      var self = this;
      fetch('http://paymentdonationnode.herokuapp.com/payment/data',{
        method: 'POST',
        body: JSON.stringify({
          status : "Successful",
          name: JSON.stringify(payment),
          personname:this.props.location.state.personname,
          email:this.props.location.state.email
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
        // alert(payment)
      });
      ReactDOM.render(<Status status="Successful"/>, document.getElementById('root'));
      setTimeout(function(){ window.location.href="/"; }, 5000);
    }
    const onError = function(error) {
      console.log('Erroneous payment OR failed to load script!', error);
      var self = this;
      fetch('http://paymentdonationnode.herokuapp.com/payment/data',{
        method: 'POST',
        body: JSON.stringify({
          status : "Error",
          name: JSON.stringify(error),
          personname:this.props.location.state.personname,
          email:this.props.location.state.email
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
        // alert(error)
      });
      ReactDOM.render(<Status status="Erroneous"/>, document.getElementById('root'));
      setTimeout(function(){ window.location.href="/"; }, 5000); 
    }
    const onCancel = function(data) {
      console.log('Cancelled payment!', data);
      var self = this;
      fetch('http://paymentdonationnode.herokuapp.com/payment/data',{
        method: 'POST',
        body: JSON.stringify({
          status : "Cancelled",
          name: JSON.stringify(data),
          personname:personname,
          email:email
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
        // alert(data)
      });
      // this.setState({redirect: true});
      ReactDOM.render(<Status status="Cancelled"/>, document.getElementById('root'));
      setTimeout(function(){ window.location.href="/"; }, 5000); 
      

    }
      // var style = {
      //   display : "inline-block",
      //   textalign : "center"
      // };

    return ( 
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
               <nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" href="./">Home</a>
</nav>
<p></p>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
              
        
      <div class="container" id="maincontent">
     <center> <h1 id="welcomemsg">Welcome {this.props.location.state.personname}</h1></center>
        <h1 id="heading">Donate for Good Cause</h1>
        <img id="img" src={Logo} alt="Donate the Needy"/>
        <p></p>
        <p></p>
        <br></br>
        <input className="w3-input"type="number" placeholder="Enter the Amount in USD" onChange={this.handleAmountChange} />
        <p></p>
        <p></p>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={this.state.amount}
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
