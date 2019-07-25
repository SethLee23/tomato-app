// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as React from 'react';
import { Link } from "react-router-dom";
import { Input, Icon, Button } from 'antd'

import axios from 'src/config/axios'
import './login.scss'
interface ILoginState {
    account: string,
    password: string,
}

class Login extends React.Component<any, ILoginState> {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: '',
        }
    }
    onChangeWord = (key: keyof ILoginState, val: string) => {
        const newState = {}
        newState[key] = val
        this.setState(newState)
    }
    login = async (e) => {
        const { account, password } = this.state;
        try {
            await axios.post('sign_in/user', {
                account, password
            }).then(() => {
                this.props.history.push('/')
            })
        } catch (e) {
            throw new Error(e)
        }
    }
    public render() {
        const { account, password } = this.state;
        return (
            <div className="login">
                <h1>登陆</h1>
                <Input
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    allowClear={true}
                    onChange={(e) => { this.onChangeWord('account', e.target.value) }}
                    value={account}
                />
                <Input.Password placeholder="请输入密码"
                    onChange={(e) => { this.onChangeWord('password', e.target.value) }}
                    value={password}
                />
                <div className="buttonWrapper">
                    <Button onClick={this.login} type="primary">登陆</Button>
                </div>
                <p>没有账号？
                    <Link to="/signUp">注册</Link>
                </p>
            </div>
        );
    }
}

export default Login