import React,{Component} from 'react';
import App from './App'
import Notfound from './notfound'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing =(
    <Router>
      <div>
        <input type="text" placeholder="Enter your name" id="personname"/>
        <input type="email" placeholder="Enter your email" id="email"/>
      <ul>
        <li>
          <Link to="/Payment" nameval="document.getElementById('nameval').value">Payment</Link>
        </li>
        <li>
        <Link to="/">Home</Link>
        </li>
        </ul>
        <Switch>
        <Route path="/Payment" component={() => (<App personname="document.getElementById('personname')" email="document.getElementById('email')" />)} />
        <Route component={Notfound} />
        </Switch>
        {/* <Route path="/contact" component={Contact} /> */}
      </div>
    </Router>
)
class Input extends Component
{
    constructor(props){
        super(props);
        this.state={personname:"",email:""}
        this.setProps = this.setProps.bind(this);
    }
    setProps(){
        this.setState({
            personname:this.refs.personname.value,
            email:this.refs.email.value
        });
        let path = `./App.js`;
        this.props.history.push(path);
        console.log("Hello World");
            return(
                <div>
                    <App personname="{this.props.personname}" email="{this.props.email}"/>
                </div>
            );
    }
    render(){
        return(
            <div>
                <form>
                <label for="personname">Name</label>
                <input type="text" placeholder="Enter your Name" ref="personname" id="personname" required/>
                <label for="email">Name</label>
                <input type="email" placeholder="Enter your Email Address" ref="email" id="email" required/>
                <button onClick="{this.setProps}">Submit</button>
                </form>
            </div>
        );
    }
}

export default Input;