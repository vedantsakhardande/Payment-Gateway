import React,{Component} from 'react';
import './Status.css'

class Status extends Component{
    constructor(props)
    {
        super(props);
    }
render(){
    return(<div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
               <nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" href="./">Home</a>
</nav>
<p></p>
        <div>

            <body id="stat">
        <center>
        <h1>The Donation was {this.props.status}</h1>
        </center>
        </body>
        </div>
    </div>);
}
}

export default Status;