import * as React from 'react';
import { Input, Icon, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'src/config/axios'
import backgroundSrc from './background.png'
import './signUp.scss'
import classNames from 'classnames';
const testName = /^\S{1,9}$/
const tetsPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,16}$/

message.config({
	maxCount: 1,
});

interface ISignUpState {
	account: string,
	password: string,
	passwordConformation: string,
	wrongInfo: boolean,
	wrongUsername: boolean,
	wrongPassword: boolean,
	wrongConfirm: boolean
}

class SignUp extends React.Component<any, ISignUpState> {
	constructor(props) {
		super(props)
		this.state = {
			account: '',
			password: '',
			passwordConformation: '',
			wrongInfo: false,
			wrongUsername: false,
			wrongPassword: false,
			wrongConfirm: false,
		}
	}
	checkName = () => {
		console.log(testName.test(this.state.account))
		if (!testName.test(this.state.account)) {
			this.setState({ wrongInfo: true, wrongUsername: true })
			return
		}
		this.setState({ wrongInfo: false, wrongUsername: false })

	}
	checkPassword = () => {
		if (!tetsPassword.test(this.state.password)) {
			this.setState({ wrongInfo: true, wrongPassword: true })
			return
		}
		this.setState({ wrongInfo: false, wrongPassword: false })
		return
	}
	checkPassWordConformation = () => {
		if (this.state.passwordConformation !== this.state.password) {
			this.setState({ wrongInfo: true, wrongConfirm: true })
			return
		}
		this.setState({ wrongInfo: false, wrongConfirm: false })
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
		this.debounce(this.checkName, 100)()
	}

	onChangePassword = (e) => {
		this.setState({ password: e.target.value });
		this.debounce(this.checkPassword, 100)()
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
		const showWrong1 = classNames({
			wrongUsername: this.state.wrongUsername,
			wrongClass: true,
		})
		const showWrong2 = classNames({
			wrongPassword: this.state.wrongPassword,
			wrongClass: true,
		})
		const showWrong3 = classNames({
			wrongConfirm: this.state.wrongConfirm,
			wrongClass: true,
		})
		return (
			<div className="signUpLayout">
				<div className="signUpWrapper">
					<img src={backgroundSrc} />
					<div className="SignUp" id="SignUp">
						<h1>注册番茄闹钟</h1>
						<div style={{ position: 'relative' }}>
							<Input
								placeholder="请输入你的用户名"
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								value={account}
								onChange={this.onChangeAccount}
							/>
							<div className={showWrong1}>用户名应含 1-9 字符</div>
						</div>
						<div style={{ position: 'relative' }}>
							<Input.Password value={password} placeholder="请输入密码" onChange={this.onChangePassword} />
							<div className={showWrong2}>密码应混合 8-16 位数字和字母</div>
						</div>
						<div style={{ position: 'relative' }}>
							<Input.Password value={passwordConformation} placeholder="请确认密码" onChange={this.onChangePasswordConformation} />
							<div className={showWrong3}>密码不一致</div>
						</div>
						<Button type="primary" className="signUpButton" onClick={this.submit}>注册</Button>
						<p>如果你有账号，请立即 <Link to="/login">登录</Link></p>
					</div>
				</div>
			</div>

		);
	}
}

export default SignUp;