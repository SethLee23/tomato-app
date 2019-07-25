import * as React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Button} from 'antd'
class Index extends React.Component<any> {
  constructor(props:any){
    super(props)
  }
  login = () => {
      this.props.history.push('/login')
  }
  signup = () => {
      this.props.history.push('/signUp')
  }
  render(){
    return (
      <div>
          <Button onClick={this.login}>登陆</Button>
          <Button onClick={this.signup}>注册</Button>
      </div>
    );
  }
}
export default Index