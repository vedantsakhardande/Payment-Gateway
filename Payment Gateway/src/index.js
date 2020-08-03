import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Input from './input';
import * as serviceWorker from './serviceWorker';
import Notfound from './notfound';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from './homepage';
import Try from './try'
import Status from './Status.js'

const routing =(
    <Router>
      <div>
        <Switch>
        <Route path="/Payment" component={App} />
            <Route path="/" component={HomePage} />
            <Route path="/status" component={Status} />
        
        <Route component={Notfound} />
        </Switch>
        {/* <Route path="/contact" component={Contact} /> */}
      </div>
    </Router>
)

// ReactDOM.render(<HomePage />, document.getElementById('root'));
ReactDOM.render(routing, document.getElementById('root'));
// ReactDOM.render(<Router>
//          <div>
//            <Route exact path="/" component={HomePage} />
//      <Route path="/Payment" component={App} />
//          </div>
//     </Router>,document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();