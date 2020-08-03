import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import W3 from './W3.css'
import Homepage from './homepage.css'
import { Redirect } from 'react-router';

class HomePage extends Component{
    constructor(props) {
        super(props);
    this.state = {
      personname:"",
      email:"",
      button:true
    };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleOnClick=this.handleOnClick.bind(this);
      }
      handleOnClick = () => {
        // some action...
        // then redirect
        console.log("Person Name :",this.refs.personname.value);
        console.log("Email :",this.refs.email.value);
        this.setState({personname: this.refs.personname.value}, function () {
          console.log(this.state.personname);
      });
      this.setState({email: this.refs.email.value}, function () {
        console.log(this.state.email);
    });
        // this.setState({});
        // this.setState({email:this.refs.email.value});
        console.log("State =",this.state);
        if(this.refs.personname.value.length>0 && this.refs.email.value.length>0)
        {
          if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.refs.email.value))
          {
            this.setState({redirect: true});
          }
          else
          {
            alert("Enter Valid Email Address");
          }
        }
        else{
          alert("Enter Name and Email");
        }
        
      }
      handleSubmit(event){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        this.setState({personname: event.target.value});
        if(this.state.personname.length>0 && this.state.email.length>0 && reg.test(this.state.email) == true)
        {
          this.setState({button:false})
        }
        else
        {
          this.setState({button:true})
        }
      }
      handleNameChange(event) {
        console.log("Name Changed");
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        this.setState({personname: event.target.value});
        if(this.state.personname.length>0 && this.state.email.length>0 && reg.test(this.state.email) == true)
        {
          this.setState({button:false})
        }
        else
        {
          this.setState({button:true})
        }
      }
      handleEmailChange(event) {
        console.log("Email Changed");
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        this.setState({email: event.target.value});
        if(this.state.personname.length>0 && this.state.email.length>0 && reg.test(this.state.email) == true)
        {
          this.setState({button:false})
        }
        else
        {
          this.setState({button:true})
        }
      }
    // handleSubmit()
    // {
    //     let personname=this.refs.personname.value;
    //     let email=this.refs.email.value;
    //     var info={
    //       personname:personname,
    //       email:email
    //     }
    //     this.setState({personname: personname});
    //     this.setState({email: email});
    //     console.log("Person is ",personname);
    //     console.log("Email is ",email);
    //     this.props.match.params=info;
    //     // ReactDOM.render(<App personname={personname} email={email} path='./Payment'/>, document.getElementById('root'));
    //     // window.location = 'http://localhost:3000/Payment';

        
    //     // ReactDOM.render(<Router>
    //     //     <div>
    //     //       <Route exact path="/" component={HomePage} />
    //     //       <Route path="/Payment" component={App} personname={personname} email={email} />
    //     //     </div>
    //     // </Router>,document.getElementById('root'))
    // }
    render(){
      if (this.state.redirect) {
        
        return <Redirect push to={{ pathname: '/payment', state: this.state }} />;
      }
     
        return(
          
            <div>
               <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
               <nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" href="./">Home</a>
</nav>
<p></p>
  <div class="container">
  
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
<div class="w3-container w3-blue">
  <h2 id="heading">Donor's Details</h2>
</div>
<form class="form-group" onsubmit={this.handleSubmit} >
  <p><br></br>
  <label id="personname"><b>Name</b></label>
  <input required className="w3-input" type="text" placeholder="Enter your Name here" ref="personname" required="required" id="personname" /></p>
  <p><br></br>
  <label id="email"><b>Email</b></label>
  <input required className="w3-input" type="email" placeholder="Enter your Email here" ref="email" required="required" id="email" /></p>
  <input type="submit" value="Submit" id="submit" className="btn btn-success" onClick={this.handleOnClick}></input>
<Router>
<Route
  path="/payment"
  Component={<App />}
/>
</Router>

{/* <Link  to={{ pathname: '/payment', state: this.state }}><button  type="submit" value="Submit" id="submit" className="btn btn-success" >Submit</button></Link> */}


</form>             
            </div></div>
                );
    }
}

export default HomePage;