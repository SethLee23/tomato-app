import * as React from 'react';
import { Dropdown, Icon, Menu } from "antd";
import Todos from 'src/components/Todos/Todos'
import axios from 'src/config/axios';
import history from 'src/config/history'
import './Home.scss'
import { initTodos, initTomatoes } from "../../redux/actions";
import { connect } from 'react-redux';
import Tomatoes from 'src/components/tomatoes/tomatoes'
import Statistics from 'src/components/Statistics/Statistics'
import imgSrc from './tomato.png'

// import './svg'
interface IRouter {
	history: any;
}

interface IIndexState {
	user: any
}
interface IIndexProps {
	initTodos: (payload: any) => any,
	initTomatoes: (payload: any) => any,
}

const logout = () => {
	localStorage.setItem('x-token', '')
	history.push('/login')
}
const menu = (
	<Menu>
		{/* <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item> */}
		<Menu.Item key="1" onClick={logout}><Icon type="logout" />注销</Menu.Item>
	</Menu>
);

class Home extends React.Component<IIndexProps, IIndexState, IRouter> {

	constructor(props: any) {
		super(props)
		this.state = {
			user: {}
		}
	}

	async componentWillMount() {
		await this.getMe()
		await this.getTodos()
		await this.getTomatoes()
	}
	getTomatoes = async () => {
		try {
			const response = await axios.get('tomatoes')
			this.props.initTomatoes(response.data.resources)
		} catch (e) {
			console.error(e)
		}
	}
	getTodos = async () => {
		try {
			const response = await axios.get('todos')
			const todos = response.data.resources.map(t => Object.assign({}, t, { editing: false }))
			this.props.initTodos(todos)
		} catch (e) {
			throw new Error(e)
		}
	}
	getMe = async () => {
		const response = await axios.get('me');
		this.setState({ user: response.data })
	}
	
	render() {
		return (
			<div className="Home" id="Home">
				<header>
					<img src={imgSrc} className="logo" />
					
					<Dropdown overlay={menu}>
						<span>
							{this.state.user && this.state.user.account}
							<Icon type="down" style={{ marginLeft: 8 }} />
						</span>
					</Dropdown>
				</header>
				<main>
					<Tomatoes />
					<Todos />
				</main>
				<Statistics />
			</div >
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	...ownProps
})

const mapDispatchToProps = {
	initTodos,
	initTomatoes
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);