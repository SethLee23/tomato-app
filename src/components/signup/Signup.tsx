import * as React from 'react';
import { Link } from "react-router-dom";
import { Input, Icon, Button } from 'antd'

import axios from 'src/config/axios'
import './signUp.scss'
interface ISignUpState {
    account: string,
    password: string,
    passwordConformation: string
}

class Signup extends React.Component<any, ISignUpState> {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: '',
            passwordConformation: ''
        }
    }
    onChange = (e) => {
        this.setState({
            account: e.target.value
        })
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    onChangePasswordConformation = (e) => {
        this.setState({
            passwordConformation: e.target.value
        })
    }
    signup = async (e) => {
        const { account, password, passwordConformation } = this.state;
        try {
            await axios.post('sign_up/user', {
                account, password, password_confirmation: passwordConformation
            }).then(()=>{
                this.props.history.push('/')
            })
        }catch(e){
			throw new Error(e)
		}
    }
    public render() {
        const { account, password, passwordConformation } = this.state;
        return (
            <div className="signUp">
                <h1>注册番茄闹钟账号</h1>
                <Input
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    allowClear={true}
                    onChange={this.onChange}
                    value={account}
                />
                <Input.Password placeholder="请输入密码"
                    onChange={this.onChangePassword}
                    value={password}
                />
                <Input.Password placeholder="请确认密码"
                    onChange={this.onChangePasswordConformation}
                    value={passwordConformation}
                />
                <div className="buttonWrapper">
                <Button onClick={this.signup} type="primary">注册</Button>
                </div>
                <p>已有账号？
                    <Link to="/login">登陆</Link>
                </p>
            </div>
        );
    }
}
export default Signup