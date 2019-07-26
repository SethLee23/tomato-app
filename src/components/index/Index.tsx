import * as React from 'react';
import { Menu, Icon, Dropdown } from 'antd'
import axios from 'src/config/axios'
import './index.scss'
import history from 'src/config/history'
import Todo from 'src/components/todos/todo/todo'
interface IRouter {
    history: any;
}

interface IUser {
    user: any,
    
}
const logout = ()=>{
	localStorage.setItem('x-token','')
	history.push('/login')
}

const menu = (
    <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="0" className="menuItem">
            <Icon type="user" />个人设置
        </Menu.Item>
        <Menu.Divider />                    
        <Menu.Item key="1" onClick={logout}>
            <Icon type="enter" />注销
        </Menu.Item>
    </Menu>
);
class Index extends React.Component<IRouter, IUser> {
    constructor(props: any) {
        super(props)
        this.state = {
            user: {}
        }
    }
    async componentWillMount() {
        await this.getMe()
    }
    getMe = async () => {
        const response = await axios.get('me');
        this.setState({ user: response.data })
    }
    handleMenuClick = (e) => {
        if (e.key === "0") {
            console.log(0)
        }
        if (e.key === "1") {
            localStorage.setItem('x-token', '')
            this.props.history.push('/login')
        }
    }
    render() {
        return (
            <div className="index">
                <header>
                    <span className="logo">Logo</span>
                    <Dropdown overlay={menu} trigger={['click']} className="dropMenu">
                        <a className="ant-dropdown-link" href="#">
                            {this.state.user && this.state.user.account} <Icon type="down" />
                        </a>
                    </Dropdown>
                </header>
                <Todo/>
            </div>
        );
    }
}
export default Index