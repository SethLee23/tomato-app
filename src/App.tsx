import * as React from 'react';
// import './App.scss';
import history from './config/history'

// import React from "react";
import { Router, Route} from "react-router-dom";
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Index from './components/index/Index'
class App extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <Router history={history}>
        <div>
          <Route exact={true} path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
      </div>
      
    );
  }
}

export default App;