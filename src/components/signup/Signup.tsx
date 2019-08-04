import * as React from 'react';
import { Input, Icon, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'src/config/axios'
import backgroundSrc from './background.png'
import './signUp.scss'

const testName = /^\S{1,9}$/g
const tetsPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,16}$/

message.config({
	maxCount: 1,
});

interface ISignUpState {
	account: string,
	password: string,
	passwordConformation: string
	wrongInfo: boolean
}

class SignUp extends React.Component<any, ISignUpState> {
	constructor(props) {
		super(props)
		this.state = {
			account: '',
			password: '',
			passwordConformation: '',
			wrongInfo: false,
		}
	}
	checkName = () => {
		if (!testName.test(this.state.account)) {
			this.warning('用户名应含 1-9 字符')
			this.setState({ wrongInfo: true })
			return
		}
		this.setState({ wrongInfo: false })
		return
	}
	checkPassword = () => {
		if (!tetsPassword.test(this.state.password)) {
			this.warning('请输入含 8-16 位数字和字母或下划线的密码')
			this.setState({ wrongInfo: true })
			return
		}
		this.setState({ wrongInfo: false })
		return
	}
	checkPassWordConformation = () => {
		if (this.state.passwordConformation !== this.state.password) {
			this.warning('密码请保持一致')
			this.setState({ wrongInfo: true })
			return
		}
		this.setState({ wrongInfo: false })
		return
	}
	warning = (text) => {
		message.warning(text);
	}
	debounce = (fn, wait) => {
		let timer
		return () => {
			if (timer) {
				console.log('timer存在')
				clearTimeout(timer)
			}
			timer = setTimeout(() => {
				fn.call(this)
			}, wait)
		}
	}
	onChangeAccount = (e) => {
		this.setState({ account: e.target.value });
		this.debounce(this.checkName, 1000)()
	}

	onChangePassword = (e) => {
		this.setState({ password: e.target.value });
		this.debounce(this.checkPassword, 1000)()
	}
	onChangePasswordConformation = (e) => {
		this.setState({ passwordConformation: e.target.value });
		this.debounce(this.checkPassWordConformation, 1000)()
	}

	submit = async (e) => {
		if (this.state.wrongInfo) {
			return
		}
		const { account, password, passwordConformation } = this.state;
		try {
			await axios.post('sign_up/user', {
				account, // account: account
				password,
				password_confirmation: passwordConformation
			})
			this.props.history.push('/')
		} catch (e) {
			if (e.message.indexOf(422) !== -1) {
				this.warning('用户名已存在')
			}
		}
	}

	public render() {
		const { account, password, passwordConformation } = this.state;
		return (
			<div className="signUpLayout">
				<div className="signUpWrapper">
					<img src={backgroundSrc} />
					<div className="SignUp" id="SignUp">
						<h1>注册番茄闹钟</h1>
						<Input
							placeholder="请输入你的用户名"
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							value={account}
							onChange={this.onChangeAccount}
						/>
						<Input.Password value={password} placeholder="请输入密码" onChange={this.onChangePassword} />
						<Input.Password value={passwordConformation} placeholder="请确认密码" onChange={this.onChangePasswordConformation} />
						<Button type="primary" className="signUpButton" onClick={this.submit}>注册</Button>
						<p>如果你有账号，请立即 <Link to="/login">登录</Link></p>
					</div>
				</div>
			</div>

		);
	}
}

export default SignUp;